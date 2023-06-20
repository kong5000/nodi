import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import DateSelectorRow from '../components/DataSelectorRow';
import Location from './Location';
import Ionicons from '@expo/vector-icons/Ionicons';

const Destination = ({index,removeDestination, addDestination, setValid }) => {
    const [edit, setEdit] = useState(true)
    const [localValid, setLocalValid] = useState(false)
    const [location, setLocation] = useState(null)
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)

    const save = ()=> {
        console.log("ssave")
        if(!isValid()){
            alert("Please complete")
        }else{
            setEdit(false)
            setValid(true)
        }
    }


    useEffect(() => {
        if (isValid()) {
            setLocalValid(true)
        } else {
            setLocalValid(false)
            setValid(false)
        }
    }, [location, from, to])

    const isValid = () => {
        return (to && from && location) 
    }
    return (
        <View style={styles.container}>
            <Text>{index}</Text>
            <Location setLocation={setLocation} location={location} />
            <DateSelectorRow enabled={edit} to={to} setTo={setTo} from={from} setFrom={setFrom} />
            {(!edit && localValid) &&
                <TouchableOpacity onPress={() => setEdit(true)}>
                    <Ionicons name="create" size={32} />
                </TouchableOpacity>
            }
            {edit &&
                <View style={styles.editRow}>
                    <TouchableOpacity onPress={() => {save()}}>
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
    editRow:{
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