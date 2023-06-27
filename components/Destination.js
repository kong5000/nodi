import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import DateSelectorRow from '../components/DataSelectorRow';
import Location from './Location';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';

const Destination = ({ checkForm, destination, index, removeDestination, updateDestination }) => {
    const [searchVisible, setSearchVisible] = useState(false)
    const [hideDates, setHideDates] = useState(false)
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
        updateDestination(index, { city: newLocation, dayFrom, dayTo })
    }
    useEffect(() => {
        function getDates(startDate, stopDate) {
            var dateArray = [];
            var currentDate = moment(startDate);
            var stopDate = moment(stopDate);
            while (currentDate <= stopDate) {
                dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
                currentDate = moment(currentDate).add(1, 'days');
            }
            return dateArray;
        }
        let dates = getDates(dayFrom, dayTo)
        console.log(dates)
        updateDestination(index, { city: location, dayFrom, dayTo, dates})
    }, [dayTo, dayFrom, monthTo, monthFrom])

    useEffect(() => {
        if (isValid()) {
            setLocalValid(true)
        } else {
            setLocalValid(false)
        }
    }, [location, dayFrom, dayTo])

    const isValid = () => {
        return (dayTo && dayFrom && location
        )
    }
    return (
        <View style={styles.container}>
            <Location setHideDates={setHideDates} searchVisible={searchVisible} setSearchVisible={setSearchVisible} enabled={edit} updateLocation={updateLocation} setLocation={setLocation} location={destination.city} />
            <DateSelectorRow
                hide={hideDates}
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
                <View style={styles.editRow}>
                    <TouchableOpacity onPress={() => {
                        setEdit(true)
                        setSearchVisible(true)
                    }}>
                        <Ionicons name="create" size={40} />
                    </TouchableOpacity>
                </View>
            }
            {/* {edit &&
                <View style={styles.editRow}>
                    <TouchableOpacity onPress={() => { save() }}>
                        <Ionicons name="checkmark-circle-outline" size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeDestination(index)}>
                        <Ionicons name="trash" size={40} />
                    </TouchableOpacity>
                </View>
            } */}

        </View>
    )
}

export default Destination

const styles = StyleSheet.create({
    line: {
        borderBottomColor: 'black', // Change the color as per your requirement
        borderBottomWidth: 1,
        margin: 20,
    },
    editRow: {
        position: 'absolute',
        top: 250,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        height: '100%',
    },
    container: {
        width: '100%',
        height: 260,
    },
    dateSelectorLabel: {
        flex: 0.5
    },
    dateSelectorRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    searchBar: {
        width: '85%',
        height: '50%',
        borderWidth: 2,
    }
})