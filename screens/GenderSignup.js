import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { RadioButton, Text } from 'react-native-paper';

import React, { useState } from 'react'

const GenderSignup = ({ setGender, gender, setPage }) => {
    const formIncomplete = !gender

    return (
        <View style={styles.radioContainer}>
            <RadioButton.Group
                onValueChange={value => { setGender(value) }}
                value={gender}
            >
                <View style={styles.radioRow}>
                    <Text style={styles.radioLabel}>Male</Text>
                    <RadioButton.Android
                        value="male"
                        status={gender === 'male' ? 'checked' : 'unchecked'}
                    />
                </View>
                <View style={styles.radioRow}>
                    <Text style={styles.radioLabel}>Female</Text>
                    <RadioButton.Android
                        value="female"
                        status={gender === 'female' ? 'checked' : 'unchecked'}
                    />
                </View>
                <View style={styles.radioRow}>
                    <Text style={styles.radioLabel}>Nonbinary</Text>
                    <RadioButton.Android
                        value="nonbinary"
                        status={gender === 'nonbinary' ? 'checked' : 'unchecked'}
                    />
                </View>
                <View style={styles.radioRow}>
                    <Text style={styles.radioLabel}>Other</Text>
                    <RadioButton.Android
                        value="other"
                        status={gender === 'other' ? 'checked' : 'unchecked'}
                    />
                </View>
            </RadioButton.Group>
            <TouchableOpacity
                disabled={formIncomplete}
                onPress={() => {
                    setPage(4)
                }}
            >
                <Text style={formIncomplete ? styles.greyedOut : styles.updateButton}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setPage(2)
                }}
            >
                <Text>Back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GenderSignup

const styles = StyleSheet.create({
    radioContainer: {
        display: 'flex',
        width: '100%',
        backgroundColor: '#fff',
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
        borderRadius: 8
    },
    modalHeader: {
        fontWeight: 'bold',
        margin: 10
    },
    updateButton: {

    },
    greyedOut: {
        color: 'gray'
    }
});