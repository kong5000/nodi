import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { storage, auth, database } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/core'
import CalendarPicker from 'react-native-calendar-picker';
import PictureSignup from './PictureSignup';
import AgeJobSignup from './AgeJobSignup';
import TravelSignup from './TravelSignup';
import GenderSignup from './GenderSignup'
import TravelWithGenderSignup from './TravelWithGenderSignup'

const ModalScreen = () => {
    const { user } = useAuth()
    const [updatingProfile, setUpdatingProfile] = useState(false)
    const [page, setPage] = useState(1)
    const [age, setAge] = useState(null)
    const [job, setJob] = useState(null)
    const [gender, setGender] = useState(null)
    const [travelWithMen, setTravelWithMen] = useState(null)
    const [travelWithWomen, setTravelWithWomen] = useState(null)
    const [travelWithNonbinary, setTravelWithNonbinary] = useState(null)
    const [travelWithOther, setTravelWithOther] = useState(null)

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



    return (
        <View style={styles.container}>
            <Text>Welcome to APP</Text>
            {page == 1 &&
                <PictureSignup
                    setJob={setJob}
                    job={job}
                    setAge={setAge}
                    age={age}
                    setImageUri={setImageUri}
                    imageUri={imageUri}
                    setPage={setPage}
                />}
            {page == 2 &&
                <AgeJobSignup
                    setJob={setJob}
                    job={job}
                    setAge={setAge}
                    age={age}
                    setPage={setPage}
                />
            }
            {page == 3 && <GenderSignup gender={gender} setGender={setGender} setPage={setPage} />}
            {page == 4 && <TravelWithGenderSignup
                setTravelWithMen={setTravelWithMen}
                travelWithMen={travelWithMen}
                setTravelWithWomen={setTravelWithWomen}
                travelWithWomen={travelWithWomen}
                setTravelWithNonbinary={setTravelWithNonbinary}
                travelWithNonBinary={travelWithNonbinary}
                setTravelWithOther={setTravelWithOther}
                travelWithOther={travelWithOther}
                setPage={setPage}
            />}
            {page == 1 && <TravelSignup />}

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