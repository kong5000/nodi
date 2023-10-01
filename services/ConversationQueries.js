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

export const addNewConversation = async (message, sender, receiver) => {
    const newConversationData = {
        accepted: false,
        resolved: false,
        lastActive: new Date(),
        lastAuthor: sender.name,
        lastMessage: message,
        sender: sender.id,
        receiver: receiver.id,
        members: [sender.id, receiver.id],
        memberInfo: {
            [sender.id]: sender,
            [receiver.id]: receiver
        }
    }
    const userIds = [sender.id, receiver.id]
    const sortedIds = userIds.sort();
    const documentId = sortedIds.join("");
    const documentRef = doc(database, "conversations", documentId);
    await setDoc(documentRef, newConversationData)
    try {
        await addChatMessage(message, null, documentId, sender.id)
    } catch (err) {
        console.log(err)
    }
}
export const acceptConversationRequest = async (conversationId) => {
    const conversationRef = doc(database, 'conversations', conversationId);
    await updateDoc(conversationRef, { accepted: true, resolved: true })
}
export const declineConversationRequest = async (conversationId) => {
    // @todo implement
    const conversationRef = doc(database, 'conversations', conversationId);
    await updateDoc(conversationRef, { accepted: false, resolved: true })
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
    const messageId = docRef.id
    let lastMessage = text
    if (image) {
        lastMessage = 'sent an image'
    }
    await updateConversationLastMessage(conversationId, authorId, lastMessage, messageId)
}

export const updateConversationLastMessage = async (conversationId, authorId, lastMessage, messageId) => {
    const documentRef = doc(database, 'conversations', conversationId);
    await updateDoc(documentRef, {
        lastMessage,
        lastAuthor: authorId,
        lastActive: new Date(),
        lastMessageId: messageId
    })
}

export const subscribeToConversations = (uid, setConversations) => {
    const conversationRef = collection(database, 'conversations')
    const q = query(conversationRef,
        where('members', 'array-contains', uid),
        where('accepted', '==', true),
        orderBy('lastActive', 'desc'),
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === 'modified') {
                console.log("HELLO MODIFIED")
                const conversationData = change.doc.data()
                setConversations(prev => prev.map(conv => {
                    if (conv.id == change.doc.id) {
                        return conversationData
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