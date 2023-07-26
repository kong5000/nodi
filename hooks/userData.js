import React, { createContext, useContext, useEffect, useState } from 'react'
import { database } from '../firebase'
import useAuth from './useAuth';
import { collection, onSnapshot, getDoc, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core'
import { Timestamp } from 'firebase/firestore';
import { subscribeToUserTrips } from '../services/TripCollectionQueries';
import { subscribeToConversations } from '../services/ConversationQueries';
import { set } from 'lodash';

export const UserDataContext = createContext({
    userData: null,
    setUserData: () => { },
    trips: [],
    setTrips: () => { },
    conversations: [],
    setConversations: () => { }
});

export const UserDataProvider = ({ children }) => {
    const navigation = useNavigation()

    const { user } = useAuth()
    const [userData, setUserData] = useState(null);
    const [trips, setTrips] = useState([])
    const [conversations, setConversations] = useState([])
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
        const getUserData = async () => {
            let userDoc = await getUserDoc(user.uid)
            if (userDoc.exists()) {
                if (checkUserDocumentComplete(userDoc)) {
                    setUserData(userDoc.data())
                    navigation.navigate('Home')
                } else {
                    navigation.navigate('Modal')
                }
            } else {

                const userData = {
                    email: user.email,
                    joinDate: Timestamp.now(),
                    lastActive: Timestamp.now(),
                    id: user.uid
                };
                try {
                    await setDoc(doc(database, 'users', user.uid), userData)
                    const docRef = doc(database, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
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
                const userInfo = userSnapshot.data();
                // Handle the user data
                setUserData(userInfo)
            }
        });
        return () => {
            unsubscribe();
        };
    }, [user])

    useEffect(() => {
        if (!user) return;
        const unsubscribe = subscribeToUserTrips(user.uid, trips, setTrips)
        return unsubscribe;
    }, [user])

    useEffect(() => {
        if (!user) return;
        const unsubscribe = subscribeToConversations(user.uid, setConversations)
        return unsubscribe;
    }, [user])

    return <UserDataContext.Provider value={{
        userData,
        setUserData,
        trips,
        setTrips,
        conversations,
        setConversations
    }}>
        {children}
    </UserDataContext.Provider>;
}

export default function getUserData() {
    return useContext(UserDataContext)
}