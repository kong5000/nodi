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
        home: 'Mexico City, Mexico',
        photoUrl: 'https://picsum.photos/450/800',
        occupation: 'Reasearch Scientist',
        travelMatches: [
            "Paris",
            "London",
            "New York"
        ],
        travelMisses: [
            "St. Petersburg",
            "Skopje"
        ],
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus lacus in egestas iaculis. Proin in turpis eget velit luctus rhoncus suscipit commodo tellus. Aliquam sed ornare leo. Aliquam eget sapien vitae velit fringilla efficitur."
    },
    {
        id: 2,
        displayName: 'Barry',
        age: 30,
        home: "Vancouver, Canada",
        photoUrl: 'https://picsum.photos/450/800',
        occupation: 'Lawyer',
        travelMatches: [
            "Paris",
            "London",
            "New York"
        ],
        travelMisses: [
            "Budapest",
            "Istanbul",
            "Riga"
        ],
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus lacus in egestas iaculis. Proin in turpis eget velit luctus rhoncus suscipit commodo tellus. Aliquam sed ornare leo. Aliquam eget sapien vitae velit fringilla efficitur."
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
                        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                            <TouchableOpacity activeOpacity={1}>
                                <View key={card.id} style={styles.card}>
                                    <Image style={styles.cardImage} source={{ uri: card.photoUrl }} />
                                    <View style={styles.cardSummary}>
                                        <View style={styles.cardNameLocation}>
                                            <Text style={styles.text}>{card.displayName}, {card.age}</Text>
                                            <Text style={styles.cardSmallText}>{card.home}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.userDetailsContainer}>
                                        <View style={styles.userDetail}>
                                            <Ionicons 
                                            style={styles.detailIcon}
                                            name="briefcase-outline" size={32} />
                                            <Text style={styles.cardSmallText}>{card.occupation}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.travelMatches}>
                                        <Text style={styles.text}>See You In</Text>
                                        <View style={styles.cityMatches}>
                                            {card.travelMatches.map((city) =>
                                                <View style={styles.city}>
                                                    <Text style={styles.cityText}>{city}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.travelMatches}>
                                        <Text style={styles.text}>Missed You In</Text>
                                        <View style={styles.cityMatches}>
                                            {card.travelMisses.map((city) =>
                                                <View style={styles.city}>
                                                    <Text style={styles.cityText}>{city}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                    <View>
                                        <View>
                                            <Text >{card.blurb}</Text>
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
    detailIcon:{
        padding:10
    },
    userDetailsContainer: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 8,
        width: '90%',
        margin:10
    },
    userDetail: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center'
    },
    city: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 8,
        margin: 10,
    },
    cityText: {
        fontSize: 20,
        padding: 5
    },
    travelMatches: {
        display: 'flex',
        flexDirection: 'column',
        width: '95%'
    },
    cityMatches: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    cardSummary: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: 15
    },
    cardNameLocation: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 30,
        backgroundColor: "transparent"
    },
    cardSmallText: {
        textAlign: "center",
        fontSize: 20,
        backgroundColor: "transparent",
        marginTop: 2
    },
    cardImage: {
        height: 450,
        width: "100%",
        resizeMode: 'stretch',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})