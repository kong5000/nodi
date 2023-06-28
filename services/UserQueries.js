import { doc, updateDoc, getDoc, setDoc, query, getDocs, where, limit, orderBy, collection } from 'firebase/firestore'
import { database } from '../firebase'

export const updateUserDoc = async (uid, newData) => {
    const docRef = doc(database, "users", uid);
    await updateDoc(docRef, newData);
}

export const getUserDoc = async (uid) => {
    const userDocRef = doc(database, "users", uid);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    return userData
}

export const addPass = async (uid, passedCard) => {
    const passDocRef = doc(database, 'users', uid, 'passes', passedCard.userInfo.id);
    setDoc(passDocRef, { ...passedCard.userInfo, passedOn: new Date() })
        .then(() => {
        })
        .catch((error) => {
            console.error('Error creating pass document: ', error);
        });
}

export const getPasses = async (uid) => {
    const passesRef = collection(database, 'users', uid, 'passes')
    const q = query(passesRef,
        orderBy('passedOn', 'desc'),
        limit(50)
    );
    const querySnapshot = await getDocs(q)
    let passedUsers = querySnapshot.docs.map((doc) => doc.data());
    return passedUsers
}