import { doc, updateDoc, getDoc, setDoc, query, getDocs, where, limit, orderBy, collection, addDoc } from 'firebase/firestore'
import { database } from '../firebase'

export const addNewConversation = async (data) => {
    const convRef = collection(database, "conversations");
    await addDoc(convRef, data);
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

export const addChatMessage = async (convId) => {
    const messagesRef = doc(database, 'conversations', convId, 'messages');
    await addDoc(messagesRef, { hello: "world" });
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
        if(data.author == uid){
            data.user = {
                _id: 1,
            }
        }else{
            data.user = {
                _id: 2,
            }
        }
        return data
    });
    return messages
}