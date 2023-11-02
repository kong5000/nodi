import { useNavigation } from '@react-navigation/core'
import { useAssets } from 'expo-asset'
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from "expo-web-browser"
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import getUserData from '../hooks/userData'
import { TEXT_STYLES } from '../style'

WebBrowser.maybeCompleteAuthSession()

const LoginScreen = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        iosClientId: '750477199673-9h0k4rolp66ob945jqm5a58q2u18c148.apps.googleusercontent.com',
        androidClientId: '750477199673-m14r747trb3haoip3v2dg50egvflt9bu.apps.googleusercontent.com',
        expoClientId: '750477199673-j7qb940cs6ohvmq1b6vhhh6m6aocvevv.apps.googleusercontent.com',
    })
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
    const testLogin3 = () => {
        setEmail('keith.ong5000@gmail.com')
        setPassword('password')
    }
    useEffect(() => {
        if (password == "password" && email != "keith.ong5000@gmail.com") {
            handleLogin()
        }
    }, [email, password])

    useEffect(() => {
        if (response?.type == "success") {
            const { id_token } = response.params
            const credential = GoogleAuthProvider.credential(id_token)
            signInWithCredential(auth, credential)
        }
    }, [response])

    useEffect(() => {
        if (userData) {
            setCreatingAccount(false)
        }
    }, [userData])

    const handleSignUp = async () => {
        try {
            setCreatingAccount(true)
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            console.log("user created")

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
                testLogin3()
                // handleLogin()
            }}>
                <Text>DEBUG LOGIN 3 GMAIL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                testSignup()
                // handleLogin()
            }}>
                <Text>Creatre User Debug</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => promptAsync()}
            >
                <Text> Sign in with google</Text>
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