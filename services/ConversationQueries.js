import { doc, updateDoc, getDoc, setDoc, query, getDocs, where, limit, orderBy, collection, addDoc } from 'firebase/firestore'
import { database } from '../firebase'

export const addNewConversation = async (data) => {
    const convRef = collection(database, "conversations");
    await addDoc(convRef, data);
}