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

export const addNewConversation = async (sender, receiver, message) => {
    const userIds = [sender, receiver]
    const sortedIds = userIds.sort();
    const documentId = sortedIds.join("");
    const documentRef = doc(database, "conversations", documentId);
    await setDoc(documentRef, data)
}
