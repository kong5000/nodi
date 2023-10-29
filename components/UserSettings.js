import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
import { storeSetting } from '../services/LocalStorage';
import ScrollToTextInput from './ScrollToTextInput';
const BOTTOM_MARGIN = "7%"

const UserSettings = ({ scrollTo }) => {
    const { setCurrentProfile, userData } = getUserData()

    const [firstName, setFirstName] = useState(userData.name)
    const [lastName, setLastName] = useState(userData.lastName)
    const [occupation, setOccupation] = useState(userData.occupation)
    const [education, setEducation] = useState(userData.education)
    const [intro, setIntro] = useState(userData.intro)
    const [futureLocations, setFutureLocations] = useState(userData.futureLocations)
    const [favoritePlaces, setFavoritePlaces] = useState(userData.favoritePlaces)

    const introRef = useRef()
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
            <View
                ref={introRef}
                style={{
                    width: "85%",
                }}
            >

                <TextInput
                    collapsable={false}
                    style={{
                        height: 125,
                        marginBottom: "7.5%",
                        fontWeight: '700'
                    }}
                    onFocus={() => {
                        if (introRef.current) {
                            introRef.current.measure((x, y, width, height, pageX, pageY) => {
                                scrollTo({ x: 0, y: pageY })
                            });
                        }
                    }}
                    multiline
                    scrollEnabled={false}
                    activeOutlineColor='black'
                    outlineStyle={styles.textInputOutline}
                    mode='outlined'
                    value={intro}
                    onChangeText={text => setIntro(text)}
                />
            </View>

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
                <ScrollToTextInput
                    value={firstName}
                    setValue={setFirstName}
                    label="First Name"
                    scrollTo={scrollTo}
                />
                <ScrollToTextInput
                    value={lastName}
                    setValue={setLastName}
                    label="Last Name"
                    scrollTo={scrollTo}
                />
                <ScrollToTextInput
                    value={occupation}
                    setValue={setOccupation}
                    label="Occupation"
                    scrollTo={scrollTo}
                />
                <ScrollToTextInput
                    value={education}
                    setValue={setEducation}
                    label="Education"
                    scrollTo={scrollTo}
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
                    scrollTo={scrollTo}
                    onAdd={(newLocation) => {
                        if (!futureLocations.find((location => location == newLocation))) {
                            setFutureLocations(prev => [...prev, newLocation])
                        }
                    }}
                />
                {futureLocations && futureLocations.length > 0 && <StyleText
                    text="Your next destinations: "
                    fontSize={FONT_SIZE.small}
                    style={{ zIndex: -1 }}

                />}
                {futureLocations && futureLocations.map(loc =>
                    <View
                        key={loc}
                        style={{
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
                                flexWrap: 'wrap',
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
                    scrollTo={scrollTo}
                    onAdd={(newLocation) => {
                        if (!favoritePlaces.find((location => location == newLocation))) {
                            setFavoritePlaces(prev => [...prev, newLocation])
                        }
                    }}
                />
                {favoritePlaces && favoritePlaces.length > 0 && <StyleText
                    text="Your favorite countries to visit: "
                    fontSize={FONT_SIZE.small}
                    style={{ zIndex: -1 }}

                />}
                {favoritePlaces && favoritePlaces.map(loc =>
                    <View
                        key={loc}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
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
            <View style={{ marginBottom: 400 }} />
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