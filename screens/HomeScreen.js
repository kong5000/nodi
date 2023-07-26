import {
    StyleSheet, Text, TouchableOpacity, View,
    Dimensions,
} from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import useAuth from '../hooks/useAuth'
import Ionicons from '@expo/vector-icons/Ionicons'
import { auth } from '../firebase'
import { getConversations } from '../services/ConversationQueries'
import { DUMMY_DATA } from '../test/dummy_data'
import { getCards } from '../services/Utils'
import Footer from '../components/Footer'
import * as Location from 'expo-location';
import ParallaxCarousel from '../components/ParallaxCarousel'
import Search from '../components/Search'
import TrustGraph from '../components/TrustGraph'
import Deck from '../components/Deck'
import { calculateAge } from '../services/Utils'
import { getUserTrips, subscribeToUserTrips } from '../services/TripCollectionQueries'
import getUserData from '../hooks/userData'

const DEBUG = false
const HomeScreen = () => {
    const { user } = useAuth()
    const navigation = useNavigation()
    // const [trips, setTrips] = useState([])
    const [cards, setCards] = useState(DUMMY_DATA)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { width, height } = Dimensions.get('window');
    const [items, setItems] = useState({})

    const { trips, setTrips } = getUserData()

    // useEffect(() => {
    //     const initializeTrips = async () => {
    //         let trips = await getUserTrips(user.uid)

    //         setTrips(trips)
    //     }
    //     initializeTrips()
    // }, []);

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login")
            })
    }
    const handleMatch = (matchedUserInfo) => {
        navigation.navigate('Match')
    }


    useEffect(() => {
        const queryData = async () => {
            try {
                let potentialMatches = await getCards(user.uid)
                // potentialMatches = DUMMY_DATA
                setCards(potentialMatches)
                let carouselItems = potentialMatches.map(match => {
                    return ({
                        id: match.userInfo.id,
                        image: match.userInfo.pictures[0],
                        title: match.userInfo.name,
                        age: calculateAge(match.userInfo.birthDate),
                        city: match.city
                    })
                })
                setItems(carouselItems)
            } catch (err) {
                // alert(err)
                console.log(err)
            }
        }
        queryData()
    }, [])
    return (
        <View style={styles.screen}>
            <Search trips={trips} />
            <ParallaxCarousel items={items} />
            <Footer />
        </View>
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
        flex: 1,
        backgroundColor: "white"
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