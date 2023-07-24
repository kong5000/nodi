import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
const moment = require('moment');

import React, { useState, useEffect } from 'react'
import { COLORS, TEXT_STYLES, THEMES } from '../style';
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

            if (!endDate || !startDate) {
                alert("Please select both a start and end date")
            } else {
                if (moment(endDate).diff(moment(startDate), 'days') > 180) {
                    alert("Trips must be less than 6 months")
                } else {
                    setDayFrom(moment(startDate).format('YYYY-MM-DD'))
                    setDayTo(moment(endDate).format('YYYY-MM-DD'))
                    setOpen(false);
                    setRange({ startDate, endDate });
                }
            }
        },
        [setOpen, setRange]
    );

    return (
        <View style={hide ? styles.hiddenContainer : styles.container}>
            <View style={styles.dateSelectorRow}>
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

                    <View style={styles.dateContainer}>
                        {!dayFrom &&
                            <TouchableOpacity style={[styles.dateBubble, {width:"50%"}]} onPress={() => setOpen(true)} >
                                <Text style={TEXT_STYLES.standard}>Select Date</Text>
                            </TouchableOpacity>

                        }
                    </View>
                </View>
          
                {(dayTo && dayFrom) && <View style={styles.datesContainerHorizontal}>
                    <TouchableOpacity style={styles.dateBubble} onPress={() => setOpen(true)} >
                        <Text style={TEXT_STYLES.standard}>{moment(dayFrom).format('MMMM D')}</Text>
                    </TouchableOpacity>
                    <Text style={TEXT_STYLES.standard}>to</Text>
                    <TouchableOpacity style={styles.dateBubble} onPress={() => setOpen(true)}>
                        <Text style={TEXT_STYLES.standard}>{moment(dayTo).format('MMMM D')}</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
        </View>
    )
}

export default DateSelectorRow

const styles = StyleSheet.create({
    datesContainerHorizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        fontSize: 20,
        flex: 0.5,
    },
    dateContainer: {
        flex: 1,
        display:"flex",
        justifyContent:'center',
        alignItems: 'center',
    },
    dateBubble: {
        ...THEMES.displayTheme,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        margin: 15,
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
        marginTop: 50,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 50,
    },
    hiddenContainer: {
        // margin: 15,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 100,
        zIndex: -1,
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