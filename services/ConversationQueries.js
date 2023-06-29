import { doc, updateDoc, getDoc, setDoc, query, getDocs, where, limit, orderBy, collection, addDoc } from 'firebase/firestore'
import { database } from '../firebase'

export const addNewConversation = async (data) => {
    const convRef = collection(database, "conversations");
    await addDoc(convRef, data);
}

export const getConversations = async (uid) => {
    console.log("AAHH")
    const convRef = collection(database, "conversations");
    const q = query(convRef,
        where(`members.${uid}`, '==', true),
        orderBy('lastActive', 'desc'),
    )
    const querySnapshot = await getDocs(q)
    let conversations = querySnapshot.docs.map((doc) => doc.data());
    console.log(conversations)
    return conversations
}