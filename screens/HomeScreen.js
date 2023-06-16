import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import useAuth from '../hooks/useAuth'
import getUserData from '../hooks/userData'
import Ionicons from '@expo/vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper'

const DUMMY_DATA = [
    {
        id: 1,
        displayName: 'Ashley',
        age: 20,
        home:'Mexico City',
        photoUrl: 'https://picsum.photos/450/800'
    },
    {
        id: 2,
        displayName: 'Barry',
        age: 30,
        home:"Vancouver",
        photoUrl: 'https://picsum.photos/450/800'
    }
]

const HomeScreen = () => {
    const { user } = useAuth()
    const { userData } = getUserData()
    const navigation = useNavigation()
    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login")
            })
    }
    const goToChat = () => {
        navigation.navigate("Chat")
    }
    const goToUpload = () => {
        navigation.navigate("Upload")
    }
    const goToConversations = () => {
        navigation.navigate("Conversations")
    }
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity>
                    {userData && <Image style={styles.headerProfile} source={{ uri: userData.profileUrl }} />}
                </TouchableOpacity>
                <Ionicons name="chatbubbles-sharp" size={32} color="orange" />
            </View>
            <View style={styles.container}>
                <Swiper
                    animateCardOpacity={false}
                    stackSize={2}
                    cardIndex={0}
                    verticalSwipe={false}
                    containerStyle={{ backgroundColor: 'transparent' }}
                    cards={DUMMY_DATA}
                    renderCard={(card) =>
                        <ScrollView style={styles.scroll}>
                            <TouchableOpacity activeOpacity={1}>
                                <View key={card.id} style={styles.card}>
                                    <Image style={styles.cardImage} source={{ uri: card.photoUrl }} />
                                    <View>
                                        <View>
                                            <Text style={styles.text}>{card.displayName}</Text>
                                            <Text >{card.home}</Text>
                                            <Text >{card.age}</Text>
                                            <Text style={styles.text}>{card.displayName}</Text>
                                            <Text style={styles.text}>{card.displayName}</Text>
                                            <Text style={styles.text}>{card.displayName}</Text>
                                            <Text style={styles.text}>{card.displayName}</Text>
                                            <Text style={styles.text}>{card.displayName}</Text>
                                            <Text style={styles.text}>{card.displayName}</Text>
                                            <Text style={styles.text}>{card.displayName}</Text>
                                            <Text style={styles.text}>{card.displayName}</Text>
                                            <Text style={styles.text}>{card.displayName}</Text>
                                            <Text style={styles.text}>{card.displayName}</Text>
                                            <Text style={styles.text}>{card.displayName}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    }
                />
            </View>
            {/* <View style={styles.container}>
                <Text>Email:{auth.currentUser?.email}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={goToChat}
                >
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={goToUpload}
                >
                    <Text style={styles.buttonText}>Upload Picture</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignOut}
                >
                    <Text style={styles.buttonText}>Signout</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={goToConversations}
                >
                    <Text style={styles.buttonText}>Conversations</Text>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        height: 1000
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    headerProfile: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    cardStack: {
        display: 'flex',
    },
    screen: {
        flex: 1
    },
    container: {
        flex: 1,
    },
    card: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    },
    cardImage: {
        height: 600,
        width: 400,
        resizeMode: 'stretch',
    }
})