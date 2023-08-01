import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper';
import { ToggleButton } from 'react-native-paper';
import { THEMES } from '../style';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/core'
import { storeSetting } from '../services/LocalStorage';

const SearchModal = ({ visible, hideModal, setMatchFilter, matchFilter }) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const navigation = useNavigation()

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal}
                contentContainerStyle={styles.containerStyle}>
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Where</Text>
                    <TouchableOpacity
                        style={styles.checkBoxContainer}
                        onPress={() => {
                            hideModal()
                            navigation.navigate("Trips")
                        }
                        }>
                        <Text style={styles.checkBoxLabel}>Add New Trip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.checkBoxContainer}>
                        <Text style={styles.checkBoxLabel}>Edit Trips</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Meet, {matchFilter}</Text>
                    <ToggleButton.Row
                        style={styles.toggleRow}
                        onValueChange={value => {
                            setMatchFilter(value)
                            storeSetting('matchFilter', value)
                        }}
                        value={matchFilter}
                    >
                        <ToggleButton
                            style={[
                                styles.toggleButton,
                                matchFilter == "travellers" ? { backgroundColor: "black" } : {},
                                {
                                    borderBottomLeftRadius: 20,
                                    borderTopLeftRadius: 20
                                }
                            ]}
                            icon={() =>
                                <View>
                                    <Text style={[styles.toggleText, matchFilter == "travellers" ? { color: "white" } : { color: "black" }]}>Travellers</Text>
                                </View>
                            }
                            value="travellers"
                            color="red"
                        >
                        </ToggleButton>
                        <ToggleButton
                            style={[
                                styles.toggleButton,
                                matchFilter == "locals" ? { backgroundColor: "black" } : {},
                            ]}

                            icon={() => <View>
                                <Text style={[styles.toggleText, matchFilter == "locals" ? { color: "white" } : { color: "black" }]}>Locals</Text>
                            </View>
                            }
                            value="locals" >
                        </ToggleButton>
                        <ToggleButton
                            style={[
                                styles.toggleButton,
                                matchFilter == "everyone" ? { backgroundColor: "black" } : {},
                                {
                                    borderBottomRightRadius: 20,
                                    borderTopRightRadius: 20
                                }
                            ]}
                            icon={() => <View>
                                <Text style={[styles.toggleText, matchFilter == "everyone" ? { color: "white" } : { color: "black" }]}>Everyone</Text>
                            </View>
                            }
                            value="everyone" >
                        </ToggleButton>
                    </ToggleButton.Row>
                </View>
                {/* <View style={styles.borderLineLight} /> */}
                <TouchableOpacity style={styles.searchBox} onPress={() => {
                    hideModal()
                    navigation.navigate("Users")
                }}>
                    <Text style={styles.checkBoxLabel}>Find User</Text>
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