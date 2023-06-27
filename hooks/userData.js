import React, { createContext, useContext, useEffect, useState } from 'react'
import { database } from '../firebase'
import useAuth from './useAuth';
import { collection, onSnapshot, getDoc, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core'
import { Timestamp } from 'firebase/firestore';

export const UserDataContext = createContext({
    userData: null,
    setUserData: () => {}
});

export const UserDataProvider = ({ children }) => {
    const navigation = useNavigation()
    
    const { user } = useAuth()
    const [userData, setUserData] = useState(null);
    const value = { userData, setUserData };

    const setData = (data) => {
        setUserData(data)
    }

    const getUserDoc = async (userId) => {
        const userRef = doc(database, 'users', userId);
        const docSnap = await getDoc(userRef);
        return docSnap
    }

    const checkUserDocumentComplete = (userDoc) => {
        return userDoc.data().gender
    }

    useEffect(() => {
        if (!user) return;
        console.log("Getting user data")
        const getUserData = async () => {
            let userDoc = await getUserDoc(user.uid)
            if (userDoc.exists()) {
                console.log("Doc exists")
                if (checkUserDocumentComplete(userDoc)) {
                    setUserData(userDoc.data())
                    console.log("User data is", userDoc.data())
                    navigation.navigate('Home')
                } else {
                    navigation.navigate('Modal')
                }
            } else {
                console.log("No Doc making a new one")

                const userData = {
                    email: user.email,
                    joinDate: Timestamp.now(),
                    lastActive: Timestamp.now(),
                    id: user.uid
                };
                try {
                    await setDoc(doc(database, 'users', user.uid), userData)
                    console.log("Set doc complete")
                    const docRef = doc(database, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    console.log('User document created successfully!');
                    setUserData(docSnap.data())
                    navigation.navigate('Modal')
                } catch (err) {
                    console.log(err)
                }
            }
        }
        getUserData()
    }, [user]);

    useEffect(() => {
        if (!user) return;
        const userRef = doc(collection(database, 'users'), user.uid)

        const unsubscribe = onSnapshot(userRef, (userSnapshot) => {
            if (userSnapshot.exists()) {
                console.log("User data updated")
                const userInfo = userSnapshot.data();
                // Handle the user data
                setUserData(userInfo)
                console.log("User data is")
                console.log(userInfo);
            }
        });
        return () => {
            unsubscribe();
        };
    },
        [user])

    return <UserDataContext.Provider value={{ userData, setUserData }}>{children}</UserDataContext.Provider>;
}

export default function getUserData() {
    return useContext(UserDataContext)
}