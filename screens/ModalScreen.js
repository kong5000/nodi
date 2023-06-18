import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import * as ImagePicker from 'expo-image-picker';
import { storage, auth, database } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore'

const ModalScreen = () => {
    const { user } = useAuth()
    const [age, setAge] = useState(null)
    const [job, setJob] = useState(null)
    const [imageUri, setImageUri] = useState(null)
    const [imageBucketUrl, setImageBucketUrl] = useState(null)
    const formIncomplete = !age || !job || !imageUri
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                allowsMultipleSelection: false,
            });
            if (!result.canceled) {
                setImageUri(result.uri)
            }
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }
    const uploadImageToBucket = async () => {
        try {
            const uid = "qILmEaZd6TXRwkBynbacY8UFPvX2";
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
            if(!user){
                alert('no user')
                return
            }
            await uploadImageToBucket()
            const userRef = doc(database, 'users', "qILmEaZd6TXRwkBynbacY8UFPvX2");
            await updateDoc(userRef, {
                profilePicture: imageBucketUrl,
                age: age,
                job: job
            });
            alert('updated profile successfully')
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }
    return (
        <View style={styles.container}>
            <Text>Welcome to {user.uid}</Text>
            <Text style={styles.modalHeader}>Step1: Select a profile picture </Text>
            <Button
                title="Upload Picture"
                onPress={pickImage}
            />
            <Text style={styles.modalHeader}>Step2: Occupation</Text>
            <TextInput
                placeholder='Occupation'
                onChangeText={(text) => setJob(text)}
            />
            <Text style={styles.modalHeader}>Step3: Age </Text>
            <TextInput
                placeholder='Age'
                onChangeText={(text) => setAge(text)}
            />

            <TouchableOpacity
                disabled={formIncomplete}
                onPress={() => updateUserProfile()}
            >
                {formIncomplete && <Text>INCIOMPLE</Text>}
                <Text style={formIncomplete ? styles.greyedOut : styles.updateButton}>Update Profile</Text>
            </TouchableOpacity>
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