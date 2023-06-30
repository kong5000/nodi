import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import useAuth from '../hooks/useAuth'
import getUserData from '../hooks/userData'
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../firebase'
import Deck from '../components/Deck'
import { getTripMatches, getUserTrips } from '../services/TripCollectionQueries'
import { getPasses, getLikedBy } from '../services/UserQueries'
import { getConversations } from '../services/ConversationQueries'
import { DUMMY_DATA } from '../test/dummy_data'
import CityFilter from '../components/CityFilter'


const DEBUG = false

const HomeScreen = () => {
    const { user } = useAuth()
    const { userData } = getUserData()
    const navigation = useNavigation()
    const [cards, setCards] = useState([])
    const [userTrips, setUserTrips] = useState([])
    const [passes, setPasses] = useState([])
    const getUsersWhoLikedMe = async () => {
        const likes = await getLikedBy(user.uid)
        console.log(likes)
    }

    const getPassedUsers = async () => {
        const passedUsers = await getPasses(user.uid)
        const getPassedUserIds = (passedUsers) => {
            return passedUsers.map(x => x.id)
        }
        setPasses(getPassedUserIds(passedUsers))
    }

    const getYourTrips = async () => {
        const userId = user.uid
        let documents = await getUserTrips(userId)
        setUserTrips(documents)
    }

    useEffect(() => {
        // console.log(cards)
        setCards(DUMMY_DATA)
    }, [])

    const filterDocuments = (potentialCards) => {
        // todo filter based on user prefrences
        // Filter out the users own card if it shows up
        // Filter out users passed on
        let userRemoved = potentialCards.filter(potentialCard => potentialCard.userInfo.id != auth.currentUser.uid)
        userRemoved = userRemoved.filter(potentialCard => !passes.includes(potentialCard.userInfo.id))
        return userRemoved
    }

    const addUserDetails = async (potentialCards) => {
        let detailedCards = []
        await Promise.all(potentialCards.map(async (potentialCard) => {
            console.log(`Getting details for ${potentialCard.userInfo.name}`)
            let documents = await getUserTrips(potentialCard.userInfo.id)
            let missedYouIn = []
            let seeYouIn = []
            let headedTo = []
            documents.forEach((doc) => {
                console.log(doc.city)
                userTrips.forEach(trip => {
                    if (trip.city == doc.city) {
                        if (trip.dayFrom <= doc.dayTo && trip.dayTo >= doc.dayFrom) {
                            seeYouIn.push(doc.city)
                        } else {
                            missedYouIn.push(doc.city)
                        }
                    } else {
                        if (!headedTo.includes(doc.city)) {
                            headedTo.push(doc.city)
                        }
                    }
                })
            })
            headedTo = headedTo.filter(city =>
                !missedYouIn.includes(city) && !seeYouIn.includes(city)
            )
            detailedCards.push({ ...potentialCard, seeYouIn, missedYouIn, headedTo })
        }));
        return detailedCards
    }

    const testQuery = async () => {
        try {
            if (userTrips.length == 0) return
            let tempMatches = []
            for (trip of userTrips) {
                let documents = await getTripMatches(trip)
                documents = filterDocuments(documents)
                potentialCards = await addUserDetails(documents)
                tempMatches.push(potentialCards)
            }
            let potentialMatches = []
            for (let temp of tempMatches) {
                potentialMatches = [...potentialMatches, ...temp]
            }
            setCards(potentialMatches)
            console.log(potentialMatches)
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login")
            })
    }
    const handleMatch = (matchedUserInfo) => {
        navigation.navigate('Match')
    }
    return (
        <SafeAreaView style={styles.screen}>
            {DEBUG && <>
                <TouchableOpacity onPress={getYourTrips}>
                    <Text>Get Trips</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={testQuery}>
                    <Text>Get Matches</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={getPassedUsers}>
                    <Text>Get passes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={getUsersWhoLikedMe}>
                    <Text>Get liked bys</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getConversations(user.uid)}>
                    <Text>Get Conversations</Text>
                </TouchableOpacity>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Conversations')
                    }}>
                        <Ionicons name="chatbubbles-sharp" size={32} color="orange" />
                    </TouchableOpacity>

                </View>

            </>}

            <CityFilter />
            {cards.length > 0 &&
                <Deck cards={cards} handleMatch={handleMatch} />
            }
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
    screen: {
        flex: 1
    },
    container: {
        flex: 1,
    },
    text: {
        textAlign: "center",
        fontSize: 30,
        backgroundColor: "transparent"
    },
})