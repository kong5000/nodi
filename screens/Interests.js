import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { COLORS, FLEX_CENTERED, TEXT_STYLES } from '../style'
import NextButton from '../components/NextButton';
import StyleText from '../components/StyleText'
const { width, height } = Dimensions.get('window');

const thingsToDo = [
    { text: "Festivals", emoticon: "🎊" },
    { text: "Road Trips", emoticon: "🚗" },
    { text: "Beaches", emoticon: "🏖️" },
    { text: "Markets", emoticon: "🧺" },
    { text: "Nature", emoticon: "🌳" },
    { text: "Architecture", emoticon: "🏛️" },
    { text: "Museums", emoticon: "🖼️" },
    { text: "Hiking", emoticon: "⛰️" },
    { text: "Sports", emoticon: "🏟️" },
    { text: "Concerts", emoticon: "🎤" },
    { text: "Nightlife", emoticon: "🍸" },
    { text: "Art", emoticon: "🎭" },
]

const foodAndDrink = [
    { text: "Vegan Food", emoticon: "🥬" },
    { text: "Street Food", emoticon: "🥙" },
    { text: "Fine Dining", emoticon: "🍽️" },
    { text: "Pubs and Bars", emoticon: "🍺" },
]

const Interests = ({ setPage }) => {
    const [interests, setInterests] = useState([])
    const [formIncomplete, setFormIncomplete] = useState(true)

    useEffect(() => {
        if (interests.length >= 2) {
            setFormIncomplete(false)
        } else {
            setFormIncomplete(true)
        }
    }, [interests])

    const toggleInterest = (activity) => {
        if (interests.includes(activity)) {
            const updatedArray = interests.filter((item) => item !== activity);
            setInterests(updatedArray)
        } else {
            setInterests([...interests, activity])
        }
    }
    return (
        <View style={styles.container}>
            {thingsToDo.map((item) =>
                <TouchableOpacity onPress={() => toggleInterest(item.text)}>
                    <View style={[styles.activity, interests.includes(item.text) ? styles.enabled : styles.activityDisabled]}>
                        <StyleText
                            text={item.text}
                            fontSize={16}
                        />
                    </View>
                </TouchableOpacity>)}
        </View>
    )
}

export default Interests


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '82%',
        flexDirection: 'row',
    },
    activity: {
        ...FLEX_CENTERED,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 15,
        width: width * 0.37,
        marginVertical: '4%',
        marginRight: '4%'
    },
    enabled: {
        backgroundColor: COLORS.lightHighlight,
        borderColor: 'transparent',
        color: "white",

    },
    activityDisabled: {
        borderColor: COLORS.neutralGrey,
    },
    updateButton: {

    },
    greyedOut: {
        color: 'gray'
    }
});