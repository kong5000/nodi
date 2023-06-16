import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, database } from '../firebase'
import useAuth from './useAuth';
import { collection, onSnapshot, query, where, getDoc ,doc} from 'firebase/firestore';

const UserDataContext = createContext({});

export const UserDataProvider = ({ children }) => {
    const { user } = useAuth()
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (!user) return;
        const userRef = doc(collection(database, 'users'), user.uid)

        const unsubscribe = onSnapshot(userRef, (userSnapshot) => {
            if (userSnapshot.exists()) {
                const userInfo = userSnapshot.data();
                // Handle the user data
                setUserData(userInfo)
                console.log(userData);
            } else {
                // Handle the case when the document doesn't exist
                console.log('User document not found');
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