import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { database, storage } from '../firebase';
import getUserData from '../hooks/userData';
import { COLORS, SIZES } from '../style';
import PictureButton from './PictureButton';

const ProfilePicture = ({setProfilePicture}) => {
    const { userData } = getUserData()
    const [imageLoading, setImageLoading] = useState(false)

    const pickImage = async (index) => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 0,
                allowsMultipleSelection: false,
            });
            if (!result.canceled) {
                setImageLoading(true)

                const uid = userData.id;
                const filename = `profile_picture_${index + "_" + uid}`;
                const response = await fetch(result.uri);

                const blob = await response.blob();
                const storageRef = ref(storage, filename);

                await uploadBytes(storageRef, blob);

                const downloadURL = await getDownloadURL(storageRef);

                const userRef = doc(database, 'users', uid);

                await updateDoc(userRef, {
                    picture: downloadURL,
                })
                setProfilePicture(downloadURL)
                setImageLoading(false)
            }
        } catch (e) {
            setImageLoading(false)
            console.log(e)
            alert(e)
        }
    }
    return (
        <View style={styles.mainPictureContainer}>
            <PictureButton
                image={userData && userData.picture}
                onPress={pickImage}
                index={0}
                loading={imageLoading}
            />
        </View>
    )
}

export default ProfilePicture

const styles = StyleSheet.create({
    mainPictureContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: SIZES.marginVertical,
        backgroundColor: COLORS.neutralBlueGrey,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: COLORS.mainTheme
    }
})