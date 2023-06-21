import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Destination from '../components/Destination';

const TravelSignup = ({setPage}) => {
    const [destinations, setDestinations] = useState([])
    const [formIncomplete, setFormIncomplete] = useState(true)
    const emptyDestination = {
        city: "",
        dayFrom: "",
        dayTo: "",
        monthFrom: "",
        monthTo: ""
    }
    const checkForm = () => {
        setFormIncomplete(checkIncomplete())
    }
    const checkIncomplete = () => {
        let incomplete = false
        destinations.forEach(destination => {
            console.log(destination)
            if (!(destination.city
                && destination.dayFrom
                && destination.monthFrom
                && destination.dayTo
                && destination.monthTo)) {
                incomplete = true
            }
        })
        return incomplete
    }

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
        setDestinations(newDestinations);
        checkForm()
    }

    useEffect(() => {
        checkForm()
    }, [destinations])
    return (
        <View style={styles.container}>
            <Text>Destination</Text>
            {formIncomplete && <Text>form incomplete</Text>}
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
            {!formIncomplete &&
                <TouchableOpacity style={styles.addContainer} onPress={() => {
                    setDestinations([...destinations, { ...emptyDestination }])
                }} >
                    <Ionicons name="add-circle-outline" size={32} color="orange" />
                </TouchableOpacity>
            }


            <TouchableOpacity
                disabled={formIncomplete || (destinations.length == 0)}
                onPress={() => {
                    setPage(6)
                }}
            >
                <Text style={formIncomplete || (destinations.length == 0) ? styles.greyedOut : styles.updateButton}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TravelSignup

const styles = StyleSheet.create({
    destinationContainer: {
        height: 250,
        margin: 10
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
        backgroundColor: 'purple',
        borderWidth: 2,
        borderColor: 'black'
    },
    addContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    greyedOut: {
        color: 'gray'
    },
    updateButton: {

    },
})