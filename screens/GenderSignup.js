import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { RadioButton } from 'react-native-paper';
import NextButton from '../components/NextButton';
import React, { useState } from 'react'
import { COLORS, TEXT_STYLES, THEMES } from '../style';

const GenderSignup = ({ setGender, gender, setPage }) => {
    const formIncomplete = !gender
    return (
        <View style={styles.radioContainer}>
            <Text style={TEXT_STYLES.header}>Select the gender you most indetify with</Text>
            <RadioButton.Group
                onValueChange={value => { setGender(value) }}
                value={gender}
            >
                <TouchableOpacity style={THEMES.radioRow} onPress={() => setGender("female")} >
                    <Text style={TEXT_STYLES.radioLabel}>Female</Text>
                    <RadioButton.Android
                        uncheckedColor={COLORS.brightContrast}
                        color={COLORS.brightContrast}
                        value="female"
                        status={gender === 'female' ? 'checked' : 'unchecked'}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={THEMES.radioRow} onPress={() => setGender("male")}>
                    <Text style={TEXT_STYLES.radioLabel}>Male</Text>
                    <RadioButton.Android
                        uncheckedColor={COLORS.brightContrast}
                        color={COLORS.brightContrast}
                        value="male"
                        status={gender === 'male' ? 'checked' : 'unchecked'}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={THEMES.radioRow} onPress={() => setGender("nonbinary")}>
                    <Text style={TEXT_STYLES.radioLabel}>Nonbinary</Text>
                    <RadioButton.Android
                        uncheckedColor={COLORS.brightContrast}
                        color={COLORS.brightContrast}
                        value="nonbinary"
                        status={gender === 'nonbinary' ? 'checked' : 'unchecked'}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={THEMES.radioRow} onPress={() => setGender("other")}>
                    <Text style={TEXT_STYLES.radioLabel}>Other</Text>
                    <RadioButton.Android
                        uncheckedColor={COLORS.brightContrast}
                        color={COLORS.brightContrast}
                        value="other"
                        status={gender === 'other' ? 'checked' : 'unchecked'}
                    />
                </TouchableOpacity>
            </RadioButton.Group>
            <NextButton
                index={2}
                setPage={setPage}
                formIncomplete={formIncomplete}
                incompleteMessage={"Please select a gender"}
            />
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
        backgroundColor: 'transparent'
    },
    radioRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        padding: 5,
        borderRadius: 30,
        borderColor: COLORS.brightContrast,
        borderWidth: 3,
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