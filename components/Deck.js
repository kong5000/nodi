import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Ionicons from '@expo/vector-icons/Ionicons';
import { addPass, addLike } from '../services/UserQueries';
import React from 'react'
import useAuth from '../hooks/useAuth';
import getUserData from '../hooks/userData';
import Card from './Card';
const Deck = ({ cards, handleMatch }) => {
    const { user } = useAuth()
    const { userData } = getUserData()

    const swipeLeft = async (cardIndex) => {
        const passedUser = cards[cardIndex]
        await addPass(user.uid, passedUser)
    }
    const swipeRight = async (cardIndex) => {
        const likedUser = cards[cardIndex]
        const likedBack = await addLike(userData, likedUser)
        if(likedBack){
            handleMatch(likedBack)
        }
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
    container: {
    },

    text: {
        textAlign: "center",
        fontSize: 30,
        backgroundColor: "transparent"
    },
})