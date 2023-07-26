import {
    doc, updateDoc, getDoc, setDoc, query, getDocs, where,
    limit,
    orderBy,
    collection,
    collectionGroup,
    arrayUnion
} from 'firebase/firestore'
import { database } from '../firebase'
import { addNewConversation } from './ConversationQueries';

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
export const addLike = async (userData, likedCard) => {
    const uid = userData.id
    const likeDocRef = doc(database, 'users', uid, 'likes', likedCard.userInfo.id);
    // setDoc(likeDocRef, { ...likedCard.userInfo, likedOn: new Date(), likedBy: uid })
    setDoc(likeDocRef, { id: likedCard.userInfo.id, likedOn: new Date(), likedBy: uid })
        .then(() => {
        })
        .catch((error) => {
            console.error('Error creating pass document: ', error);
        });

    // Check if user liked you back
    let result = await likedBy(uid, likedCard.userInfo.id)
    if (result) {
        // Start a conversation
        let memberInfo = {}
        memberInfo[likedCard.userInfo.id] = {
            id: likedCard.userInfo.id,
            displayName: likedCard.userInfo.name,
            profilePicture: likedCard.userInfo.pictures[0]
        }
        memberInfo[userData.id] = {
            id: userData.id,
            displayName: userData.name,
            profilePicture: userData.pictures[0]
        }

        const newConversationData = {
            lastActive: new Date(),
            lastMesssage: {
                author: "",
                message: ""
            },
            members: [userData.id, likedCard.userInfo.id],
            memberInfo
        }
        await addNewConversation(newConversationData, [userData.id, likedCard.userInfo.id])
        return likedCard.userInfo
    }
    return null
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

export const getUserLikes = async (uid) => {
    const likesRef = collection(database, 'users', uid, 'likes')
    const q = query(likesRef,
        where('likedBy', '==', uid),
        orderBy('likedOn', 'desc'),
    )
    const querySnapshot = await getDocs(q)
    let likedBy = querySnapshot.docs.map((doc) => doc.data());
    return likedBy
}
export const getLikedBy = async (uid) => {
    const likedByRef = collectionGroup(database, 'likes')
    const q = query(likedByRef,
        where('id', '==', uid),
        orderBy('likedOn', 'desc'),
    )
    const querySnapshot = await getDocs(q)
    let likedBy = querySnapshot.docs.map((doc) => doc.data());
    return likedBy
}

const likedBy = async (uid, likedById) => {
    const likesRef = collectionGroup(database, 'likes')
    const q = query(likesRef,
        where('id', '==', uid),
        where('likedBy', '==', likedById),
        limit(1)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.length
}

export const addTripInfo = async (uid, location) => {
    const userDocRef = doc(database, "users", uid);

    // Update the array with the new element using arrayUnion
    const updateData = {
        goingTo: arrayUnion(location)
    };

    // Update the document
    updateDoc(userDocRef, updateData)
        .then(() => {
            console.log("Document updated successfully!");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
}