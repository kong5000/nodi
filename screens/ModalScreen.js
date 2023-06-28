import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import PictureSignup from './PictureSignup';
import TravelSignup from './TravelSignup';
import GenderSignup from './GenderSignup'
import TravelWithGenderSignup from './TravelWithGenderSignup'
import NameSignup from './NameSignup';
import Interests from './Interests'
import { ProgressBar } from 'react-native-paper'
import { TEXT_STYLES } from '../style';
import getUserData from '../hooks/userData';
import { getUserDoc, updateUserDoc } from '../services/UserQueries';
import { addTripDoc } from '../services/TripCollectionQueries'
import moment from 'moment';
const LAST_PAGE = 6

const ModalScreen = () => {
    const { setUserData } = getUserData()
    const { user } = useAuth()
    const [birthDate, setBirthDate] = useState(new Date())
    const [updatingProfile, setUpdatingProfile] = useState(false)
    const [name, setName] = useState('')
    const [page, setPage] = useState(0)
    const [gender, setGender] = useState(null)
    const [travelWithMen, setTravelWithMen] = useState(null)
    const [travelWithWomen, setTravelWithWomen] = useState(null)
    const [travelWithNonbinary, setTravelWithNonbinary] = useState(null)
    const [travelWithOther, setTravelWithOther] = useState(null)
    const [images, setImages] = useState([])
    const [interests, setInterests] = useState([])
    const [trips, setTrips] = useState([])
    useEffect(() => {
        const updateUser = async () => {
            console.log("UPDATING USER")
            setUpdatingProfile(true)

            const travelsWith = [];

            if (travelWithMen) travelsWith.push("male");
            if (travelWithWomen) travelsWith.push("female");
            if (travelWithNonbinary) travelsWith.push("nonbinary");
            if (travelWithOther) travelsWith.push("other");

            const newData = {
                birthDate: moment(birthDate).format('YYYY-MM-DD'),
                name,
                gender,
                travelsWith,
                interests
            };
            await updateUserDoc(user.uid, newData)
            const userData = await getUserDoc(user.uid)
            setUserData(userData)
            const promises = trips.map(async (trip) => {
                await addTripDoc({ ...trip, userInfo: userData });
            });
            await Promise.all(promises);
            setUpdatingProfile(false)
        }
        if (page == LAST_PAGE) {
            updateUser()
        }
    }, [page])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progressBar}>
                <ProgressBar progress={page / 5} color='black' />
            </View>
            {page == 0 && <NameSignup
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                setName={setName}
                name={name}
                setPage={setPage}
            />}
            {page == 1 && <PictureSignup
                images={images}
                setImages={setImages}
                setPage={setPage}
            />}
            {page == 2 && <GenderSignup
                gender={gender}
                setGender={setGender}
                setPage={setPage}
            />}
            {page == 3 && <TravelWithGenderSignup
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
            {page == 4 && <TravelSignup setTrips={setTrips} trips={trips} setPage={setPage} />}
            {page == 5 && <Interests interests={interests} setInterests={setInterests} setPage={setPage} />}
            {(page == 6 && updatingProfile) &&
                <>
                    <Text style={TEXT_STYLES.header}>Updating Your Profile</Text>
                    <ActivityIndicator animating={updatingProfile} size="large" color="#ff0000" />
                </>
            }
        </SafeAreaView>
    )
}

export default ModalScreen

const styles = StyleSheet.create({
    progressBar: {
        width: '100%'
    },
    welcomeText: {
        fontWeight: 'bold',
        fontSize: 30
    },
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'gold'
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