import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import useAuth from '../hooks/useAuth'
import getUserData from '../hooks/userData'
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, query, where, limit, getDocs } from 'firebase/firestore'
import { auth, database } from '../firebase'
import Deck from '../components/Deck'

const HomeScreen = () => {
    const { user } = useAuth()
    const { userData } = getUserData()
    const navigation = useNavigation()
    const [cards, setCards] = useState([])
    const [userTrips, setUserTrips] = useState([])

    const getYourTrips = async () => {
        const userId = user.uid
        const tripsRef = collection(database, 'trips')
        const q = query(tripsRef,
            where('userInfo.id', '==', userId),
            limit(15)
        );
        const querySnapshot = await getDocs(q)
        let documents = querySnapshot.docs.map((doc) => doc.data());
        setUserTrips(documents)
    }


    useEffect(() => {
        // console.log(cards)
    }, [cards])

    const filterDocuments = (potentialCards) => {
        // todo filter based on user prefrences
        // Filter out the users own card if it shows up
        // Filter out users passed on
        let userRemoved = potentialCards.filter(potentialCard => potentialCard.userInfo.id != auth.currentUser.uid)
        return userRemoved
    }
    const addUserDetails = async (potentialCards) => {
        let detailedCards = []
        await Promise.all(potentialCards.map(async (potentialCard) => {
            console.log(`Getting details for ${potentialCard.userInfo.displayName}`)
            const tripsRef = collection(database, 'trips')
            const q = query(tripsRef,
                where('userInfo.id', '==', potentialCard.userInfo.id),
                limit(10)
            );
            const querySnapshot = await getDocs(q)
            let documents = querySnapshot.docs.map((doc) => doc.data());
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
            const tripsRef = collection(database, 'trips')
            const q = query(tripsRef,
                where('dates', 'array-contains-any', userTrips[1].dates),
                where('city', '==', userTrips[1].city),
                where('userInfo.gender', 'in', userData.travelsWith),
                limit(15)
            );
            const querySnapshot = await getDocs(q)
            let documents = querySnapshot.docs.map((doc) => doc.data());
            console.log(documents)
            documents = filterDocuments(documents)
            potentialCards = await addUserDetails(documents)
            console.log(potentialCards)
            setCards(potentialCards)
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

    return (
        <SafeAreaView style={styles.screen}>
            <TouchableOpacity onPress={getYourTrips}>
                <Text>Get Trips</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={testQuery}>
                <Text>CLICK</Text>
            </TouchableOpacity>
            <View style={styles.header}>
                <TouchableOpacity>
                    {userData && <Image style={styles.headerProfile} source={{ uri: userData.profileUrl }} />}
                </TouchableOpacity>
                <Ionicons name="chatbubbles-sharp" size={32} color="orange" />
            </View>
            {cards.length > 0 &&
                <Deck cards={cards} />
            }
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    detailIcon: {
        padding: 10
    },
    userDetailsContainer: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 8,
        width: '90%',
        margin: 10
    },
    userDetail: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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