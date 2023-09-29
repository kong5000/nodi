import {
    Timestamp,
    collection,
    doc,
    limit,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    where
} from 'firebase/firestore';
import { database } from '../firebase';

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

export const subscribeToRequests = (uid, setRequests) => {
    const requestRef = collection(database, 'requests')
    const q = query(requestRef,
        where('receiver', '==', uid),
        where('resolved', '==', false),
        orderBy('sentOn', 'desc'),
        limit(30))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === 'modified') {
                const requestData = change.doc.data()
                setRequests(prev => prev.map(request => {
                    return requestData
                }))
            }
            if (change.type === 'removed') {
                setRequests(prev => prev.filter(request => {
                    if (request.id == change.doc.id) {
                        return false
                    }
                    return true
                }))
            }
            if (change.type === 'added') {
                const data = change.doc.data()
                const newRequest = { id: change.doc.id, ...data }
                setRequests(prev => [newRequest, ...prev])
            }
        });
    });
    return unsubscribe;
}