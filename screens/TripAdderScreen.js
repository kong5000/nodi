import { StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Destination from '../components/Destination';
import NextButton from '../components/NextButton';
import { TEXT_STYLES, THEMES } from '../style'
import Footer from '../components/Footer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { addTripDoc } from '../services/TripCollectionQueries';
import getUserData from '../hooks/userData';
import { useNavigation } from '@react-navigation/core'

const TravelAdderScreen = ({ setPage, setTrips, trips }) => {
    const { userData } = getUserData()
    const navigation = useNavigation()

    const [destination, setDestination] = useState(null)
    const [valid, setValid] = useState(false)

    const handleSubmit = async () => {
        try {
            await addTripDoc({ ...destination, userInfo: userData });
            navigation.navigate('Home')
        } catch (err) {
            alert(err)
        }
    }
    useEffect(() => {
        if (destination && destination.dayFrom && destination.dayTo && destination.city) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [destination])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <Text style={TEXT_STYLES.header}>Where To?</Text>
                <View style={styles.destinationContainer}>
                    <Destination
                        destination={destination}
                        setDestination={setDestination}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => handleSubmit()}
                    style={styles.checkButtonContainer}>
                    <Ionicons name="checkmark-circle-outline" size={60} color={valid ? "green" : "grey"} />
                </TouchableOpacity>
            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}

export default TravelAdderScreen

const styles = StyleSheet.create({
    checkButtonContainer: {
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    destinationContainer: {
        marginTop: "20%",
        marginLeft: "7%",
        marginRight: "7%",
    },
    container: {
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',

    },
    dateSelectorLabel: {
        flex: 0.5
    },
    dateSelectorRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    searchBar: {
        width: '85%',
        height: '50%',
        borderWidth: 2,
        borderColor: 'black'
    },
    addContainer: {
        ...THEMES.displayTheme,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: "15%",
        marginRight: "15%"
    },
    greyedOut: {
        color: 'gray'
    },
    updateButton: {

    },
})