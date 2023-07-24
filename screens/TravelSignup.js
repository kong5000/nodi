import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Destination from '../components/Destination';
import NextButton from '../components/NextButton';
import { TEXT_STYLES, THEMES } from '../style'
import Footer from '../components/Footer';
const TravelSignup = ({ setPage, setTrips, trips }) => {
    const [destinations, setDestinations] = useState([])
    const [formIncomplete, setFormIncomplete] = useState(true)
    const [allDestinationsComplete, setAllDestinationsComplete] = useState(true)
    const emptyDestination = {
        city: "",
        dayFrom: "",
        dayTo: "",
        monthFrom: "",
        monthTo: ""
    }
    const destinationValid = (destination) => {
        if (destination.city && destination.dayFrom && destination.dayTo) return true
        return false
    }
    const checkOneDestinationValid = () => {
        if (destinations.length == 0) return false
        for (let i = 0; i < destinations.length; i++) {
            let destination = destinations[i]
            if (destinationValid(destination)) return true
        }
        return false
    }
    const checkAllDestinationsComplete = () => {
        if (destinations.length == 0) return true
        for (let i = 0; i < destinations.length; i++) {
            let destination = destinations[i]
            if (!(destination.city && destination.dayFrom && destination.dayTo)) return false
        }
        return true
    }

    const submitDestinations = async () => {
        console.log("DESTINATIONS")
        console.log(destinations)
        let tempTrips = []
        for (const destination of destinations) {
            if (destinationValid(destination)) {
                tempTrips.push(destination)
            } else {
                console.log("NOT Valid")
            }
        }
        let newTrips = [...trips, ...tempTrips]
        setTrips(newTrips)
    }

    const checkForm = () => {
        setFormIncomplete(!checkOneDestinationValid())
        setAllDestinationsComplete(checkAllDestinationsComplete())
    }

    useEffect(() => {
        checkForm()
    }, [destinations])

    const removeDestination = (index) => {
        console.log(index)
        console.log(destinations)
        const newDestinations = destinations.map(a => { return { ...a } })
        console.log(newDestinations)
        newDestinations.splice(index, 1);
        console.log(newDestinations)
        setDestinations(newDestinations);
        checkForm()
    };
    const updateDestination = (index, newDestination) => {
        const newDestinations = destinations.map(a => { return { ...a } })
        newDestinations[index] = newDestination
        setDestinations(newDestinations.reverse());
        checkForm()
    }

    useEffect(() => {
        checkForm()
    }, [destinations])
    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>

                <Text style={TEXT_STYLES.header}>Where are you planning to go?</Text>
                {((!formIncomplete || destinations.length == 0) && allDestinationsComplete) &&
                    <TouchableOpacity style={styles.addContainer} onPress={() => {
                        setDestinations([...destinations, { ...emptyDestination }])
                    }} >
                        <View>
                            {destinations.length == 0 ? <Text style={TEXT_STYLES.radioLabel}>Add Destination</Text>
                                : <Text style={TEXT_STYLES.radioLabel}>Add Another Destination</Text>
                            }

                        </View>
                        {/* <Ionicons name="add-circle-outline" size={50} color="black" /> */}
                    </TouchableOpacity>
                }
                {destinations.map((location, index) => (
                    <View key={index} style={styles.destinationContainer}>
                        <Destination
                            checkForm={checkForm}
                            destination={location}
                            removeDestination={removeDestination}
                            index={index}
                            updateDestination={updateDestination}
                            setDestinations={setDestinations}
                        />

                    </View>
                ))}
                <NextButton
                    onPressAsync={
                        () => {
                            if (checkOneDestinationValid()) {
                                console.log("onpress async")
                                submitDestinations()
                            }
                        }
                    }
                    index={4}
                    setPage={setPage}
                    formIncomplete={formIncomplete}
                    incompleteMessage="Complete at least one trip, and please use the autocomplete when entering a city!" />
            </ScrollView>
            <Footer />
        </View>
    )
}

export default TravelSignup

const styles = StyleSheet.create({
    destinationContainer: {
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