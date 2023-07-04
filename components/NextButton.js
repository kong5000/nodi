import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../style';

const NextButton = ({ index, setPage, formIncomplete, incompleteMessage, onPressAsync }) => {
    return (
        <TouchableOpacity
            style={styles.nextButton}
            onPress={async () => {
                try {
                    if (onPressAsync) await onPressAsync()
                    if (formIncomplete) {
                        alert(incompleteMessage)
                    } else {
                        setPage(index + 1)
                    }
                } catch (err) {
                    alert(err)
                }
            }}
        >
            <Ionicons name="arrow-forward-circle-outline" size={60} color={formIncomplete ? COLORS.brightContrast : "white"} />
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