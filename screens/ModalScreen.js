import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import PictureSignup from './PictureSignup';
import AgeJobSignup from './AgeJobSignup';
import TravelSignup from './TravelSignup';
import GenderSignup from './GenderSignup'
import TravelWithGenderSignup from './TravelWithGenderSignup'
import NameSignup from './NameSignup';
import Interests from './Interests'
import { ProgressBar } from 'react-native-paper'

const ModalScreen = () => {
    const { user } = useAuth()
    const [updatingProfile, setUpdatingProfile] = useState(false)
    const [name, setName] = useState('')
    const [page, setPage] = useState(0)
    const [age, setAge] = useState(null)
    const [job, setJob] = useState(null)
    const [gender, setGender] = useState(null)
    const [travelWithMen, setTravelWithMen] = useState(null)
    const [travelWithWomen, setTravelWithWomen] = useState(null)
    const [travelWithNonbinary, setTravelWithNonbinary] = useState(null)
    const [travelWithOther, setTravelWithOther] = useState(null)
    const [imageUri, setImageUri] = useState(null)
    const [imageBucketUrl, setImageBucketUrl] = useState(null)

    useEffect(() => {
        if (user.profilePicture) {
            // navigation.navigate("Home")
        }
    }, [user])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progressBar}>
                <ProgressBar progress={page / 5} color='black' />
            </View>
            {page == 0 && <NameSignup setName={setName} name={name} setPage={setPage} />}
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
            {page == 5 && <TravelSignup setPage={setPage}/>}
            {page == 6 && <Interests />}
            {updatingProfile &&
                <>
                    <Text>Updating Your Profile</Text>
                    <ActivityIndicator animating={updatingProfile} size="large" color="#ff0000" />
                </>
            }
        </SafeAreaView>
    )
}

export default ModalScreen

const styles = StyleSheet.create({
    progressBar:{
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