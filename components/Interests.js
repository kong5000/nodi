import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import getUserData from '../hooks/userData'
import { getSetting, storeSetting } from '../services/LocalStorage'
import { updateUserDoc } from '../services/UserQueries'
import { COLORS } from '../style'
import CustomToggleButton from './ListCustomToggleButton'

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
    const { userData } = getUserData()

    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                updateUserDoc(userData.id, { interests })
            } catch (err) {
                console.log(err)
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [interests]);

    useEffect(() => {
        const getStorageEffect = async () => {
            const localStorageInterests = await getSetting(`interests`)
            if (!localStorageInterests) {
                setInterests([])
            } else {
                const interestsObj = JSON.parse(localStorageInterests)
                setInterests(interestsObj)
            }

        }
        getStorageEffect()
    }, [])

    const toggleInterest = (activity) => {
        console.log(activity)
        console.log(interests)
        if (interests && interests.includes(activity)) {
            const updatedArray = interests.filter((item) => item !== activity);
            storeSetting(`interests`, JSON.stringify(updatedArray))
            setInterests(updatedArray)
        } else {
            if (interests) {
                storeSetting(`interests`, JSON.stringify([...interests, activity]))
                setInterests([...interests, activity])
            }

        }
    }

    return (
        <View style={styles.container}>
            {thingsToDo.map((item) =>
                <CustomToggleButton
                    key={item.text}
                    text={item.text}
                    onToggle={() => toggleInterest(item.text)}
                    list={interests}
                    icon={item.icon}
                />
            )}
        </View>
    )
}

export default Interests


const styles = StyleSheet.create({
    container: {
        width: "85%",
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    }
});