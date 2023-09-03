import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { database, storage } from '../firebase';
import getUserData from '../hooks/userData';
import Interests from '../screens/Interests';
import { COLORS, FLEX_CENTERED, FONT_SIZE } from '../style';
import PictureButton from './PictureButton';
import StyleText from './StyleText';
const { width, height } = Dimensions.get('window');
const BOTTOM_MARGIN = "7%"

const UserSettings = () => {
    const { userData } = getUserData()
    const [profilePicture, setProfilePicture] = useState("")
    const [imageLoading, setImageLoading] = useState(false)
    const [showSaved, setShowSaved] = useState(true)
    const [settingMenu, setSettingMenu] = useState("profile")
    const [firstName, setFirstName] = useState(userData.name)
    const [lastName, setLastName] = useState(userData.lastName)
    const [occupation, setOccupation] = useState(userData.occupation)
    const [education, setEducation] = useState(userData.education)
    const [intro, setIntro] = useState(userData.intro)
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
                setProfilePicture(result.uri)

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
                setImageLoading(false)
            }
        } catch (e) {
            setImageLoading(false)
            console.log(e)
            alert(e)
        }
    }
    return (
        <>
            <View style={styles.mainPictureContainer}>
                <PictureButton
                    image={userData.picture}
                    onPress={pickImage}
                    index={0}
                    loading={imageLoading}
                />
            </View>
            <TouchableOpacity style={{
                ...FLEX_CENTERED,
                width: "50%",
                backgroundColor: COLORS.mainTheme,
                borderRadius: 30,
                paddingHorizontal: FONT_SIZE.small,
                paddingVertical: 10,
            }}>
                <StyleText
                    style={{
                        ...styles.buttonText,
                        color: "white"
                    }}
                    bold
                    text="View Profile"
                />
            </TouchableOpacity>
            <StyleText
                text="Your Intro"
                fontSize={FONT_SIZE.title}
                bold
                style={{
                    width: "85%",
                    marginTop: "7.5%",
                    marginBottom: "1%"
                }}
            />
            <StyleText
                text="Tell us about yourself and what you're up to"
                fontSize={FONT_SIZE.small}
                style={{
                    width: "84%",
                    marginBottom: "2.5%",
                }}
            />
            <TextInput
                multiline
                activeOutlineColor='black'
                style={{
                    width: "85%",
                    height: 125,
                    marginBottom: "7.5%",
                    fontWeight: '700'

                }}
                outlineStyle={styles.textInputOutline}
                mode='outlined'
                value={intro}
                onChangeText={text => setIntro(text)}
            />
            <StyleText
                text="Your Details"
                fontSize={FONT_SIZE.title}
                bold
                style={{
                    width: "85%",
                }}
            />
            <View style={{
                marginTop: '5%'
            }}>
                <TextInput
                    theme={{
                        colors: {
                            onSurfaceVariant: COLORS.halfGrey,
                        }
                    }}
                    label='First Name'
                    activeOutlineColor='black'
                    mode='outlined'
                    style={styles.textInput}
                    outlineStyle={styles.textInputOutline}
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                />
                <TextInput
                    theme={{
                        colors: {
                            onSurfaceVariant: COLORS.halfGrey,
                        }
                    }}
                    label='Last Name'
                    activeOutlineColor='black'
                    mode='outlined'
                    style={styles.textInput}
                    outlineStyle={styles.textInputOutline}
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                />
                <TextInput
                    theme={{
                        colors: {
                            onSurfaceVariant: COLORS.halfGrey,
                        }
                    }}
                    label='Occupation'
                    activeOutlineColor='black'
                    mode='outlined'
                    style={styles.textInput}
                    outlineStyle={styles.textInputOutline}
                    value={occupation}
                    onChangeText={text => setOccupation(text)}
                />
                <TextInput
                    theme={{
                        colors: {
                            onSurfaceVariant: COLORS.halfGrey,
                        }
                    }}
                    label='Education (Institution)'
                    activeOutlineColor='black'
                    mode='outlined'
                    style={styles.textInput}
                    outlineStyle={styles.textInputOutline}
                    value={education}
                    onChangeText={text => setEducation(text)}
                />
            </View>
            <StyleText
                text="Your Interests"
                fontSize={FONT_SIZE.title}
                bold
                style={{
                    width: "85%",
                    marginTop: "5%",
                    marginBottom: "5%"
                }}
            />
            <Interests />

            <StyleText
                text="Connected Accounts"
                fontSize={FONT_SIZE.title}
                bold
                style={{
                    width: "85%",
                    marginTop: "5%",
                }}
            />
            <StyleText
                text="Share your instagram account on your profile"
                fontSize={FONT_SIZE.small}
                style={{
                    width: "84%",
                    marginBottom: "2.5%",
                }}
            />
            <TouchableOpacity style={{
                ...FLEX_CENTERED,
                width: "70%",
                backgroundColor: COLORS.mainTheme,
                borderRadius: 30,
                paddingHorizontal: FONT_SIZE.small,
                paddingVertical: 10,
            }}>
                <View style={{
                    ...FLEX_CENTERED,
                    flexDirection: 'row',
                }}>
                    <FontAwesome5
                        name="instagram"
                        size={30}
                        color="white"
                        style={{ marginRight: "5%" }}
                    />
                    <StyleText
                        style={{
                            ...styles.buttonText,
                            color: "white"
                        }}
                        fontSize={20}
                        bold
                        text="Link Instagram"
                    />
                </View>
            </TouchableOpacity>
        </>
    )
}

export default UserSettings


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
    },
    buttonText: {
        fontSize: 20
    },
    toggleButton: {
        width: "45%",
    },
    toggleRow: {
        marginHorizontal: '5%',
        marginBottom: BOTTOM_MARGIN,
        display: 'flex',
        flexDirection: 'row',
    },
    mainPictureContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: BOTTOM_MARGIN
    },
    textInput: {
        color: 'black',
        minWidth: "85%",
        height: 55,
        backgroundColor: 'white',
        marginBottom: '4%',
        fontWeight: '700'
    },
    textInputOutline: {
        borderColor: COLORS.neutralGrey,
        borderRadius: FONT_SIZE.small
    }

})