import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Checkbox } from 'react-native-paper';
import { Switch } from 'react-native-paper';
import React, { useState } from 'react'
import NextButton from '../components/NextButton';
import { TEXT_STYLES } from '../style';
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
        <View style={styles.radioContainer}>
            <Text style={TEXT_STYLES.header}>Who would you prefer to travel with?</Text>
            <View style={styles.switchRow}>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch}></Switch>
                <Text style={TEXT_STYLES.radioLabel}>Everyone</Text>
            </View>
            <View >
                <TouchableOpacity style={styles.radioRow} onPress={() => {
                    setTravelWithMen(!travelWithMen)
                    setIsSwitchOn(false)
                }}>
                    <Text style={TEXT_STYLES.radioLabel}>Male</Text>
                    <Checkbox.Android
                        value="male"
                        status={travelWithMen == true ? "checked" : "unchecked"}
                        onPress={() => {
                            setTravelWithMen(!travelWithMen)
                            setIsSwitchOn(false)
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioRow} onPress={() => {
                    setTravelWithWomen(!travelWithWomen)
                    setIsSwitchOn(false)
                }}>
                    <Text style={TEXT_STYLES.radioLabel}>Female</Text>
                    <Checkbox.Android
                        value="female"
                        status={travelWithWomen == true ? "checked" : "unchecked"}
                        onPress={() => {
                            setTravelWithWomen(!travelWithWomen)
                            setIsSwitchOn(false)
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioRow} onPress={() => {
                    setTravelWithNonbinary(!travelWithNonBinary)
                    setIsSwitchOn(false)
                }}>
                    <Text style={TEXT_STYLES.radioLabel}>Nonbinary</Text>
                    <Checkbox.Android
                        value="nonbinary"
                        status={travelWithNonBinary == true ? "checked" : "unchecked"}
                        onPress={() => {
                            setTravelWithNonbinary(!travelWithNonBinary)
                            setIsSwitchOn(false)
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioRow} onPress={() => {
                    setTravelWithOther(!travelWithOther)
                    setIsSwitchOn(false)
                }}>
                    <Text style={TEXT_STYLES.radioLabel}>Other</Text>
                    <Checkbox.Android
                        value="other"
                        status={travelWithOther == true ? "checked" : "unchecked"}
                        onPress={() => {
                            setTravelWithOther(!travelWithOther)
                            setIsSwitchOn(false)
                        }}
                    />
                </TouchableOpacity>
            </View>
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
    },
    radioLabel: {
        marginRight: "20%"
    },
    radioRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        margin: 10,
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
        backgroundColor: 'white',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
        borderRadius: 8
    },

});