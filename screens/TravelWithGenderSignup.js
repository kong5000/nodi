import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RadioButton } from 'react-native-paper';
import { Switch } from 'react-native-paper';
import React, { useState } from 'react'
import NextButton from '../components/NextButton';

const TravelWithGenderSignup = (
    {
        setTravelWithMen,
        travelWithMen,
        setTravelWithWomen,
        travelWithWomen,
        setTravelWithNonbinary,
        travelWithNonBinary,
        setTravelWithOther,
        travelWithOther,
        setPage
    }) => {
    const formIncomplete = !travelWithMen && !travelWithWomen && !travelWithNonBinary && !travelWithOther

    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onToggleSwitch = () => {
        if (isSwitchOn) {
            setTravelWithMen(false)
            setTravelWithWomen(false)
            setTravelWithNonbinary(false)
            setTravelWithOther(false)
        } else {
            setTravelWithMen(true)
            setTravelWithWomen(true)
            setTravelWithNonbinary(true)
            setTravelWithOther(true)
        }
        setIsSwitchOn(!isSwitchOn)
    };

    return (
        <View>
            <Text>Any gender preferences for a travel partner?</Text>
            <View style={styles.switchRow}>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch}></Switch>
                <Text>Travel with everyone</Text>
            </View>
            <View style={styles.radioContainer}>
                <View style={styles.radioRow}>
                    <Text style={styles.radioLabel}>Male</Text>
                    <RadioButton.Android
                        value="male"
                        status={travelWithMen == true ? "checked" : "unchecked"}
                        onPress={() => {
                            setTravelWithMen(!travelWithMen)
                            setIsSwitchOn(false)
                        }}
                    />
                </View>
                <View style={styles.radioRow}>
                    <Text style={styles.radioLabel}>Female</Text>
                    <RadioButton.Android
                        value="female"
                        status={travelWithWomen == true ? "checked" : "unchecked"}
                        onPress={() => {
                            setTravelWithWomen(!travelWithWomen)
                            setIsSwitchOn(false)
                        }}
                    />
                </View>
                <View style={styles.radioRow}>
                    <Text style={styles.radioLabel}>Nonbinary</Text>
                    <RadioButton.Android
                        value="nonbinary"
                        status={travelWithNonBinary == true ? "checked" : "unchecked"}
                        onPress={() => {
                            setTravelWithNonbinary(!travelWithNonBinary)
                            setIsSwitchOn(false)
                        }}
                    />
                </View>
                <View style={styles.radioRow}>
                    <Text style={styles.radioLabel}>Other</Text>
                    <RadioButton.Android
                        value="other"
                        status={travelWithOther == true ? "checked" : "unchecked"}
                        onPress={() => {
                            setTravelWithOther(!travelWithOther)
                            setIsSwitchOn(false)
                        }}
                    />
                </View>
            </View>
            <TouchableOpacity
                disabled={formIncomplete}
                onPress={() => {
                    setPage(5)
                }}
            >
                <Text style={formIncomplete ? styles.greyedOut : styles.updateButton}>Next</Text>
            </TouchableOpacity>
            <NextButton
                index={3}
                setPage={setPage}
                formIncomplete={formIncomplete}
                incompleteMessage="Please select your preferences"
            />
        </View>
    )
}

export default TravelWithGenderSignup

const styles = StyleSheet.create({
    radioContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    radioLabel: {
        marginRight: "20%"
    },
    radioRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'grey',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
        borderRadius: 8,
        width: 200
    },
    modalHeader: {
        fontWeight: 'bold',
        margin: 10
    },

    greyedOut: {
        color: 'gray'
    },
    switchRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'grey',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
        borderRadius: 8
    },

});