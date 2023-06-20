import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import DropDownPicker from 'react-native-dropdown-picker';

const DateSelectorRow = ({ enabled,
    dayTo, setDayTo, dayFrom, setDayFrom,
    monthTo, setMonthTo, monthFrom, setMonthFrom

}) => {
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    const [openDaysFrom, setOpenDaysFrom] = useState(null);
    const [openDaysTo, setOpenDaysTo] = useState(null);
    const [items, setItems] = useState([
        { label: 'January', value: 'January' },
        { label: 'February', value: 'February' },
        { label: 'March', value: 'March' },
        { label: 'April', value: 'April' },
        { label: 'May', value: 'May' },
        { label: 'June', value: 'June' },
        { label: 'July', value: 'July' },
        { label: 'August', value: 'August' },
        { label: 'September', value: 'September' },
        { label: 'October', value: 'October' },
        { label: 'November', value: 'November' },
        { label: 'December', value: 'December' },
    ]);
    const daysInYear = {
        January: 31,
        February: 28,
        March: 31,
        April: 30,
        May: 31,
        June: 30,
        July: 31,
        August: 31,
        September: 30,
        October: 31,
        November: 30,
        December: 31
    };
    const getDays = month => {
        return Array.from({ length: daysInYear[month] }, (_, index) => ({
            label: `${index + 1}`,
            value: `${index + 1}`,
        }))
    }
    const [daysFrom, setDaysFrom] = useState(getDays('January'))
    const [daysTo, setDaysTo] = useState(getDays('January'))

    useEffect(() => {
        setDaysFrom(getDays(monthFrom))
    }, [monthFrom])

    useEffect(() => {
        setDaysTo(getDays(monthTo))
    }, [monthTo])

    return (
        <View>
            <View style={[styles.dateSelectorRow, styles.dateSelectorFrom]}>
                <Text style={styles.dateSelectorLabel}>From</Text>
                <View style={styles.month}>
                    <DropDownPicker
                        placeholder="Month"
                        open={openFrom}
                        value={monthFrom}
                        items={items}
                        setOpen={setOpenFrom}
                        setValue={setMonthFrom}
                        setItems={setItems}
                        disabled={!enabled}
                    />
                </View>
                <View style={styles.day}>
                    <DropDownPicker
                        placeholder="Day"
                        open={openDaysFrom}
                        value={dayFrom}
                        items={daysFrom}
                        setOpen={setOpenDaysFrom}
                        setValue={setDayFrom}
                        setItems={setDaysFrom}
                    />
                </View>
            </View>
            <View style={styles.dateSelectorRow}>
                <Text style={styles.dateSelectorLabel}>To</Text>
                <View style={styles.month}>
                    <DropDownPicker
                        placeholder="Month"
                        open={openTo}
                        value={monthTo}
                        items={items}
                        setOpen={setOpenTo}
                        setValue={setMonthTo}
                        setItems={setItems}
                    />
                </View>
                <View style={styles.day}>
                    <DropDownPicker
                        placeholder="Day"
                        open={openDaysTo}
                        value={dayTo}
                        items={daysTo}
                        setOpen={setOpenDaysTo}
                        setValue={setDayTo}
                        setItems={setDaysTo}
                    />
                </View>
            </View>
        </View>
    )
}

export default DateSelectorRow

const styles = StyleSheet.create({
    dateSelectorFrom: {
        zIndex: 1
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
    },
    month: {
        backgroundColor: '#171717',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    day: {
        backgroundColor: '#171717',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15
    }
})