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
import { Timestamp } from 'firebase/firestore';

export const addNewRequest = async (sender, receiver, message) => {
    const userIds = [sender.id, receiver.id]
    const sortedIds = userIds.sort();
    const documentId = sortedIds.join("");
    const documentRef = doc(database, "requests", documentId);
    const data = {
        sender: sender.id,
        receiver: receiver.id,
        message,
        resolved: false,
        accepted: false,
        sentOn: Timestamp.now()
    }
    await setDoc(documentRef, data)
}
