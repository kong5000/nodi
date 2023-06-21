import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import DateSelectorRow from '../components/DataSelectorRow';
import Location from './Location';
import Ionicons from '@expo/vector-icons/Ionicons';

const Destination = ({ checkForm, destination, index, removeDestination, updateDestination }) => {
    const [searchVisible, setSearchVisible] = useState(false)

    const [edit, setEdit] = useState(true)
    const [localValid, setLocalValid] = useState(false)
    const [location, setLocation] = useState(destination.city)

    const [dayTo, setDayTo] = useState(destination.dayTo);
    const [dayFrom, setDayFrom] = useState(destination.dayFrom);
    const [monthFrom, setMonthFrom] = useState(destination.monthFrom);
    const [monthTo, setMonthTo] = useState(destination.monthTo);

    const save = () => {
        console.log("ssave")
        if (!isValid()) {
            checkForm()
            alert("Please complete")
        } else {
            checkForm()
            setSearchVisible(false)
            updateDestination(index, { city: location, dayFrom, monthFrom, dayTo, monthTo })
            setEdit(false)
            setLocalValid(true)
        }
    }
    const updateLocation = (newLocation) => {
        updateDestination(index, { city: newLocation, dayFrom, monthFrom, dayTo, monthTo })
    }
    useEffect(() => {
        updateDestination(index, { city: location, dayFrom, monthFrom, dayTo, monthTo })
    }, [dayTo, dayFrom, monthTo, monthFrom])

    useEffect(() => {
        if (isValid()) {
            setLocalValid(true)
        } else {
            setLocalValid(false)
        }
    }, [location])

    const isValid = () => {
        return (dayTo && dayFrom && monthTo && monthFrom
            && location
        )
    }
    return (
        <View style={styles.container}>
            <Location searchVisible={searchVisible} setSearchVisible={setSearchVisible} enabled={edit} updateLocation={updateLocation} setLocation={setLocation} location={destination.city} />
            <DateSelectorRow
                enabled={edit}
                dayTo={destination.dayTo}
                setDayTo={setDayTo}
                dayFrom={destination.dayFrom}
                setDayFrom={setDayFrom}
                monthTo={destination.monthTo}
                setMonthTo={setMonthTo}
                monthFrom={destination.monthFrom}
                setMonthFrom={setMonthFrom}
            />
            {(!edit) &&
                <TouchableOpacity onPress={() => {
                    setEdit(true)
                    setSearchVisible(true)
                }}>
                    <Ionicons name="create" size={32} />
                </TouchableOpacity>
            }
            {edit &&
                <View style={styles.editRow}>
                    <TouchableOpacity onPress={() => { save() }}>
                        <Ionicons name="checkmark-circle-outline" size={32} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeDestination(index)}>
                        <Ionicons name="trash" size={32} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default Destination

const styles = StyleSheet.create({
    editRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'green'
    },
    dateSelectorLabel: {
        flex: 0.5
    },
    dateSelectorRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    searchBar: {
        width: '85%',
        height: '50%',
        backgroundColor: 'purple',
        borderWidth: 2,
        borderColor: 'black'
    }
})