import { StyleSheet, Text, TextInput, View, Platform, SafeAreaView, Button } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import NextButton from '../components/NextButton';
import { TEXT_STYLES } from '../style';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const NameSignup = ({ name, setName, setPage, setBirthDate, birthDate }) => {
    const [showDate, setShowDate] = useState(false)

    const onChange = (event, selectedDate) => {
        setShowDate(false)
        const currentDate = selectedDate;
        setBirthDate(currentDate);
    };
    function checkAge(dateOfBirth) {
        const today = new Date();
        const birth = new Date(dateOfBirth);
        const eighteenYearsAgo = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
        );
        return birth <= eighteenYearsAgo;
    }
    const formIncomplete = !name || !checkAge(birthDate)
    return (
        <View style={styles.namePage}>
            <View style={styles.nameSection}>
                <Text style={TEXT_STYLES.header}>What's your name?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Add your first name'
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={styles.border}>
                <Ionicons name="globe-outline" size={70} />
            </View>
            {(Platform.OS == 'android' && showDate) && <DateTimePicker
                style={styles.datePicker}
                testID="dateTimePicker"
                value={birthDate}
                mode='date'
                onChange={onChange}
                display='spinner'
            />}
            {Platform.OS == 'android' ?
                <SafeAreaView>
                    <Button onPress={() => setShowDate(true)} title="Show date picker!" />
                </SafeAreaView>
                :
                <View style={styles.birthdayContainer}>
                    <Text style={TEXT_STYLES.header}>When were you born?</Text>
                    <DateTimePicker
                        style={styles.datePicker}
                        testID="dateTimePicker"
                        value={birthDate}
                        mode='date'
                        onChange={onChange}
                        display='spinner'
                    />
                </View>
            }

            <NextButton index={0} setPage={setPage} formIncomplete={formIncomplete} incompleteMessage={!name ? "Please fill out a name" : "You must be at at least 18 to use this app"} />
        </View>
    )
}

export default NameSignup

const styles = StyleSheet.create({
    nextButton: {
        marginTop: 30,
        marginBottom: 30,
    },
    border: {
        marginTop: 20,
        marginBottom: 20,
    },
    nameSection: {
        marginTop: 30,
        marginBottom: 30,
    },
    birthdayContainer: {
        marginTop: 30,
        marginBottom: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 7,
        height: 40,
        padding: 10
    },
    namePage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    updateButton: {

    },
    greyedOut: {
        color: 'gray'
    }
});