import {
    StyleSheet, Text, TouchableOpacity, View, Animated,
    Dimensions,
    StatusBar,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import useAuth from '../hooks/useAuth'
import Ionicons from '@expo/vector-icons/Ionicons'
import { auth } from '../firebase'
import Deck from '../components/Deck'
import { getConversations } from '../services/ConversationQueries'
import { DUMMY_DATA } from '../test/dummy_data'
import { getCards } from '../services/Utils'
import Footer from '../components/Footer'
import * as Location from 'expo-location';
import { COLORS } from '../style'
import ParallaxCarousel from '../components/ParallaxCarousel'

const DEBUG = false

const HomeScreen = () => {
    const { user } = useAuth()
    const navigation = useNavigation()
    const [cards, setCards] = useState(DUMMY_DATA)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { width, height } = Dimensions.get('window');
    const [items, setItems] = useState({})


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            setLocation(location);
        })();
    }, []);

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login")
            })
    }
    const handleMatch = (matchedUserInfo) => {
        navigation.navigate('Match')
    }
    const calculateAge = (dateOfBirth) => {
        var today = new Date();
        var birthDate = new Date(dateOfBirth);

        var age = today.getFullYear() - birthDate.getFullYear();
        var monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
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
                console.log(potentialMatches)
            } catch (err) {
                // alert(err)
                console.log(err)
            }
        }
        queryData()
    }, [])
    return (
        <View style={styles.screen}>
            {DEBUG && <>
                <TouchableOpacity onPress={getCards}>
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
            <ParallaxCarousel items={items} />
            {/* {(cards && cards.length > 0) &&
                <Deck cards={cards} handleMatch={handleMatch} />
            } */}
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