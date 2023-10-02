import { ImageBackground, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'
import getUserData from '../hooks/userData'
import { COLORS, TEXT_STYLES } from '../style'
import { Asset, useAssets } from 'expo-asset';
import { addGeoHash } from '../services/GeoQueries'
const LoginScreen = () => {
    const [assets, error] = useAssets([require('../assets/gradient.png')]);
    const [email, setEmail] = useState('')
    const [creatingAccount, setCreatingAccount] = useState(false)
    const [loggingIn, setloggingIn] = useState(false)
    const [password, setPassword] = useState('')
    const { userData } = getUserData()
    const navigation = useNavigation()
    const testSignup = () => {
        setEmail('c@c.com')
        setPassword('password')
    }
    const testLogin = () => {
        setEmail('a@a.com')
        setPassword('password')
    }
    const testLogin2 = () => {
        setEmail('b@b.com')
        setPassword('password')
    }
    useEffect(() => {
        if(password == "password"){
            handleLogin()
        }
    }, [email, password])
    useEffect(() => {
        if (userData) {
            setCreatingAccount(false)
        }
    }, [userData])

    const handleSignUp = async () => {
        try {
            setCreatingAccount(true)
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
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
            {/* <ImageBackground source={{ uri: Asset.fromModule(require("../assets/gradient.png")).uri }} resizeMode="cover" style={styles.image}> */}

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
                        style={TEXT_STYLES.input}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={text => {
                            setPassword(text)
                        }}
                        style={TEXT_STYLES.input}
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
                <TouchableOpacity onPress={() => {
                    testLogin()
                    // handleLogin()
                }}>
                    <Text>DEBUG LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    testLogin2()
                    // handleLogin()
                }}>
                    <Text>DEBUG LOGIN 2</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    testSignup()
                    // handleLogin()
                }}>
                    <Text>Creatre User Debug</Text>
                </TouchableOpacity>
            {/* </ImageBackground> */}

        </KeyboardAvoidingView >
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
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
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: "100%",
        alignItems: 'center'
    },
})