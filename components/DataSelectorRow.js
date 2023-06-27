import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper';
const moment = require('moment');

import React, { useState, useEffect } from 'react'
import { TEXT_STYLES } from '../style';
import DropDownPicker from 'react-native-dropdown-picker';
import { DatePickerModal } from 'react-native-paper-dates';

const DateSelectorRow = ({ enabled,
    dayTo, setDayTo, dayFrom, setDayFrom,
    hide

}) => {
    const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
    const [open, setOpen] = React.useState(false);
    const onDismiss = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirm = React.useCallback(
        ({ startDate, endDate }) => {
            console.log(endDate)
            if (!endDate || !startDate) {
                alert("Please select both a start and end date")
            } else {
                setDayFrom(moment(startDate).format('YYYY-MM-DD'))
                setDayTo(moment(endDate).format('YYYY-MM-DD'))
                setOpen(false);
                setRange({ startDate, endDate });
            }
        },
        [setOpen, setRange]
    );
    // useEffect(() => {
    //     let {startDate, endDate}= range
    //     if(startDate > endDate){
    //         alert("Your end date is before your start date")
    //     }
    // },[range])

    return (
        <View style={hide ? styles.hiddenContainer : styles.container}>
            <View style={[styles.dateSelectorRow, styles.dateSelectorFrom]}>
                <DatePickerModal
                    locale="en"
                    mode="range"
                    visible={open}
                    onDismiss={onDismiss}
                    startDate={range.startDate}
                    endDate={range.endDate}
                    onConfirm={onConfirm}
                />
                <View style={styles.dateRow}>
                    {!dayFrom && <Text style={styles.dateLabel}>When?</Text>}
                    {dayFrom && <Text style={styles.dateLabel}>From</Text>}

                    <View style={styles.dateContainer}>
                        {dayFrom ? <TouchableOpacity style={styles.dateBubble} onPress={() => setOpen(true)} >
                            <Text style={styles.dateText}>{moment(dayFrom).format('MMMM D')}</Text>
                        </TouchableOpacity> :
                            <TouchableOpacity style={styles.dateBubble} onPress={() => setOpen(true)} >
                                <Text style={styles.dateText}>Select Date</Text>
                            </TouchableOpacity>

                        }
                    </View>
                </View>

                {dayTo &&
                    <View style={styles.dateRow}>
                        <Text style={styles.dateLabel}>To</Text>
                        <View style={styles.dateContainer}>

                            <TouchableOpacity style={styles.dateBubble} onPress={() => setOpen(true)}>
                                <Text style={styles.dateText}>{moment(dayTo).format('MMMM D')}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                }
                {dayTo && <View style={styles.line}></View>}

            </View>

        </View>
    )
}

export default DateSelectorRow

const styles = StyleSheet.create({
    line: {
        width: "100%",
        borderBottomColor: 'black', // Change the color as per your requirement
        borderBottomWidth: 1,
        marginRight: "10%",
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
    },
    dateText: {
        fontSize: 22
    },
    dateLabel: {
        ...TEXT_STYLES.radioLabel,
        fontSize: 26,
        flex: 0.5,
    },
    dateContainer: {
        flex: 1,

    },
    dateBubble: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        margin: 15,
        marginRight: 40
    },
    dateRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    dropDownButtonStyle: {
        borderWidth: 'none',
    },
    dropDownPlaceholder: {

    },
    dropDownPlaceholderDisabled: {
        color: 'grey'
    },
    dropDownContainer: {

    },
    container: {
        margin: 15,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 50,
    },
    hiddenContainer: {
        margin: 15,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 50,
        zIndex: -1,
    },
    dateSelectorFrom: {
    },
    dateSelectorLabel: {
        ...TEXT_STYLES.radioLabel,
        flex: 0.5
    },
    dateSelectorRow: {
        display: 'flex',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBar: {
        width: '85%',
        height: '50%',
        borderWidth: 2,
    },
    month: {
        flex: 1.25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    day: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15
    }
})