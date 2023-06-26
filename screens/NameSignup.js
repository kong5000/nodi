import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import NextButton from '../components/NextButton';
import { TEXT_STYLES } from '../style';

const NameSignup = ({ name, setName, setPage, setBirthDate, birthDate }) => {
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setBirthDate(currentDate);
    };

    const formIncomplete = !name
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
            <NextButton index={0} setPage={setPage} formIncomplete={formIncomplete} incompleteMessage={"Please fill out a name"} />
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