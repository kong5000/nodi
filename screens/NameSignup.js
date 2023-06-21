import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const NameSignup = ({ name, setName, setPage }) => {
    const formIncomplete = !name
    return (
        <View style={styles.namePage}>
            <Text style={styles.modalHeader}>What's your name?</Text>
            <TextInput
                style={styles.textInput}
                placeholder='Add your first name'
                onChangeText={(text) => setName(text)}
            />
            <TouchableOpacity
                disabled={formIncomplete}
                onPress={() => {
                    setPage(1)
                }}
            >
                <Text style={formIncomplete ? styles.greyedOut : styles.updateButton}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NameSignup

const styles = StyleSheet.create({
    textInput:{
        backgroundColor: 'white',
        borderRadius: 7,
        height: 40,
        padding: 10
    },
    namePage:{
    },
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeader: {
        fontWeight: 'bold',
        fontSize:'30',
        margin: 10
    },
    updateButton: {

    },
    greyedOut: {
        color: 'gray'
    }
});