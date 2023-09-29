import {
    StyleSheet, View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { getCards } from '../services/Utils'
import Footer from '../components/Footer'
import ParallaxCarousel from '../components/ParallaxCarousel'
import getUserData from '../hooks/userData'
import * as Location from 'expo-location';

const HomeScreen = () => {
    const { user } = useAuth()
    const { userData } = getUserData()
    // const [trips, setTrips] = useState([])

    const [items, setItems] = useState([])

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
        })();
    }, []);

    useEffect(() => {
        const queryData = async () => {
            if (!userData) return
            try {
                let potentialMatches = await getCards(userData)
                setItems(potentialMatches)
            } catch (err) {
                console.log(err)
            }
        }
        queryData()
    }, [userData])

    return (
        <View style={styles.screen}>
            <ParallaxCarousel
                items={items}
            />
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