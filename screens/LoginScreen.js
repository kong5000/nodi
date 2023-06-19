import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, database } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'
import getUserData from '../hooks/userData'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [creatingAccount, setCreatingAccount] = useState(false)
    const [loggingIn, setloggingIn] = useState(false)
    const [password, setPassword] = useState('')
    const { userData } = getUserData()
    const navigation = useNavigation()

    useEffect(() => {
        if (userData) {
            setCreatingAccount(false)
            navigation.navigate("Modal")
        }
    }, [userData])

    const handleSignUp = async () => {
        try {
            setCreatingAccount(true)
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredentials.user
        }
        catch (error) {
            setCreatingAccount(false)
            alert(error.message)
        }
    }

    const handleLogin = () => {
        setloggingIn(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log(`Logged in with ${user.email}`)
                setloggingIn(false)
            })
            .catch(error => {
                alert(error)
                setloggingIn(false)
            })
    }
    return (
        // Make sure keyboard doesn't cover input fields
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                {creatingAccount && <Text>Creating Your Account</Text>}
                {loggingIn && <Text>Logging in </Text>}
                <ActivityIndicator animating={creatingAccount} size="large" color="#ff0000" />
                <ActivityIndicator animating={loggingIn} size="large" color="#00ff00" />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => {
                        setEmail(text)
                    }}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={text => {
                        setPassword(text)
                    }}
                    style={styles.input}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={[styles.button]}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})