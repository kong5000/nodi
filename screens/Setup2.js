import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Setup2 = ({ setJob, job, setAge, age, setPage }) => {
    const formIncomplete = !job || !age

    return (
        <View>
            <Text style={styles.modalHeader}>Step2: Occupation</Text>
            <TextInput
                placeholder='Occupation'
                onChangeText={(text) => setJob(text)}
            />
            <Text style={styles.modalHeader}>Step3: Age </Text>
            <TextInput
                placeholder='Age'
                onChangeText={(text) => setAge(text)}
            />
            <TouchableOpacity
                disabled={formIncomplete}
                onPress={() => {
                    setPage(3)
                }}
            >
                <Text style={formIncomplete ? styles.greyedOut : styles.updateButton}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Setup2

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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