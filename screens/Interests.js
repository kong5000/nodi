import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

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

const Interests = () => {
    const [interests, setInterests] = useState([])
    const [valid, setValid] = useState(false)

    useEffect(() => {
        if (interests.length >= 2) {
            setValid(true)
        } else {
            setValid(false)
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
            <TouchableOpacity
                disabled={!valid}
                onPress={() => {
                    alert("done")
                }}
            >
                <Text style={!valid ? styles.greyedOut : styles.updateButton}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Interests


const styles = StyleSheet.create({
    activityText: {
        fontSize: 17

    },
    interestsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'red',
        width: '100%',
        flexDirection: 'row'
    },
    activity: {
        backgroundColor: 'white',
        borderRadius: 20,
        // height: 30,
        margin: 10,
        padding: 8,
    },
    activityDisabled: {
        backgroundColor: 'green',
        borderRadius: 20,
        margin: 10,
        padding: 8
    },
    updateButton: {

    },
    greyedOut: {
        color: 'gray'
    }
});