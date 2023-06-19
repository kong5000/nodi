import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { storage, auth, database } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/core'
import CalendarPicker from 'react-native-calendar-picker';
import Setup1 from './Setup1';
import Setup2 from './Setup2';
import Setup3 from './Setup3';

const ModalScreen = () => {
    const { user } = useAuth()
    const [updatingProfile, setUpdatingProfile] = useState(false)
    const [page, setPage] = useState(1)
    const [age, setAge] = useState(null)
    const [job, setJob] = useState(null)
    const [imageUri, setImageUri] = useState(null)
    const [imageBucketUrl, setImageBucketUrl] = useState(null)
    const navigation = useNavigation()
    const [selected, setSelected] = useState('');
    // const { selectedStartDate, selectedEndDate } = this.state;
    const [selectedStartDate, setSelectedStartDate] = useState('')
    const [selectedEndDate, setSelectedEndDate] = useState('')
    const minDate = new Date(); // Today
    const maxDate = new Date(2027, 6, 3);
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';

    useEffect(() => {
        if (user.profilePicture) {
            // navigation.navigate("Home")
        }
    }, [user])

    const onDateChange = (date, type) => {
        if (type === 'END_DATE') {
            setSelectedEndDate(date)
        } else {
            setSelectedEndDate(null)
            setSelectedStartDate(date)
        }
    }


    const uploadImageToBucket = async () => {
        try {
            const uid = user.uid;
            const filename = `profile_picture_${uid}`;
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const storageRef = ref(storage, filename);
            await uploadBytesResumable(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            setImageBucketUrl(downloadURL)
            console.log(downloadURL)

        } catch (e) {
            console.log(e)
            alert(e)
        }
    }
    const updateUserProfile = async () => {
        try {
            setUpdatingProfile(true)
            await uploadImageToBucket()
            const userRef = doc(database, 'users', user.uid);
            await updateDoc(userRef, {
                profilePicture: imageBucketUrl,
                age: age,
                job: job
            });
            setUpdatingProfile(false)
            alert('updated profile successfully')
            navigation.navigate("Home")
        } catch (e) {
            setUpdatingProfile(false)
            console.log(e)
            alert(e)
        }
    }
    return (
        <View style={styles.container}>
            <Text>Welcome to APP</Text>
            {page == 1 &&
                <Setup1
                    setJob={setJob}
                    job={job}
                    setAge={setAge}
                    age={age}
                    setImageUri={setImageUri}
                    imageUri={imageUri}
                    setPage={setPage}
                />}
            {page == 2 &&
                <Setup2
                    setJob={setJob}
                    job={job}
                    setAge={setAge}
                    age={age}
                    setPage={setPage}
                />
                // <>
                //     <CalendarPicker
                //         startFromMonday={true}
                //         allowRangeSelection={true}
                //         minDate={minDate}
                //         maxDate={maxDate}
                //         todayBackgroundColor="#f2e6ff"
                //         selectedDayColor="#7300e6"
                //         selectedDayTextColor="#FFFFFF"
                //         onDateChange={onDateChange}
                //     />
                //     <View>
                //         <Text>SELECTED START DATE:{startDate}</Text>
                //         <Text>SELECTED END DATE:{endDate}</Text>
                //     </View>
                //     <TouchableOpacity
                //         disabled={formIncomplete}
                //         onPress={() => updateUserProfile()}
                //     >
                //         <Text style={formIncomplete ? styles.greyedOut : styles.updateButton}>Update Profile</Text>
                //     </TouchableOpacity>
                // </>
            }
            {page == 1 && <Setup3
            
            />}

            {updatingProfile &&
                <>
                    <Text>Updating Your Profile</Text>
                    <ActivityIndicator animating={updatingProfile} size="large" color="#ff0000" />
                </>
            }

        </View>
    )
}

export default ModalScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeader: {
        fontWeight: 'bold',
        margin: 10
    },
    updateButton: {

    },
    greyedOut: {
        color: 'gray'
    }
});