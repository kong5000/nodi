import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper';
import { Switch, Checkbox } from 'react-native-paper';
import { THEMES, TEXT_STYLES, COLORS } from '../style';
import Ionicons from '@expo/vector-icons/Ionicons'

const SearchModal = ({ visible, hideModal, findEveryone, setFindEveryone,

    findTravellers, setFindTravellers, findLocals, setFindLocals }) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal}
                contentContainerStyle={styles.containerStyle}>
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Where</Text>

                    <TouchableOpacity style={styles.checkBoxContainer}>
                        <Text style={styles.checkBoxLabel}>Add New Trip</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.borderLine} />
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Who</Text>
                    <TouchableOpacity style={styles.checkBoxContainer} onPress={() => {
                        setFindLocals(!findLocals)
                        setIsSwitchOn(false)
                    }}>
                        <Text style={styles.checkBoxLabel}>Travellers</Text>
                        <Checkbox.Android
                            value="locals"
                            status={findLocals == true ? "checked" : "unchecked"}
                            onPress={() => {
                                setFindLocals(!findLocals)
                                setIsSwitchOn(false)
                            }}
                            uncheckedColor="black"
                            color={"black"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.checkBoxContainer} onPress={() => {
                        setFindTravellers(!findTravellers)
                        setIsSwitchOn(false)
                    }}>
                        <Text style={styles.checkBoxLabel}>Locals</Text>
                        <Checkbox.Android
                            value="travellers"
                            status={findTravellers == true ? "checked" : "unchecked"}
                            onPress={() => {
                                setFindTravellers(!findTravellers)
                                setIsSwitchOn(false)
                            }}
                            uncheckedColor="black"
                            color={"black"} />
                    </TouchableOpacity>

                </View>
                <View style={styles.borderLineLight} />
                <TouchableOpacity style={styles.searchBox}>
                    <Text style={styles.checkBoxLabel}>Specific User</Text>
                    <Ionicons
                        style={styles.detailIcon}
                        name="search-circle-outline" size={32} />
                </TouchableOpacity>
            </Modal>
        </Portal>
    )
}

export default SearchModal

const styles = StyleSheet.create({
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
        fontSize: 30,
        marginBottom: 10,
    },
    sectionLabelText: {
        fontSize: 16,
        margin: 5
    },

    containerStyle: {
        display: 'flex',
        backgroundColor: 'white',
        height: "70%",
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


    switchRow: {
        ...THEMES.displayTheme,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
    },
})