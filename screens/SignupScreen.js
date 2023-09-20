import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ProfilePicture from '../components/ProfilePicture'
import StyleText from '../components/StyleText'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from '@expo/vector-icons';

import { COLORS, SIZES, TEXT_STYLES } from '../style'
import { Button, TextInput } from 'react-native-paper'
import CustomButton from '../components/CustomButton';
const SignupScreen = () => {
    const [step, setStep] = useState(0)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
    return (
        <SafeAreaView style={styles.screen}>
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
                    label={"Next"}
                />
            </View>
        </SafeAreaView>
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