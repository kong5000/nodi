import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import getUserData from '../hooks/userData'
import ProfileCard from '../components/ProfileCard'
import Footer from '../components/Footer'
const SingleProfileScreen = () => {
    const { currentProfile } = getUserData()
    const refsArray = useRef([]);
    const [imagesLoaded, setImagesLoaded] = useState(false)

    return (
        <View style={styles.screen}>
            <ProfileCard
                item={currentProfile}
                instagramHandle={"test"}
                refsArray={refsArray}
                setImagesLoaded={setImagesLoaded}
                viewMode
            />
            <Footer/>
        </View>
    )
}

export default SingleProfileScreen

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        backgroundColor: "white"
    },
})