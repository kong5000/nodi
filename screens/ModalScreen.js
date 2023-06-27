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
const LAST_PAGE = 6

const ModalScreen = () => {
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

    useEffect(() => {
        if (page == LAST_PAGE) {
            setUpdatingProfile(true)
            images.forEach(image => {
                if(image){
                    console.log(image)
                }
            })
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
            {page == 4 && <TravelSignup setPage={setPage} />}
            {page == 5 && <Interests setPage={setPage} />}
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