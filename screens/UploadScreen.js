import { Button, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { storage, auth, database } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore'

const UploadScreen = () => {
    const [uploading, setUploading] = useState(false)
    // TODO, iphone crashes second time of picking an image and uploading 
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
                setUploading(true)
                const uid = auth.currentUser?.uid;
                const filename = `profile_picture_${uid}`;
                const response = await fetch(result.uri);
                const blob = await response.blob();
                const storageRef = ref(storage, filename);
                await uploadBytes(storageRef, blob);

                const downloadURL = await getDownloadURL(storageRef);

                const userRef = doc(database, 'users', uid);

                await updateDoc(userRef, {
                    profilePicture: downloadURL,
                });
                setUploading(false)
            }
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }
    return (
        <View>
            <Button
                title="Upload Picture"
                onPress={pickImage}
            />
        </View>
    )
}

export default UploadScreen

const styles = StyleSheet.create({})