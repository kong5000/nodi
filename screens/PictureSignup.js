import { StyleSheet, Text, Button, TouchableOpacity, Image, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react'
import PictureButton from '../components/PictureButton';
import NextButton from '../components/NextButton';
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
                quality: 1,
                allowsMultipleSelection: false,
            });
            if (!result.canceled) {
                let newImages = [...images]
                newImages[index] = result.uri
                setImages(newImages)
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
            <Text>{images.length}</Text>
            <Text style={styles.modalHeader}>Step1: Select a profile picture </Text>
            <Button
                title="Upload Picture"
                onPress={pickImage}
            />
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
        margin: 10
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