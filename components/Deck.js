import { StyleSheet, View } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import React from 'react'
import useAuth from '../hooks/useAuth';
import getUserData from '../hooks/userData';
import Card from './Card';
import { addLike, addPass } from '../services/UserQueries';
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
        if (likedBack) {
            handleMatch(likedBack)
        }
    }

    return (
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
    )
}

export default Deck

const styles = StyleSheet.create({
    container: {
        padding: 100
    },

    text: {
        textAlign: "center",
        fontSize: 30,
        backgroundColor: "transparent"
    },
})