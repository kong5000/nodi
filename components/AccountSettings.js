import React, { useState } from 'react';
import { Dimensions, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { BUTTON_STYLE, COLORS, FONT_SIZE } from '../style';
import StyleText from './StyleText';
import SettingsButtonsGroup from './SettingsButtonsGroup';
const { width, height } = Dimensions.get('window');
const BOTTOM_MARGIN = "7%"
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const notifications = [
    {
        text: "Requests",
        icon:
            <Ionicons
                name="paper-plane-outline" size={24}
                color={COLORS.mainTheme}
                style={{ marginRight: '10%' }}
            />
    },
    {
        text: "Messages",
        icon:
            <Ionicons
                name="chatbubbles" size={24}
                color={COLORS.mainTheme}
                style={{ marginRight: '10%' }}
            />
    },
    {
        text: "Updates",
        icon:
            <MaterialIcons
                name="system-update" size={24}
                color={COLORS.mainTheme}
                style={{ marginRight: '10%' }}
            />
    },
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
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [activeNotifications, setActiveNotifications] = useState([])
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
                <SettingsButtonsGroup
                    activeButtons={activeNotifications}
                    setActiveButtons={setActiveNotifications}
                    list={notifications}
                />
            </View>
            <StyleText
                text="Authentication"
                fontSize={FONT_SIZE.title}
                bold
                style={{
                    width: "85%",
                    marginTop: "7.5%"
                }}
            />
            <StyleText
                text="Change your email or password"
                fontSize={FONT_SIZE.small}
                style={{
                    width: "84%",
                    marginBottom: "2.5%",
                }}
            />
            <TextInput
                theme={{
                    colors: {
                        onSurfaceVariant: COLORS.halfGrey,
                    }
                }}
                label='Email'
                activeOutlineColor='black'
                mode='outlined'
                style={styles.textInput}
                outlineStyle={styles.textInputOutline}
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <TouchableOpacity style={{
                ...BUTTON_STYLE.button,
                ...BUTTON_STYLE.disabledButton,
                width: "100%",
                marginHorizontal: 0,
                marginTop: 0
            }}>
                <FontAwesome5
                    name="lock"
                    size={FONT_SIZE.title}
                    color={COLORS.mainTheme}
                    style={{
                        marginRight: '3%'
                    }}
                />
                <StyleText
                    text="Change Password"
                    fontSize={FONT_SIZE.small}
                />
            </TouchableOpacity>
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
                <SettingsButtonsGroup
                    activeButtons={activeNotifications}
                    setActiveButtons={setActiveNotifications}
                    list={accountActions}
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