import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, FONT_SIZE } from '../style';
import StyleText from './StyleText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { getSetting, storeSetting } from '../services/LocalStorage';
import CustomToggleButton from './CustomToggleButton';
import * as Notifications from 'expo-notifications';
import { getAuth, signOut } from 'firebase/auth';

import getUserData from '../hooks/userData';
import CustomButton from './CustomButton';
import StyledButton from './StyledButton';
const notifications = [
    {
        text: "Enable",
        icon:
            <Ionicons
                name="paper-plane-outline" size={24}
                color={COLORS.mainTheme}
                style={{ marginRight: '10%' }}
            />
    }
    // {
    //     text: "Requests",
    //     icon:
    //         <Ionicons
    //             name="paper-plane-outline" size={24}
    //             color={COLORS.mainTheme}
    //             style={{ marginRight: '10%' }}
    //         />
    // },
    // {
    //     text: "Messages",
    //     icon:
    //         <Ionicons
    //             name="chatbubbles" size={24}
    //             color={COLORS.mainTheme}
    //             style={{ marginRight: '10%' }}
    //         />
    // },
    // {
    //     text: "Updates",
    //     icon:
    //         <MaterialIcons
    //             name="system-update" size={24}
    //             color={COLORS.mainTheme}
    //             style={{ marginRight: '10%' }}
    //         />
    // },
]

const accountActions = [
    {
        text: "Deactivate",
        icon:
            <MaterialCommunityIcons
                name="sleep"
                size={24}
                color={COLORS.mainTheme}
                style={{ marginRight: '10%' }}
            />
    },
    {
        text: "Delete",
        icon:
            <MaterialIcons
                name="delete" size={24}
                color={COLORS.mainTheme}
                style={{ marginRight: '10%' }}
            />
    },
    {
        text: "Logout",
        icon:
            <MaterialCommunityIcons
                name="logout"
                size={24}
                color={COLORS.mainTheme}
                style={{ marginRight: '10%' }}
            />
    },
]


const AccountSettings = () => {
    const [notifcationsEnabled, setNotificationsEnabled] = useState(true)
    const { userData } = getUserData()
    const auth = getAuth()

    useEffect(() => {
        const setNotifications = async () => {
            // Only one global notifcation setting for now
            if (notifcationsEnabled) {
                storeSetting('notifcations_enabled', "true")
                await updateUserDoc(userData.id, {
                    notifcationsEnabled: true
                })
                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true,
                        shouldPlaySound: false,
                        shouldSetBadge: false,
                    }),
                });
            } else {
                storeSetting('notifcations_enabled', "false")
                await updateUserDoc(userData.id, {
                    notifcationsEnabled: false
                })
                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: false,
                        shouldPlaySound: false,
                        shouldSetBadge: false,
                    }),
                });
            }
        }
        setNotifications()
    }, [notifcationsEnabled])

    useEffect(() => {
        const initializeSettings = async () => {
            let notificationsEnabled = await getSetting('notifcations_enabled')
            if (notificationsEnabled == "true") {
                setNotificationsEnabled(true)
            } else {
                setNotificationsEnabled(false)
            }
        }
        initializeSettings
    }, [])

    return (
        <View style={{
            // backgroundColor:'red',
        }}>
            <StyleText
                text="Notifications"
                fontSize={FONT_SIZE.title}
                bold
                style={{
                    width: "85%",
                    marginTop: "5%"
                }}
            />
            <StyleText
                text="Enable or disable notifications"
                fontSize={FONT_SIZE.small}
                style={{
                    width: "84%",
                    marginBottom: "2.5%",
                }}
            />
            <View style={styles.container}>
                <CustomToggleButton
                    enabled={notifcationsEnabled}
                    setEnabled={setNotificationsEnabled}
                    icon={
                        <Ionicons
                            name="paper-plane-outline" size={24}
                            color={COLORS.mainTheme}
                            style={{ marginRight: '10%' }}
                        />
                    }
                    text={notifcationsEnabled ? "Enabled" : "Disabled"}
                />
            </View>
            <StyleText
                text="Account"
                fontSize={FONT_SIZE.title}
                bold
                style={{
                    width: "85%",
                    marginTop: "7.5%"
                }}
            />
            <StyleText
                text="Deactivate your account or signout"
                fontSize={FONT_SIZE.small}
                style={{
                    width: "84%",
                    marginBottom: "2.5%",
                }}
            />
            <View style={styles.container}>
                <StyledButton
                    icon={
                        <MaterialCommunityIcons
                            name="sleep"
                            size={24}
                            color={COLORS.mainTheme}
                            style={{ marginRight: '10%' }}
                        />
                    }
                    text="Deactivate"
                />
                <StyledButton
                    onPress={() => {
                        signOut(auth)
                            .then()
                            .catch((err) => console.log(err))
                    }}
                    icon={
                        <MaterialCommunityIcons
                            name="logout"
                            size={24}
                            color={COLORS.mainTheme}
                            style={{ marginRight: '10%' }}
                        />
                    }
                    text="Logout"
                />
                <StyledButton
                    icon={
                        <MaterialIcons
                            name="delete" size={24}
                            color={COLORS.mainTheme}
                            style={{ marginRight: '10%' }}
                        />
                    }
                    text="Delete"
                />

            </View>
        </View>
    )
}

export default AccountSettings

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '82%',
        flexDirection: 'row',
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