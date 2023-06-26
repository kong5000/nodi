import { StyleSheet, Text, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react'
import PictureButton from '../components/PictureButton';
import NextButton from '../components/NextButton';
import { TEXT_STYLES } from '../style'
import { auth, storage, database } from '../firebase';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PictureSignup = ({ setPage, images, setImages }) => {
    const [loadingStates, setLoadingStates] = useState(new Array(images.length).fill(false))

    const formIncomplete = images.length < 2
    // Todo, filter nsfw images on backend (possibly on front end too?)
    const updateLoadingStates = (index, state) => {
        let newLoadingStates = [...loadingStates]
        newLoadingStates[index] = state
        setLoadingStates(newLoadingStates)
    }
    const pickImage = async (index) => {
        try {
            updateLoadingStates(index, true)
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 0,
                allowsMultipleSelection: false,
            });
            if (!result.canceled) {
                let newImages = [...images]
                newImages[index] = result.uri
                setImages(newImages)

                const uid = auth.currentUser?.uid;
                const filename = `profile_picture_${index + "_" + uid}`;
                console.log("Fetching uri")
                const response = await fetch(result.uri);
                console.log("awaiting blob")

                const blob = await response.blob();
                const storageRef = ref(storage, filename);
                console.log("awaiting uploadbytes")

                await uploadBytes(storageRef, blob);
                console.log("getting download url")

                const downloadURL = await getDownloadURL(storageRef);

                const userRef = doc(database, 'users', uid);
                console.log("updating user doc")

                await updateDoc(userRef, {
                    profilePicture: downloadURL,
                });
            }
            updateLoadingStates(index, false)
        } catch (e) {
            updateLoadingStates(index, false)

            console.log(e)
            alert(e)
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
        <View style={styles.pictureSelection}>
            <Text style={TEXT_STYLES.header}>Add photos! (min 2)</Text>
            <View style={styles.mainPictureContainer}>
                <PictureButton images={images} onPress={pickImage} size={"large"} index={0} loadingStates={loadingStates} />
                <PictureButton images={images} onPress={pickImage} size={"large"} index={1} loadingStates={loadingStates} />
            </View>
            <View style={styles.smallPictureContainer}>
                <PictureButton images={images} onPress={pickImage} size={"small"} index={2} loadingStates={loadingStates} />
                <PictureButton images={images} onPress={pickImage} size={"small"} index={3} loadingStates={loadingStates} />
                <PictureButton images={images} onPress={pickImage} size={"small"} index={4} loadingStates={loadingStates} />
            </View>
            <NextButton
                index={1}
                setPage={setPage}
                formIncomplete={formIncomplete}
                incompleteMessage="Please select at least 2 photos" />
        </View>
    )
}

export default PictureSignup
const styles = StyleSheet.create({
    pictureSelection: {
        height: "100%",
        width: "100%",
    },
    mainPictureContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 20
    },
    smallPictureContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeader: {
        fontWeight: 'bold',
        margin: 10,
        fontSize: 30,
        margin: 20,
        marginTop: 30
    },
    updateButton: {

    },
    greyedOut: {
        color: 'gray'
    },
    imageContainer: {
        aspectRatio: 1, // Maintain a 1:1 aspect ratio for the container
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        borderRadius: 20,
        backgroundColor: 'white'
    },
    image: {
        flex: 1, // Take up the entire space within the container
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Resize the image to cover the container
    },
});