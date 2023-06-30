import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Ionicons from '@expo/vector-icons/Ionicons';
import { addPass, addLike } from '../services/UserQueries';
import React from 'react'
import useAuth from '../hooks/useAuth';
import getUserData from '../hooks/userData';
import Card from './Card';
const Deck = ({ cards }) => {
    const { user } = useAuth()
    const { userData } = getUserData()

    const swipeLeft = async (cardIndex) => {
        const passedUser = cards[cardIndex]
        await addPass(user.uid, passedUser)
    }
    const swipeRight = async (cardIndex) => {
        const likedUser = cards[cardIndex]
        await addLike(userData, likedUser)
    }

    return (
        <View style={styles.container}>
            <Swiper
                cardHorizontalMargin={2}
                onSwipedLeft={swipeLeft}
                onSwipedRight={swipeRight}
                animateCardOpacity={false}
                stackSize={2}
                cardIndex={0}
                verticalSwipe={false}
                containerStyle={{ backgroundColor: 'transparent' }}
                cards={cards}
                renderCard={(card) =>
                    <Card card={card} />
                }
            />
        </View>
    )
}

export default Deck

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
    scroll: {
        height: 1000,
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
    },
    card: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white",
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
    cardImageContainer: {
        width: "100%",
        display: 'flex',
        alignItems: 'center'
    },
    cardImage: {
        height: 450,
        width: "100%",
        resizeMode: 'stretch',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})