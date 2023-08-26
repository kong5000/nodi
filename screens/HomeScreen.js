import {
    StyleSheet, View,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import useAuth from '../hooks/useAuth'
import { auth } from '../firebase'
import { DUMMY_DATA } from '../test/dummy_data'
import { getCards } from '../services/Utils'
import Footer from '../components/Footer'
import ParallaxCarousel from '../components/ParallaxCarousel'
import Search from '../components/Search'
import { calculateAge } from '../services/Utils'
import getUserData from '../hooks/userData'
import StyleText from '../components/StyleText'
import { addGeoHash, radiusQuery } from '../services/GeoQueries'
import * as Location from 'expo-location';

const HomeScreen = () => {
    const { user } = useAuth()
    const { userData } = getUserData()
    // const [trips, setTrips] = useState([])
    const [cards, setCards] = useState(DUMMY_DATA)

    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    const [selectedTripIndex, setSelectedTripIndex] = useState(0)

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log(location)
        })();
    }, []);



    const { trips } = getUserData()

    // useEffect(()=> {
    //     console.log(selectedTrip)
    //     if(!selectedTrip){
    //         setFilteredItems(items)
    //     }

    // },[selectedTripIndex])

    useEffect(() => {
        const queryData = async () => {
            if(!userData) return
            try {
                let potentialMatches = await getCards(userData)
                // potentialMatches = DUMMY_DATA
                setCards(potentialMatches)
                let carouselItems = potentialMatches.map(match => {
                    return ({
                        id: match.id,
                        image: match.pictures[0],
                        name: match.name,
                        age: calculateAge(match.birthDate),
                        goingTo: match.goingTo,
                        interests: match.interests
                    })
                })
                setItems(carouselItems)
            } catch (err) {
                // alert(err)
                console.log(err)
            }
        }
        queryData()
    }, [userData])

    return (
        <View style={styles.screen}>
            <ParallaxCarousel
                noTrips={!trips.length}
                items={items}
                selectedTrip={trips[selectedTripIndex]} />
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