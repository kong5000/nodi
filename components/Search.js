import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, THEMES } from '../style'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal, Portal } from 'react-native-paper';
import SearchModal from './SearchModal';

const Search = () => {
    const [visible, setVisible] = useState(false);
    const [findLocals, setFindLocals] = useState(false)
    const [findTravellers, setFindTravellers] = useState(false)
    const [findEveryone, setFindEveryone] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const [selectedComponent, setSelectedComponent] = useState(null);
    const handleComponentClick = (index) => {
        setSelectedComponent(index);
    };




    const components = ["Vancouver", "Toronto", "New York", "Montreal", "Paris"];
    return (
        <SafeAreaView style={styles.view}>
            <Portal>
                <Modal visible={showDeleteModal} onDismiss={() => setShowDeleteModal(false)}
                    contentContainerStyle={styles.containerStyle}>
                        <Text>Confirm Delete?</Text>
                </Modal>
            </Portal>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal style={styles.scroll}
                contentContainerStyle={styles.container}
            >
                <SearchModal
                    visible={visible}
                    hideModal={hideModal}
                    findEveryone={findEveryone}
                    setFindEveryone={setFindEveryone}
                    findLocals={findLocals}
                    setFindLocals={setFindLocals}
                    findTravellers={findTravellers}
                    setFindTravellers={setFindTravellers}
                />
                <TouchableOpacity onPress={showModal}>
                    <Ionicons
                        style={styles.add}
                        name="options-outline" size={42} />
                </TouchableOpacity>
                {components.map((component, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.component,
                            selectedComponent === index && styles.selectedComponent,
                        ]}
                        onPress={() => handleComponentClick(index)}
                        onLongPress={() => { setShowDeleteModal(true) }}
                    >
                        <Text style={[
                            styles.componentText,
                            selectedComponent === index && styles.componentTextActive,
                        ]}>{component}</Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({
    containerStyle:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "white",
        height: "50%",
        width: "100%"
    },
    city: {
        width: 100,
        height: 30
    },
    scroll: {
        // width: "100%",
        // borderWidth: 1,
    },
    add: {
        marginLeft: 2,
        color: '#581845',
        borderWidth: 2,
        borderRadius: 100,
        borderColor: 'red'
    },
    view: {
        height: SIZES.headerHeight,
        marginBottom: 10
    },
    container: {
        // width: "100%",
        borderColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        display: "flex",
        justifyContent: 'flex-start'
    },
    interest: {
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        backgroundColor: 'white',
        // height: "100%",
        borderWidth: 1,
        // borderRadius: 40,
        // marginLeft: 3,
        // marginRight: 3,
    },
    text: {
        // padding: 10,
        margin: 5,
        fontSize: 18
    },
    activity: {
        backgroundColor: "green",
        borderColor: COLORS.brightContrast,
        borderWidth: 2,
        borderRadius: 30,

        fontSize: 18,
        fontWeight: "400",
        color: "white",

    },
    activityDisabled: {
        backgroundColor: "white",
        borderWidth: 2,
        borderRadius: 30,

        borderColor: "white"
    },
    component: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 5,
        borderWidth: 2,
        borderRadius: 40,
        margin: 5
    },
    selectedComponent: {
        backgroundColor: 'black',
    },
    componentText: {
        color: 'black',
        fontSize: 16
    },
    componentTextActive: {
        color: 'white',
        fontSize: 16
    },
})