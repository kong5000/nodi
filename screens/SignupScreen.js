import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import CountryFlag from "react-native-country-flag";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput, HelperText } from 'react-native-paper';
import AddLocation from '../components/AddLocation';
import CustomButton from '../components/CustomButton';
import LocationSearch from '../components/LocationSearch';
import ProfilePicture from '../components/ProfilePicture';
import StyleText from '../components/StyleText';
import { COLORS, FLEX_CENTERED, FONT_SIZE, SIZES, TEXT_STYLES } from '../style';
import Interests from '../components/Interests';
const { width, height } = Dimensions.get('window');
import Footer from '../components/Footer'
import moment from 'moment';
import { updateUserDoc } from '../services/UserQueries';
import getUserData from '../hooks/userData';
import { Timestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
    const [step, setStep] = useState(0)
    const { userData } = getUserData()
    // Step 0

    const [profilePicture, setProfilePicture] = useState("")
    const [profilePictureError, setProfilePictureError] = useState("")

    const updatePicture = pictureUrl => {
        setProfilePictureError(false)
        setProfilePicture(pictureUrl)
    }

    const [firstName, setFirstName] = useState("")
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastName, setLastName] = useState("")
    const [lastNameError, setLastNameError] = useState(false)
    const [birthDate, setBirthDate] = useState("")
    const [birthDateError, setBirthDateError] = useState("")

    // Step 1
    const [home, setHome] = useState("")
    const [occupation, setOccupation] = useState("")
    const [education, setEducation] = useState("")

    // Step 2
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [intro, setIntro] = useState("")

    const [futureLocations, setFutureLocations] = useState([])
    const [favoriteLocations, setFavoriteLocations] = useState([])

    const [interests, setInterests] = useState("")
    const navigation = useNavigation()

    // useEffect(() => {
    //     console.log("profilePicture", profilePicture)
    //     console.log("lastName", lastName)
    //     console.log("firstName", firstName)

    //     console.log("location", location)
    //     console.log("occupation", occupation)
    //     console.log("education", education)

    //     console.log("favoriteLocations", favoriteLocations)
    //     console.log("futureLocations", futureLocations)

    //     console.log("intro", intro)

    //     console.log("interests", interests)
    //     console.log("date", birthDate)

    // }, [profilePicture, favoriteLocations, futureLocations, education, occupation, intro, lastName,
    //     firstName, location, interests, birthDate])


    const hasInputErrors = () => {
        console.log(step)
        let hasErrors = false
        if (step == 0) {
            console.log(!firstName)
            if (!firstName) {
                setFirstNameError(true)
                hasErrors = true
            }
            if (!lastName) {
                setLastNameError(true)
                hasErrors = true
            }
            if (!birthDate) {
                setBirthDateError("Select a birth date")
                hasErrors = true
            }
            const age = moment().diff(birthDate, 'years');

            if (age < 18) {
                setBirthDateError("Must be at least 18")
                hasErrors = true
            }
            if (!profilePicture) {
                setProfilePictureError(true)
                hasErrors = true
            }
        }
        return hasErrors
    }


    const stepBack = () => {
        if (step > 0) {
            setStep(prev => prev - 1)
        }
    }

    const onContinue = () => {
        // Form validation
        // Error messages
        if (!hasInputErrors()) {
            setStep(prev => prev + 1)
        }
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }

    const handleConfirm = (date) => {
        console.log(moment().diff(date, 'years'))
        if (moment().diff(date, 'years') < 18) {
            setBirthDateError("Must be over 18")
        } else {
            setBirthDateError("")
        }
        setBirthDate(moment(date).format('YYYY-MM-DD'))
        hideDatePicker();
    };

    useEffect(() => {
        if (step > 5) {
            const updateUserInfo = async () => {
                await updateUserDoc(userData.id, {
                    birthDate,
                    education,
                    favoriteLocations,
                    futureLocations,
                    home,
                    interests,
                    lastActive: Timestamp.now(),
                    lastName: lastName,
                    name: firstName,
                    occupation,
                    picture: profilePicture,
                    intro
                })
                navigation.navigate("Home")
            }
            updateUserInfo()
        }
    }, [step])


    return (
        <SafeAreaView style={styles.screen}>
            {step != 0 && <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
                marginBottom: "10%"

            }}>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        ...FLEX_CENTERED,
                        height: 50,
                        width: 50,
                        borderRadius: 12.5,
                        borderColor: COLORS.mainTheme
                    }}
                    onPress={stepBack}
                >
                    <Ionicons name="chevron-back" size={24} color={COLORS.mainTheme} />
                </TouchableOpacity>
                <CustomButton
                    label="Skip"
                    style={{ paddingHorizontal: 40 }}
                    onPress={() => setStep(prev => prev + 1)}
                />
            </View>}
            {step == 0 &&
                <View style={{ marginTop: "5%", width: "100%" }}>
                    <StyleText
                        bold
                        text="Profile Details"
                        fontSize={34}
                        style={{
                            marginBottom: "25%",
                            marginHorizontal: "10%"
                        }}
                    />
                    <View style={{
                        ...FLEX_CENTERED
                    }}>
                        <ProfilePicture
                            setProfilePicture={updatePicture}
                        />
                        <HelperText
                            style={{
                                marginBottom: 15,
                                // fontSize: 10
                            }}
                            type='error'
                            visible={profilePictureError}
                            theme={{ colors: { error: 'red' } }}
                        >
                            Profile PICTURE ERROR
                        </HelperText>
                    </View>
                    <View style={{
                        marginHorizontal: "10%"

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
                            style={{ ...TEXT_STYLES.textInput, marginBottom: 0 }}
                            outlineStyle={TEXT_STYLES.textInputOutline}
                            value={firstName}
                            onChangeText={text => {
                                setFirstName(text)
                                setFirstNameError(false)
                            }}
                        />
                        <HelperText
                            style={{
                                marginBottom: 15
                            }}
                            type='error'
                            visible={firstNameError}
                            theme={{ colors: { error: 'red' } }}
                        >
                            FIRST NAME ERROR
                        </HelperText>
                        <TextInput
                            theme={{
                                colors: {
                                    onSurfaceVariant: COLORS.halfGrey,
                                }
                            }}
                            label='Last Name'
                            activeOutlineColor='black'
                            mode='outlined'
                            style={TEXT_STYLES.textInput}
                            outlineStyle={TEXT_STYLES.textInputOutline}
                            value={lastName}
                            onChangeText={text => {
                                setLastName(text)
                                setLastNameError(false)
                            }}
                        />
                        <HelperText
                            style={{
                                marginBottom: 15
                            }}
                            type='error'
                            visible={lastNameError}
                            theme={{ colors: { error: 'red' } }}
                        >
                            LAST NAME ERROR
                        </HelperText>
                        <CustomButton
                            onPress={showDatePicker}

                            label={birthDate ? moment(birthDate).format('YYYY-MM-DD') : "Date of birth"}
                            style={{
                                width: "100%",
                                backgroundColor: COLORS.lightBlue
                            }}
                            textColor={COLORS.darkBlue}
                            icon={<FontAwesome name="calendar-o" size={24} color={COLORS.darkBlue} />}
                        />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}

                        />
                        <HelperText
                            style={{
                                marginBottom: 15,
                                // fontSize: 10
                            }}
                            type='error'
                            visible={birthDateError}
                            theme={{ colors: { error: 'red' } }}
                        >
                            {birthDateError}
                        </HelperText>
                    </View>
                </View>
            }
            {step < 6 && <View style={{
                position: 'absolute',
                width: '80%',
                bottom: SIZES.footerHeight

            }}>
                <CustomButton
                    onPress={onContinue}
                    label={"Continue"}
                />
            </View>}
            {step == 1 &&
                <View style={{ width: "80%", display: 'flex' }}>
                    <View
                        style={{
                            display: 'flex',
                            // justifyContent: 'center',
                            marginBottom: "15%"
                        }}
                    >
                        <StyleText
                            bold
                            text="Optional details"
                            fontSize={34}
                            style={{ marginBottom: 12 }}
                        />
                        <StyleText
                            fontSize={20}
                            text="Prompt here, tell us about yourself etc..."
                        />
                    </View>
                    <View style={{
                        width: "100%",
                    }}>
                        <StyleText
                            text="What's your hometown?"
                            fontSize={FONT_SIZE.title}
                            bold
                            style={{ marginBottom: "5%" }}
                        />
                    </View>
                    <LocationSearch
                        setLocation={setHome}
                        showIcon
                        placeholder="Search City"
                    />
                    <View style={{
                        width: "100%",
                    }}>
                        <StyleText
                            text="What do you do?"
                            fontSize={FONT_SIZE.title}
                            bold
                            style={{ marginBottom: "5%" }}
                        />
                    </View>
                    <TextInput
                        theme={{
                            colors: {
                                onSurfaceVariant: COLORS.halfGrey,
                            }
                        }}
                        label='Occupation'
                        activeOutlineColor='black'
                        mode='outlined'
                        style={TEXT_STYLES.textInput}
                        outlineStyle={TEXT_STYLES.textInputOutline}
                        value={occupation}
                        onChangeText={text => setOccupation(text)}
                    />
                    <View style={{
                        width: "100%",
                        marginTop: "10%"
                    }}>
                        <StyleText
                            text="Education or Training"
                            fontSize={FONT_SIZE.title}
                            bold
                            style={{ marginBottom: "5%" }}
                        />
                    </View>
                    <TextInput
                        theme={{
                            colors: {
                                onSurfaceVariant: COLORS.halfGrey,
                            }
                        }}
                        label='Institution or degree'
                        activeOutlineColor='black'
                        mode='outlined'
                        style={TEXT_STYLES.textInput}
                        outlineStyle={TEXT_STYLES.textInputOutline}
                        value={education}
                        onChangeText={text => setEducation(text)}
                    />
                </View>
            }
            {step == 2 &&
                <View style={{ width: "80%", display: 'flex' }}>
                    <StyleText text="Next Stops"
                        bold
                        fontSize={34} />
                    <StyleText
                        text="Share which countries you're headed to next"
                        fontSize={22}
                        style={{ marginBottom: "10%" }}
                    />
                    <View style={{ marginBottom: "10%" }}>
                        <AddLocation
                            onAdd={(newLocation) => {
                                if (!futureLocations.find((location => location.name == newLocation.name))) {
                                    setFutureLocations(prev => [...prev, newLocation])
                                }
                            }}
                        />
                    </View>
                    {futureLocations.length > 0 && <StyleText
                        text="Your next destinations: "
                        fontSize={22}
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
                                padding: 20,
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <CountryFlag isoCode={loc.iso} size={30}
                                        style={{ borderRadius: 2, marginRight: 10 }} />
                                    <StyleText
                                        fontSize={20}
                                        text={loc.name} />
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setFutureLocations(prev => prev.filter((location) => location.name != loc.name))
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
            }
            {step == 3 &&
                <View style={{ width: "80%", display: 'flex' }}>
                    <StyleText text="Favorite Destinations"
                        bold
                        fontSize={34} />
                    <StyleText
                        text="Share your favorite countries to visit"
                        fontSize={22}
                        style={{ marginBottom: "10%" }}
                    />
                    <View style={{ marginBottom: "10%" }}>
                        <AddLocation
                            onAdd={(newLocation) => {
                                if (!favoriteLocations.find((location => location.name == newLocation.name))) {
                                    setFavoriteLocations(prev => [...prev, newLocation])
                                }
                            }}
                        />
                    </View>
                    {favoriteLocations.length > 0 && <StyleText
                        text="Your favorite countries to visit: "
                        fontSize={22}
                        style={{ zIndex: -1 }}

                    />}
                    {favoriteLocations && favoriteLocations.map(loc =>
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
                                padding: 20,
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <CountryFlag isoCode={loc.iso} size={30}
                                        style={{ borderRadius: 2, marginRight: 10 }} />
                                    <StyleText
                                        fontSize={20}
                                        text={loc.name} />
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setFavoriteLocations(prev => prev.filter((location) => location.name != loc.name))
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
            }
            {
                step == 4 && <View style={{ width: "80%", display: 'flex' }}>
                    <StyleText
                        text="Write your intro"
                        fontSize={34}
                        bold
                        style={{ marginBottom: "5%" }}
                    />
                    <StyleText
                        text="Prompt for users to write stuff about themselves"
                        fontSize={22}
                        style={{ marginBottom: "10%" }}
                    />
                    <View style={{ width: "100%", display: 'flex', alignItems: 'center' }}>
                        <TextInput
                            multiline
                            activeOutlineColor='black'
                            style={{
                                width: "100%",
                                height: 200,
                                marginBottom: "7.5%",
                                fontWeight: '700'

                            }}
                            outlineStyle={TEXT_STYLES.textInputOutline}
                            mode='outlined'
                            value={intro}
                            onChangeText={text => setIntro(text)}
                        />
                    </View>

                </View>
            }
            {
                step == 5 && <View style={{ width: "80%", display: 'flex' }}>
                    <StyleText
                        text="Interests"
                        fontSize={34}
                        bold
                        style={{ marginBottom: "5%" }}
                    />
                    <StyleText
                        text="Prompt user to share activities they enjoy"
                        fontSize={22}
                        style={{ marginBottom: "10%" }}
                    />
                    <View style={{
                        minWidth: width
                    }}>
                        <Interests interests={interests} setInterests={setInterests} />
                    </View>
                </View>
            }
            {
                step == 6 && <View style={{
                    display: 'flex',
                    height: "75%",
                    ...FLEX_CENTERED
                }}>
                    <StyleText
                        text="Creating your profile"
                        bold
                        fontSize={34}
                        style={{
                            flex: 1
                        }}
                    />
                    <View style={{
                        flex: 1
                    }}>
                        <ActivityIndicator size="large" color={COLORS.mainTheme} />
                    </View>
                </View>
            }
            {step > 5 && <Footer />}
        </SafeAreaView >
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
        display: 'flex',
        alignItems: 'center',
    },
})