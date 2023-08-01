import {
    onSnapshot,
    doc,
    updateDoc,
    setDoc,
    deleteDoc,
    query,
    getDocs,
    where,
    limit,
    orderBy,
    collection,
    addDoc
} from 'firebase/firestore'
import { database } from '../firebase'

export const addNewConversation = async (data, userIds) => {
    const sortedIds = userIds.sort();
    const documentId = sortedIds.join("");
    const documentRef = doc(database, "conversations", documentId);
    await setDoc(documentRef, data)
}

export const getConversations = async (uid) => {
    const convRef = collection(database, "conversations");
    const q = query(convRef,
        where('members', 'array-contains', uid),
        orderBy('lastActive', 'desc'),
    )
    const querySnapshot = await getDocs(q)
    let conversations = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
    });
    return conversations
}

export const getMessages = async (convId, uid) => {
    const messagesRef = collection(database, 'conversations', convId, 'messages');
    const q = query(messagesRef,
        limit(15),
        orderBy('createdAt', 'desc'),
    )
    const querySnapshot = await getDocs(q);
    let count = 1
    let messages = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        data.createdAt = data.createdAt.toDate()
        data._id = doc.id
        count += 1
        if (data.author == uid) {
            data.user = {
                _id: 1,
            }
        } else {
            data.user = {
                _id: 2,
            }
        }
        return data
    });
    return messages
}

export const deleteConversation = async (documentId) => {

    // Create a reference to the document
    const documentRef = doc(database, "conversations", documentId);

    // Delete the document
    try {
        await deleteDoc(documentRef)

    } catch (err) {
        console.log(err)
    }
}

export const addChatMessage = async (text, image, conversationId, authorId) => {
    const docRef = await addDoc(collection(database, 'conversations', conversationId, 'messages'), {
        conversationId: conversationId,
        text,
        image,
        author: authorId,
        createdAt: new Date()
    })
    const messsageId = docRef.id
    let lastMessage = text
    if(image){
        lastMessage = 'sent an image'
    }
    await updateConversationLastMessage(conversationId, authorId, lastMessage, messsageId)
}

export const updateConversationLastMessage = async (conversationId, authorId, lastMessage, messsageId) => {
    const documentRef = doc(database, 'conversations', conversationId);
    await updateDoc(documentRef, {
        lastMessage,
        lastAuthor: authorId,
        lastActive: new Date(),
        lastMessageId: messsageId
    })
}

export const subscribeToConversations = (uid, setConversations) => {
    const conversationRef = collection(database, 'conversations')
    const q = query(conversationRef,
        where('members', 'array-contains', uid),
        orderBy('lastActive', 'desc'),
        limit(20))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === 'modified') {
                const conversationData = change.doc.data()
                setConversations(prev => prev.map(conv => {
                    if (conv.id == change.doc.id) {
                        conv.lastMessage = conversationData.lastMessage
                        conv.lastAuthor = conversationData.lastAuthor
                        conv.lastActive = conversationData.lastActive
                    }
                    return conv
                }))
            }
            if (change.type === 'removed') {
                setConversations(prev => prev.filter(conv => {
                    if (conv.id == change.doc.id) {
                        return false
                    }
                    return true
                }))
            }
            if (change.type === 'added') {
                const data = change.doc.data()
                const newConversation = { id: change.doc.id, ...data }
                setConversations(prev => [newConversation, ...prev])
            }
        });
    });
    return unsubscribe;
}