import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import useAuth from '../hooks/useAuth'
import getUserData from '../hooks/userData'
import Ionicons from '@expo/vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper'
import { collection, addDoc, orderBy, query, onSnapshot, where, limit, getDocs, setDoc } from 'firebase/firestore'
import { auth, database, sayHello } from '../firebase'
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

const DUMMY_DATA = [
    {
        userInfo: {
            id: 1,
            displayName: 'Ashley',
            age: 20,
            home: 'Mexico City, Mexico',
            pictures: ['https://picsum.photos/450/800'],
            occupation: 'Reasearch Scientist',

            blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus lacus in egestas iaculis. Proin in turpis eget velit luctus rhoncus suscipit commodo tellus. Aliquam sed ornare leo. Aliquam eget sapien vitae velit fringilla efficitur."

        }
        ,seeYouIn: [
            "Paris",
            "London",
            "New York"
        ],
        missedYouIn: [
            "St. Petersburg",
            "Skopje"
        ],
        headedTo: [],
    },
    {
        userInfo: {
            id: 2,
            displayName: 'Barry',
            age: 30,
            home: "Vancouver, Canada",
            pictures: ['https://picsum.photos/450/800'],
            occupation: 'Lawyer',

            blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus lacus in egestas iaculis. Proin in turpis eget velit luctus rhoncus suscipit commodo tellus. Aliquam sed ornare leo. Aliquam eget sapien vitae velit fringilla efficitur."
        }
        , seeYouIn: [
            "Paris",
            "London",
            "New York"
        ],
        missedYouIn: [
            "Budapest",
            "Istanbul",
            "Riga"
        ],
        headedTo: [],

    }

]

const DUMMY_PASSED = ["dummyuserid"]

const HomeScreen = () => {
    const { user } = useAuth()
    const { userData } = getUserData()
    const navigation = useNavigation()
    const [cards, setCards] = useState(DUMMY_DATA)
    const [userTrips, setUserTrips] = useState([])

    useEffect(() => {
        // Get your trips
        const getYourTrips = async () => {
            const userId = auth.currentUser.uid
            const tripsRef = collection(database, 'trips')
            const q = query(tripsRef,
                where('userInfo.id', '==', userId),
                limit(15)
            );
            const querySnapshot = await getDocs(q)
            let documents = querySnapshot.docs.map((doc) => doc.data());
            setUserTrips(documents)
        }
        getYourTrips()
    }, [])
    useEffect(() => {
        // console.log(cards)
    }, [cards])

    const addTrip = () => {
        function getDates(startDate, stopDate) {
            var dateArray = [];
            var currentDate = moment(startDate);
            var stopDate = moment(stopDate);
            while (currentDate <= stopDate) {
                dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
                currentDate = moment(currentDate).add(1, 'days');
            }
            return dateArray;
        }

        const startDate = new Date('2023-06-01');
        const endDate = new Date('2023-06-04');

        const newTrip = {
            userInfo: {
                ...userData,
                id: auth.currentUser.uid
            },
            city: "Paris",
            country: "France",
            year: "2023",
            from: Timestamp.fromDate(startDate),
            to: Timestamp.fromDate(endDate),
            dates: getDates(startDate, endDate)
        };

        const tripsCollectionRef = collection(database, 'trips');

        // Add a new document to the "trips" collection
        addDoc(tripsCollectionRef, newTrip)
            .then((docRef) => {
                console.log('New document ID:', docRef.id);
            })
            .catch((error) => {
                console.error('Error adding document:', error);
            });
        console.log(newTrip)
    }

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
                    if (trip.city == doc.city && trip.country == doc.country) {
                        if (trip.from.toDate() <= doc.to.toDate() && trip.to.toDate() >= doc.from.toDate()) {
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
            console.log(`See you in ${seeYouIn}`)
            console.log(`Missed you in ${missedYouIn}`)
            console.log(`Headed to ${headedTo}`)
            detailedCards.push({ ...potentialCard, seeYouIn, missedYouIn, headedTo })
        }));

        return detailedCards
    }

    const testQuery = async () => {
        try {
            const tripsRef = collection(database, 'trips')
            const q = query(tripsRef,
                where('dates', 'array-contains-any', userTrips[0].dates),
                where('year', '==', userTrips[0].year),
                where('city', '==', userTrips[0].city),
                where('country', '==', userTrips[0].country),
                limit(15)
            );
            const querySnapshot = await getDocs(q)
            let documents = querySnapshot.docs.map((doc) => doc.data());
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
            <TouchableOpacity onPress={testQuery}>
                <Text>CLICK</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addTrip}>
                <Text>Test adding trip</Text>
            </TouchableOpacity>
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
                    cards={cards}
                    renderCard={(card) =>
                        <ScrollView key={card.userInfo.id} style={styles.scroll} showsVerticalScrollIndicator={false}>
                            <TouchableOpacity activeOpacity={1}>
                                <View style={styles.card}>
                                    <Image style={styles.cardImage} source={{ uri: card.userInfo.pictures[0] }} />
                                    <View style={styles.cardSummary}>
                                        <View style={styles.cardNameLocation}>
                                            <Text style={styles.text}>{card.userInfo.displayName}, {card.userInfo.age}</Text>
                                            <Text style={styles.cardSmallText}>{card.userInfo.home}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.userDetailsContainer}>
                                        <View style={styles.userDetail}>
                                            <Ionicons
                                                style={styles.detailIcon}
                                                name="briefcase-outline" size={32} />
                                            <Text style={styles.cardSmallText}>{card.userInfo.occupation}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.travelMatches}>
                                        <Text style={styles.text}>See You In</Text>
                                        <View style={styles.cityMatches}>
                                            {card.seeYouIn && card.seeYouIn.map((city) =>
                                                <View key={city} style={styles.city}>
                                                    <Text style={styles.cityText}>{city}</Text>
                                                </View>
                                            )}

                                        </View>
                                    </View>
                                    <View style={styles.travelMatches}>
                                        <Text style={styles.text}>Missed You In</Text>
                                        <View style={styles.cityMatches}>
                                            {card.missedYouIn && card.missedYouIn.map((city) =>
                                                <View key={city} style={styles.city}>
                                                    <Text style={styles.cityText}>{city}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                    <View>
                                        {/* <View>
                                            <Text >{card.userInfo.blurb}</Text>
                                        </View> */}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    }
                />
            </View>
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