import { doc, updateDoc, setDoc, deleteDoc, query, getDocs, where, limit, orderBy, collection, addDoc } from 'firebase/firestore'
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
    console.log(conversations)
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
    console.log(querySnapshot.metadata.fromCache )
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

export const addChatMessage = async (text, conversationId, authorId) => {
    const docRef = await addDoc(collection(database, 'conversations', conversationId, 'messages'), {
        conversationId: conversationId,
        text,
        author: authorId,
        createdAt: new Date()
    })
    const messsageId = docRef.id
    await updateConversationLastMessage(conversationId, authorId, text, messsageId)
}

export const updateConversationLastMessage = async (conversationId, authorId, lastMessage,messsageId) => {
    const documentRef = doc(database, 'conversations', conversationId);
    await updateDoc(documentRef, {
        lastMessage,
        lastAuthor: authorId,
        lastActive: new Date(),
        lastMessageId : messsageId
    })
}
