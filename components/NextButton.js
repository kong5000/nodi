import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const NextButton = ({index, setPage, formIncomplete}) => {
    return (
        <TouchableOpacity
            style={styles.nextButton}
            disabled={formIncomplete}
            onPress={() => {
                setPage(index + 1)
            }}
        >
            <Ionicons name="arrow-forward-circle-outline" size={60} color={formIncomplete ? 'grey' : "black"} />
        </TouchableOpacity>
    )
}

export default NextButton

const styles = StyleSheet.create({
    nextButton: {
        marginTop: 30,
        marginBottom: 30,
        width: "100%",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    updateButton: {

    },
    greyedOut: {
        color: 'gray'
    }
});