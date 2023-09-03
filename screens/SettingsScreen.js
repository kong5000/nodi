import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Footer from '../components/Footer'
import { ToggleButton } from 'react-native-paper';
import StyleText from '../components/StyleText';
import { COLORS, FLEX_CENTERED } from '../style';
import AccountSettings from '../components/AccountSettings';
import UserSettings from '../components/UserSettings';

const BOTTOM_MARGIN = "7%"
const SettingsScreen = () => {
    const [showSaved, setShowSaved] = useState(true)
    const [settingMenu, setSettingMenu] = useState("profile")

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
                                settingMenu == "profile"
                                    ? { backgroundColor: COLORS.mainTheme }
                                    : {},
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
                                                settingMenu == "profile"
                                                    ? { color: "white" }
                                                    : { color: "black" },
                                            ]}
                                        text="Profile"
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
                                    text="Account"
                                />
                            </View>
                            }
                            value="account" >
                        </ToggleButton>
                    </ToggleButton.Row>
                    {settingMenu == 'profile' && <UserSettings />}
                    {settingMenu == 'account' && <AccountSettings />}
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
    }
})