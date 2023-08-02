import { Image, StyleSheet } from 'react-native'
import { Modal, Portal, TextInput } from 'react-native-paper';

import React from 'react'
import StyleText from './StyleText';
import Connect from './Connect';

const ConnectModal = ({ visible, hideModal, currentProfile }) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.containerStyle}
            >
                {/* <Image
                    style={styles.image}
                    source={{ uri: imageUri }}
                /> */}
                {currentProfile && <StyleText
                    style={{ fontSize: 30 }}
                    semiBold
                    text={currentProfile.title}
                />}
                <TextInput
                    activeOutlineColor='black'
                    placeholder='Send a message'
                    mode='outlined'
                    style={{
                        color: 'black',
                        width: "80%",
                        height: 40,
                        backgroundColor: 'white',
                    }}
                />
                <Connect />
            </Modal>
        </Portal>
    )
}

export default ConnectModal
const styles = StyleSheet.create({
    image: {
        width: 400,
        height: 400,
        resizeMode: 'cover',
        borderRadius: 20,
        // borderTopLeftRadius: 50
    },
    toggleText: {
        fontSize: 20
    },
    toggleButton: {
        width: 100
    },
    toggleRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    section: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderLine: {
        borderBottomWidth: 2,
        width: "100%"
    },
    borderLineLight: {
        borderBottomWidth: 2,
        width: "100%",
    },
    checkBoxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        padding: 5,
        borderRadius: 30,
        borderWidth: 2,
        width: 175
    },
    searchBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        padding: 5,
        borderRadius: 30,
        borderWidth: 2,
        width: 220
    },
    checkBoxLabel: {
        fontSize: 20,
        padding: 8,
    },
    sectionLabel: {
        fontSize: 25,
        marginBottom: 5,
    },
    sectionLabelText: {
        fontSize: 16,
        margin: 5
    },

    containerStyle: {
        display: 'flex',
        backgroundColor: 'white',
        height: 250,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 50
    },
    radioContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalHeader: {
        fontWeight: 'bold',
        margin: 10
    },

})