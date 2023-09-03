import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Footer from '../components/Footer'
import { ToggleButton, TextInput } from 'react-native-paper';
import StyleText from '../components/StyleText';
import { COLORS, FLEX_CENTERED } from '../style';
import * as ImagePicker from 'expo-image-picker';
import PictureButton from '../components/PictureButton';
import getUserData from '../hooks/userData'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, database } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import Interests from './Interests';
const { width, height } = Dimensions.get('window');
import { FontAwesome5 } from '@expo/vector-icons';



const BOTTOM_MARGIN = "7%"
const SettingsScreen = () => {
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
        <SafeAreaView style={styles.screen}>
            <ScrollView>
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: "20%"
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: "80%",
                        marginBottom: BOTTOM_MARGIN
                    }}>
                        <StyleText
                            bold
                            text="Settings"
                            fontSize={34}
                        />
                        {showSaved &&
                            <View style={{
                                ...FLEX_CENTERED,
                                borderRadius: 30,
                                backgroundColor: COLORS.neutralBlueGrey,
                                paddingVertical: 10,
                                paddingHorizontal: 15
                            }}>
                                <StyleText
                                    text="✓ Saved"
                                    fontSize={15}
                                    style={{
                                        color: COLORS.mainTheme
                                    }}
                                />
                            </View>
                        }
                    </View>

                    <ToggleButton.Row
                        style={styles.toggleRow}
                        onValueChange={value => {
                            setSettingMenu(value)
                        }}
                        value={settingMenu}
                    >
                        <ToggleButton
                            style={[
                                styles.toggleButton,
                                settingMenu == "profile" ? { backgroundColor: COLORS.mainTheme } : {},
                                {
                                    borderBottomLeftRadius: 20,
                                    borderTopLeftRadius: 20
                                }
                            ]}
                            icon={() =>
                                <View>
                                    <StyleText
                                        style={
                                            [
                                                styles.buttonText,
                                                settingMenu == "profile" ? { color: "white" } : { color: "black" },
                                            ]}
                                        text="profile"
                                    />
                                </View>
                            }
                            value="profile"
                        >
                        </ToggleButton>
                        <ToggleButton
                            style={[
                                styles.toggleButton,
                                settingMenu == "account" ? { backgroundColor: COLORS.mainTheme } : {},
                                {
                                    borderBottomRightRadius: 20,
                                    borderTopRightRadius: 20
                                }
                            ]}

                            icon={() => <View>
                                <StyleText
                                    style={
                                        [
                                            styles.buttonText,
                                            settingMenu == "account" ? { color: "white" } : { color: "black" }
                                        ]
                                    }
                                    text="account"
                                />
                            </View>
                            }
                            value="account" >
                        </ToggleButton>
                    </ToggleButton.Row>

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
                        paddingHorizontal: 15,
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
                        fontSize={24}
                        bold
                        style={{
                            width: "85%",
                            marginTop: "7.5%",
                            marginBottom: "1%"
                        }}
                    />
                    <StyleText
                        text="Tell us about yourself and what you're up to"
                        fontSize={15}
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
                            height: 155,
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
                        fontSize={24}
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
                        fontSize={24}
                        bold
                        style={{
                            width: "85%",
                            marginTop: "5%"
                        }}
                    />
                    <Interests />
                    <StyleText
                        text="Connected Accounts"
                        fontSize={24}
                        bold
                        style={{
                            width: "85%",
                            marginTop: "5%",
                        }}
                    />
                    <StyleText
                        text="Share your instagram account on your profile"
                        fontSize={15}
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
                        paddingHorizontal: 15,
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
                </View>
            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}

export default SettingsScreen

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
        borderRadius: 15
    }

})