import {
    doc, updateDoc, getDoc, arrayUnion
} from 'firebase/firestore'
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
// const newConversationData = {
//     lastActive: new Date(),
//     lastMesssage: {
//         author: "",
//         message: ""
//     },
//     members: [userData.id, likedCard.userInfo.id],
//     memberInfo
// }
// await addNewConversation(newConversationData, [userData.id, likedCard.userInfo.id])