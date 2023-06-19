import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, database } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                console.log("USER AUTHED AS")
                console.log(user)
                setUser(user)
            } else {
                console.log("NO USER")
                setUser(null)
            }
        })
        return unsubscribe
    })
    return (
        <AuthContext.Provider value={{
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}