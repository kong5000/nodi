import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import DateSelectorRow from '../components/DataSelectorRow';
import Location from './Location';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';

const Destination = ({ destination, setDestination }) => {
    const [searchVisible, setSearchVisible] = useState(false)
    const [hideDates, setHideDates] = useState(false)
    const [edit, setEdit] = useState(true)
    const [localValid, setLocalValid] = useState(false)
    const [location, setLocation] = useState('')

    const [dayTo, setDayTo] = useState('');
    const [dayFrom, setDayFrom] = useState('');
    const [monthFrom, setMonthFrom] = useState('');
    const [monthTo, setMonthTo] = useState('');


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

        setDestination({ city: location, dayFrom, dayTo, dates })
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
            <Location
                setHideDates={setHideDates}
                searchVisible={searchVisible}
                setSearchVisible={setSearchVisible}
                enabled={edit}
                setLocation={setLocation}
                location={location} />
            {location &&
                <DateSelectorRow
                    hide={hideDates}
                    enabled={edit}
                    dayTo={dayTo}
                    setDayTo={setDayTo}
                    dayFrom={dayFrom}
                    setDayFrom={setDayFrom}
                    monthTo={monthTo}
                    setMonthTo={setMonthTo}
                    monthFrom={monthFrom}
                    setMonthFrom={setMonthFrom}
                />
            }


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