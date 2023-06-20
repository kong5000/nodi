import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Destination from '../components/Destination';

const TravelSignup = () => {
    const [destinations, setDestinations] = useState([])
 
    const emptyDestination = {
        city: "",
        from: "",
        to: ""
    }

    const [valid, setValid] = useState(false)

    const removeDestination = (index) => {
        console.log(index)
        const newDestinations = [...destinations];
        console.log(newDestinations)
        newDestinations.splice(index, 1);
        setDestinations(newDestinations);
      };
 

    return (
        <View style={styles.container}>
            <Text>Destination</Text>
            {destinations.map((location, index) => (
                <View key={index} style={styles.destinationContainer}>
                    <Destination removeDestination={removeDestination} setValid={setValid} index={index} destinations={destinations} setDestinations={setDestinations} />
                    <Text>{location.city + location.from + location.to}</Text>

                </View>
            ))}
            {(valid || destinations.length == 0) && <TouchableOpacity style={styles.addContainer} onPress={() => {
                setDestinations([...destinations, { ...emptyDestination }])
            }} >
                <Ionicons name="add-circle-outline" size={32} color="orange" />
            </TouchableOpacity>}

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
        backgroundColor: 'red',
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
    }
})