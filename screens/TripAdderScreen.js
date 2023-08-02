import { StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Destination from '../components/Destination';
import { TEXT_STYLES, THEMES } from '../style'
import Footer from '../components/Footer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { addTripDoc } from '../services/TripCollectionQueries';
import getUserData from '../hooks/userData';
import { Modal, Portal } from 'react-native-paper';

const TravelAdderScreen = ({ visible, hideModal }) => {
    const { userData } = getUserData()

    const [destination, setDestination] = useState(null)
    const [valid, setValid] = useState(false)

    const handleSubmit = async () => {
        try {
            await addTripDoc({ ...destination, userInfo: userData });
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
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.containerStyle}>
                <View style={{

                }} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.destinationContainer}>
                        <Destination
                            destination={destination}
                            setDestination={setDestination}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            handleSubmit()
                            hideModal()
                        }}
                        style={styles.checkButtonContainer}>
                        <Ionicons name="checkmark-circle-outline" size={60} color={valid ? "green" : "grey"} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </Portal >
    )
}

export default TravelAdderScreen

const styles = StyleSheet.create({
    destinationContainer: {
        position: 'relative',
        top: -20
    },
    containerStyle: {
        display: 'flex',
        backgroundColor: 'white',
        height: "70%",
        borderRadius: 50,
    },
    checkButtonContainer: {
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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