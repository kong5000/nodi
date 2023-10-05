import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { TextInput } from 'react-native-paper';
import { COUNTRY_ISO_MAP } from '../data';
import getUserData from '../hooks/userData';
import { updateUserDoc } from '../services/UserQueries';
import { COLORS, FLEX_CENTERED, FONT_SIZE } from '../style';
import AddLocation from './AddLocation';
import Interests from './Interests';
import ProfilePicture from './ProfilePicture';
import StyleText from './StyleText';
import { useNavigation } from '@react-navigation/core'
import { getSetting, storeSetting } from '../services/LocalStorage';

const { width, height } = Dimensions.get('window');
const BOTTOM_MARGIN = "7%"

const UserSettings = () => {
    const { setCurrentProfile, userData } = getUserData()
    const [firstName, setFirstName] = useState(userData.name)
    const [lastName, setLastName] = useState(userData.lastName)
    const [occupation, setOccupation] = useState(userData.occupation)
    const [education, setEducation] = useState(userData.education)
    const [intro, setIntro] = useState(userData.intro)
    const [futureLocations, setFutureLocations] = useState(userData.futureLocations)
    const [favoritePlaces, setFavoritePlaces] = useState(userData.favoritePlaces)

    const navigation = useNavigation()

    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                updateUserDoc(userData.id, {
                    firstName,
                    lastName,
                    occupation,
                    education,
                    intro,
                    futureLocations,
                    favoritePlaces
                })

                storeSetting(`profile_settings`, JSON.stringify({
                    firstName,
                    lastName,
                    occupation,
                    education,
                    intro,
                    futureLocations,
                    favoritePlaces
                }))

            } catch (err) {
                console.log(err)
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [firstName, lastName, occupation, education, intro, futureLocations, favoritePlaces]);


    return (
        <>
            <ProfilePicture />
            <TouchableOpacity
                onPress={
                    () => {
                        setCurrentProfile(userData)
                        navigation.navigate('Profile')
                    }
                }
                style={{
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
                {/* <TextInput
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
                /> */}
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
            <View >
                <Interests />
            </View>

            <View style={{ marginVertical: "10%", width: "85%" }}>
                <StyleText
                    text="Going To"
                    fontSize={FONT_SIZE.title}
                    bold
                />
                <StyleText
                    text="Prompt for users to add future trips"
                    fontSize={FONT_SIZE.small}
                    style={{ marginBottom: "5%" }}
                />
                <AddLocation
                    onAdd={(newLocation) => {
                        console.log(newLocation)
                        if (!futureLocations.find((location => location == newLocation))) {
                            setFutureLocations(prev => [...prev, newLocation])
                        }
                    }}
                />
                {futureLocations.length > 0 && <StyleText
                    text="Your next destinations: "
                    fontSize={FONT_SIZE.small}
                    style={{ zIndex: -1 }}

                />}
                {futureLocations && futureLocations.map(loc =>
                    <View style={{
                        display: 'flex',
                        ...FLEX_CENTERED,
                        zIndex: -1
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginVertical: 10,
                            width: "100%",
                            borderWidth: 1,
                            borderRadius: 15,
                            borderColor: COLORS.neutralGrey,
                            padding: 15,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <CountryFlag isoCode={COUNTRY_ISO_MAP[loc]} size={30}
                                    style={{ borderRadius: 2, marginRight: 10 }} />
                                <StyleText
                                    fontSize={20}
                                    text={loc} />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setFutureLocations(prev => prev.filter((location) => location != loc))
                                }}
                            >
                                <Ionicons
                                    name="close-outline" size={30}
                                    color={COLORS.neutralGrey}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>)
                }
            </View>
            <View style={{ width: "85%", zIndex: -1 }}>
                <StyleText
                    text="Favorite Destinations"
                    fontSize={FONT_SIZE.title}
                    bold
                />
                <StyleText
                    text="Prompt for users favorite countries"
                    fontSize={FONT_SIZE.small}
                    style={{ marginBottom: "5%" }}
                />
                <AddLocation
                    onAdd={(newLocation) => {
                        if (!favoritePlaces.find((location => location == newLocation))) {
                            setFavoritePlaces(prev => [...prev, newLocation])
                        }
                    }}
                />
                {favoritePlaces.length > 0 && <StyleText
                    text="Your favorite countries to visit: "
                    fontSize={FONT_SIZE.small}
                    style={{ zIndex: -1 }}

                />}
                {favoritePlaces && favoritePlaces.map(loc =>
                    <View style={{
                        display: 'flex',
                        ...FLEX_CENTERED,
                        zIndex: -1,
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginVertical: 10,
                            width: "100%",
                            borderWidth: 1,
                            borderRadius: 15,
                            borderColor: COLORS.neutralGrey,
                            padding: 15,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <CountryFlag isoCode={COUNTRY_ISO_MAP[loc]} size={30}
                                    style={{ borderRadius: 2, marginRight: 10 }} />
                                <StyleText
                                    fontSize={20}
                                    text={loc} />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setFavoritePlaces(prev => prev.filter((location) => location != loc))
                                }}
                            >
                                <Ionicons
                                    name="close-outline" size={30}
                                    color={COLORS.neutralGrey}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>)
                }
            </View>
            <View style={{ marginBottom: 200 }} />
            {/* <View style={{
                width: "85%",
                marginTop: "10%"
            }}>
                <StyleText
                    text="Link Instagram"
                    fontSize={FONT_SIZE.title}
                    bold
                />
                <StyleText
                    text="Prompt for users to share instagram pictures"
                    fontSize={FONT_SIZE.small}
                />
            </View> */}

            {/* <TouchableOpacity style={{
                ...FLEX_CENTERED,
                width: "70%",
                backgroundColor: COLORS.mainTheme,
                borderRadius: 30,
                paddingHorizontal: FONT_SIZE.small,
                paddingVertical: 10,
                zIndex: -2,
                marginVertical: "10%"
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
            </TouchableOpacity> */}
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