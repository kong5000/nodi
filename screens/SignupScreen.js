import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfilePicture from '../components/ProfilePicture'
import StyleText from '../components/StyleText'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API_KEY } from "@env"
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');
import { COLORS, FLEX_CENTERED, FONT_SIZE, SIZES, TEXT_STYLES } from '../style'
import { TextInput } from 'react-native-paper'
import CustomButton from '../components/CustomButton';
import LocationSearch from '../components/LocationSearch';
import AddLocation from '../components/AddLocation';
import CountryFlag from "react-native-country-flag";
import { COUNTRY_ISO_MAP } from '../data';

const SignupScreen = () => {
    const [step, setStep] = useState(2)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [intro, setIntro] = useState("")
    const [occupation, setOccupation] = useState("")
    const [education, setEducation] = useState("")
    const [futureLocations, setFutureLocations] = useState([])
    const [futureLocationsHasItems, setFutureLocationsHasItems] = useState(false)
    const stepBack = () => {
        if (step > 0) {
            setStep(prev => prev - 1)
        }
    }
    useEffect(() => {
        if (futureLocations.length > 0) {
            setFutureLocationsHasItems(true)
        } else {
            setFutureLocationsHasItems(false)
        }
    }, [futureLocations])

    const onContinue = () => {
        // Form validation
        // Error messages
        setStep(prev => prev + 1)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
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
                    <ProfilePicture />

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
                            style={TEXT_STYLES.textInput}
                            outlineStyle={TEXT_STYLES.textInputOutline}
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
                            style={TEXT_STYLES.textInput}
                            outlineStyle={TEXT_STYLES.textInputOutline}
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                        />
                        <CustomButton
                            label={"Date of birth"}
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
                    </View>
                </View>
            }
            <View style={{
                position: 'absolute',
                width: '80%',
                bottom: SIZES.footerHeight

            }}>
                <CustomButton
                    onPress={onContinue}
                    label={"Continue"}
                />
            </View>
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
                            text="Where did you study?"
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
                                    console.log(COUNTRY_ISO_MAP["Afghanistan"])

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
                                if (!futureLocations.find((location => location.name == newLocation.name))) {
                                    // setFutureLocations(prev => [...prev, {name: newLocation, iso: COUNTRY_ISO_MAP[newLocation]}])
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
            {
                step == 4 && <View style={{ width: "80%", display: 'flex' }}>
                    <StyleText
                        text="Write your intro"
                        fontSize={FONT_SIZE.title}
                        bold
                        style={{ marginBottom: "5%" }}
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