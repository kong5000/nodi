import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { COLORS, FLEX_CENTERED, TEXT_STYLES } from '../style'
import NextButton from '../components/NextButton';
import StyleText from '../components/StyleText'
const { width, height } = Dimensions.get('window');
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const thingsToDo = [
    {
        text: "Festivals", icon: <MaterialCommunityIcons
            name="party-popper" size={24}
            color={COLORS.mainTheme}
            style={{ marginRight: '10%' }}
        />
    },
    {
        text: "Road Trips", icon: <MaterialIcons
            name="drive-eta"
            size={24}
            color={COLORS.mainTheme}
            style={{ marginRight: '10%' }}
        />

    },
    {
        text: "Beaches", icon: <FontAwesome5
            name="umbrella-beach"
            size={20}
            color={COLORS.mainTheme}
            style={{ marginRight: '10%' }}
        />
    },
    {
        text: "Markets", icon: <FontAwesome5
            name="shopping-basket"
            size={24}
            color={COLORS.mainTheme}
            style={{ marginRight: '10%' }}
        />
    },
    {
        text: "Nature", icon: <FontAwesome5
            name="tree"
            size={24}
            color={COLORS.mainTheme}
            style={{ marginRight: '10%' }}
        />
    },
    {
        text: "Museums", icon: <MaterialIcons
            name="museum"
            size={24}
            color={COLORS.mainTheme}
            style={{ marginRight: '10%' }}
        />
    },
    {
        text: "Hiking", icon: <FontAwesome5
            name="mountain"
            size={20}
            color={COLORS.mainTheme}
            style={{ marginRight: '10%' }}
        />
    },
    {
        text: "Sports", icon: <FontAwesome5
            name="basketball-ball"
            size={24}
            color={COLORS.mainTheme}
            style={{ marginRight: '10%' }}
        />
    },
    {
        text: "Concerts", icon: <FontAwesome5
            name="music"
            size={24}
            color={COLORS.mainTheme} style={{ marginRight: '10%' }}
        />
    },
    {
        text: "Nightlife", icon: <FontAwesome5
            name="cocktail"
            size={24}
            color={COLORS.mainTheme} style={{ marginRight: '10%' }}
        />
    },
    {
        text: "Art", icon: <FontAwesome5
            name="paint-brush"
            size={24}
            color={COLORS.mainTheme} style={{ marginRight: '10%' }}
        />
    },
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
                        {item.icon}
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
        justifyContent: 'flex-start',
        flexDirection: 'row',
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