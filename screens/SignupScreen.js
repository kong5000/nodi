import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
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
const SignupScreen = () => {
    const [step, setStep] = useState(0)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [intro, setIntro] = useState("")
    const [occupation, setOccupation] = useState("")
    const [education, setEducation] = useState("")

    const stepBack = () => {
        if (step > 0) {
            setStep(prev => prev - 1)
        }
    }

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
                            text="About you"
                            fontSize={34}
                            style={{ marginBottom: 12 }}
                        />
                        <StyleText
                            fontSize={20}
                            text="Prompt to write about yourself here"
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

                    <View style={{
                        borderWidth: 1,
                        borderColor: COLORS.halfGrey,
                        height: 55,
                        // minWidth: '80%',
                        // maxWidth: '80%',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: "15%",
                        borderRadius: 10,
                        padding: 10,
                    }}>
                        <Ionicons name="search-outline" size={26} color={COLORS.mainTheme} style={{
                            zIndex: 1,

                        }} />
                        <GooglePlacesAutocomplete
                            // placeholder='Enter your placeholder text here'
                            placeholder='Search City'
                            textInputProps={{
                                placeholderTextColor: COLORS.halfGrey,
                            
                            }}
                            enablePoweredByContainer={false}
                            // autoFillOnNotFound={true}
                            styles={{
                                container: {
                                    borderColor: 'purple'
                                },
                                textInput: {
                                    // ...TEXT_STYLES.searchBarInput
                                },
                                listView: {
                                    position: 'absolute',
                                    left: -37,
                                    width: width * 0.8,
                                    zIndex: 2,
                                    top: 60,
                                    borderWidth: 1,

                                },
                                row: {

                                },
                                description: {
                                    backgroundColor: 'red'
                                    // ...TEXT_STYLES.searchBarText
                                },
                            }}
                            renderRow={(data, index) =>
                                <View style={{
                                }}>
                                    <StyleText
                                        text={data.description}
                                    />
                                </View>
                            }
                            listEmptyComponent={
                                <TouchableOpacity
                                    onPress={() => alert("Request location/event to be implemented")}
                                >
                                    <Text style={TEXT_STYLES.searchBarText}>Couldn't find it?</Text>
                                </TouchableOpacity>}
                            // height={200}
                            listViewDisplayed={false}
                            onPress={(data, details = null) => {
                                // setHideDates(false)
                                // setLocation(data.description)
                                // setSearchVisible(false)
                                // ref.current.setAddressText(data.description)
                                // updateDestination(data.description)
                            }}
                            query={{
                                key: PLACES_API_KEY,
                                language: 'en',
                                types: '(cities)'
                            }}
                            onFail={error => console.error(error)}
                            debounce={100}
                            fetchDetails={false}
                        />
                    </View>
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
            {step == 2 &&
                <View>
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
                    <TextInput
                        theme={{
                            colors: {
                                onSurfaceVariant: COLORS.halfGrey,
                            }
                        }}
                        label='Education (Institution)'
                        activeOutlineColor='black'
                        mode='outlined'
                        style={TEXT_STYLES.textInput}
                        outlineStyle={TEXT_STYLES.textInputOutline}
                        value={education}
                        onChangeText={text => setEducation(text)}
                    />
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