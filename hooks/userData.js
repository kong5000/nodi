import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, database } from '../firebase'
import useAuth from './useAuth';
import { collection, onSnapshot, query, where, getDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core'

const UserDataContext = createContext({});

export const UserDataProvider = ({ children }) => {
    const navigation = useNavigation()

    const { user } = useAuth()
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (!user) return;
        // const userRef = collection(database, 'users')
        const userRef = doc(collection(database, 'users'), user.uid)

        const unsubscribe = onSnapshot(userRef, (userSnapshot) => {
            if (userSnapshot.exists()) {
                const userInfo = userSnapshot.data();
                // Handle the user data
                if (userInfo.profilePicture) {
                    setUserData(userInfo)
                    console.log("User data is")
                    console.log(userInfo);
                    navigation.navigate('Home')
                } else {
                    navigation.navigate('Modal')
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, [user]);
    return <UserDataContext.Provider value={{ userData }}>{children}</UserDataContext.Provider>;
}

export default function getUserData() {
    return useContext(UserDataContext)
}