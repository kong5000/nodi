import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { COLORS, TEXT_STYLES } from '../style'
import NextButton from '../components/NextButton';

const thingsToDo = [
    { text: "Festivals", emoticon: "🎊" },
    { text: "Walking Tours", emoticon: "🚶" },
    { text: "Road Trips", emoticon: "🚗" },
    { text: "Beaches", emoticon: "🏖️" },
    { text: "Markets", emoticon: "🧺" },
    { text: "Parks and Nature", emoticon: "🌳" },
    { text: "Architecture", emoticon: "🏛️" },
    { text: "Museums and Art", emoticon: "🖼️" },
    { text: "Hiking", emoticon: "⛰️" },
    { text: "Biking", emoticon: "🚲" },
    { text: "Sporting Events", emoticon: "🏟️" },
    { text: "Concerts", emoticon: "🎤" },
    { text: "Nightlife", emoticon: "🍸" },
    { text: "Performing Arts", emoticon: "🎭" },
]

const foodAndDrink = [
    { text: "Vegan Food", emoticon: "🥬" },
    { text: "Street Food", emoticon: "🥙" },
    { text: "Fine Dining", emoticon: "🍽️" },
    { text: "Pubs and Bars", emoticon: "🍺" },
]

const Interests = ({setPage, interests, setInterests}) => {
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
        <View style={styles.interestsContainer}>
            <Text style={TEXT_STYLES.header}>Favorite things to do on a trip?</Text>
            {thingsToDo.map((item) =>
                <TouchableOpacity onPress={() => toggleInterest(item.text)}>
                    <View style={interests.includes(item.text) ? styles.activityDisabled : styles.activity}>
                        <Text style={styles.activityText}>{item.text} {item.emoticon}</Text>
                    </View>
                </TouchableOpacity>)}

            {foodAndDrink.map((item) =>
                <TouchableOpacity onPress={() => toggleInterest(item.text)}>
                    <View style={interests.includes(item.text) ? styles.activityDisabled : styles.activity}>
                        <Text style={styles.activityText}>{item.text} {item.emoticon}</Text>
                    </View>
                </TouchableOpacity>)}
            <NextButton
                index={4}
                setPage={setPage}
                formIncomplete={formIncomplete}
                incompleteMessage="Please pick at least two interests" />
        </View>
    )
}

export default Interests


const styles = StyleSheet.create({
    activityText: {
        ...TEXT_STYLES.standard,
        color: COLORS.darkContrast,
        fontSize: 17,
    },
    interestsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        flexDirection: 'row',
    },
    activity: {
        backgroundColor: COLORS.mainTheme,
        borderColor: COLORS.brightContrast,
        borderWidth: 2,
        borderRadius: 30,
        margin: 10,
        // padding: 10,
        fontSize: 18,
        fontWeight: "400",
        color: "white",
 
    },
    activityDisabled: {
        backgroundColor: "white",
        borderWidth: 2,
        borderRadius: 30,
        margin: 10,
        padding: 10,
        borderColor: "white"
    },
    updateButton: {

    },
    greyedOut: {
        color: 'gray'
    }
});