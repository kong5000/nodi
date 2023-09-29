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
        lastMessage: message,
        lastAuthor: sender.name,
        resolved: false,
        accepted: false,
        lastActive: Timestamp.now(),
        memberInfo: {
            [sender.id]: sender,
            [receiver.id]: receiver,
        }
    }
    await setDoc(documentRef, data)
}

export const subscribeToRequests = (uid, setRequests) => {
    const requestRef = collection(database, 'conversations')
    const q = query(requestRef,
        where('receiver', '==', uid),
        where('resolved', '==', false),
        orderBy('lastActive', 'desc'),
        limit(30))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === 'modified') {
                const requestData = change.doc.data()
                setRequests(prev => prev.map(request => {
                    if (request.id == change.doc.id) {
                        request = requestData
                    }
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