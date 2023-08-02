import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, COMPONENTS, SIZES, THEMES } from '../style'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal, Portal } from 'react-native-paper';
import SearchModal from './SearchModal';
import { deleteTrip } from '../services/TripCollectionQueries';
import { getSetting, storeSetting } from '../services/LocalStorage';
import StyleText from './StyleText';
const Search = ({ trips, setSelectedTripIndex }) => {
    const [visible, setVisible] = useState(false);
    const [matchFilter, setMatchFilter] = useState("everyone")
    const [genderMatchFilter, setGenderMatchFilter] = useState("everyone")
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    const [indexToDelete, setIndexToDelete] = useState(null)
    const [selectedComponent, setSelectedComponent] = useState(0);
    const handleComponentClick = (index) => {
        setSelectedTripIndex(index)
        setSelectedComponent(index);
    };

    const enableDelete = (index) => {
        setIndexToDelete(index)
        setShowDeleteModal(true)
    }
    useEffect(() => {
        const initialSettings = async () => {
            let localMatchFilter = await getSetting('matchFilter')
            if (localMatchFilter) {
                setMatchFilter(localMatchFilter)
            }
            let localGenderFilter = await getSetting('genderFilter')
            if (localGenderFilter) {
                setMatchFilter(localGenderFilter)
            }
        }
        initialSettings()
    }, [])
    return (
        <SafeAreaView style={styles.view}>
            <Portal>
                <Modal visible={showDeleteModal} onDismiss={() => setShowDeleteModal(false)}
                    contentContainerStyle={styles.containerStyle}>
                    <TouchableOpacity
                        onPress={async () => {
                            await deleteTrip(trips[indexToDelete].id)
                            setShowDeleteModal(false)
                        }}
                    >
                        <Text>Confirm Delete?</Text>
                    </TouchableOpacity>
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
                    matchFilter={matchFilter}
                    setMatchFilter={setMatchFilter}
                    genderMatchFilter={genderMatchFilter}
                    setGenderMatchFilter={setGenderMatchFilter}
                />
                <TouchableOpacity onPress={showModal}>
                    <Ionicons
                        style={styles.add}
                        name="options-outline" size={42} />
                </TouchableOpacity>
                {
                    trips && trips.map((trip, index) => (
                        <View>
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.component,
                                    selectedComponent === index && styles.selectedComponent,
                                ]}
                                onPress={() => handleComponentClick(index)}
                                onLongPress={() => {
                                    enableDelete(index)
                                }}
                            >
                                <StyleText
                                    style={[
                                        styles.componentText,
                                        selectedComponent === index && styles.componentTextActive,
                                    ]}
                                    text={trip.city.split(',')[0]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: -2,
                                    backgroundColor: 'black',
                                    borderRadius: 100,
                                    height: 20,
                                    width: 20,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: 'white',
                                    borderWidth: 2
                                }}
                                onPress={() => enableDelete(index)}
                            >
                                <StyleText
                                    text="x"
                                    semiBold
                                    style={
                                        {
                                            color: 'white',
                                            marginLeft: 0.5,
                                        }
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    ))
                }

            </ScrollView>
        </SafeAreaView >
    )
}

export default Search

const styles = StyleSheet.create({
    containerStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "white",
        height: "50%",
        width: "100%",
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
        color: 'black',
        borderWidth: 2,
        borderRadius: 100,
        borderColor: 'red'
    },
    view: {
        height: SIZES.headerHeight,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    container: {
        // width: "100%",
        // borderColor: 'black',
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
        ...COMPONENTS.component
    },
    selectedComponent: {
        ...COMPONENTS.selectedComponent

    },
    componentText: {
        ...COMPONENTS.componentText

    },
    componentTextActive: {
        ...COMPONENTS.componentTextActive
    },
})