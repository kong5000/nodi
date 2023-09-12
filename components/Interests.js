import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { COLORS, FLEX_CENTERED, TEXT_STYLES } from '../style'
import NextButton from './NextButton';
import StyleText from './StyleText'
const { width, height } = Dimensions.get('window');
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import CustomToggleButton from './CustomToggleButton'
import SettingsButtonsGroup from './SettingsButtonsGroup'

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

const Interests = () => {
    const [interests, setInterests] = useState([])

    return (
        <View style={styles.container}>
            <SettingsButtonsGroup
                activeButtons={interests}
                setActiveButtons={setInterests}
                list={thingsToDo}
            />
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
    }
});