import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import AccountSettings from '../components/AccountSettings';
import StyleText from '../components/StyleText';
import UserSettings from '../components/UserSettings';
import { COLORS, FLEX_CENTERED } from '../style';

const BOTTOM_MARGIN = "7%"
const SettingsScreen = () => {
    const [showSaved, setShowSaved] = useState(false)
    const [settingMenu, setSettingMenu] = useState("profile")

    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

    const handleScroll = (event) => {
        const { x, y } = event.nativeEvent.contentOffset;
        setScrollPosition({ x, y });
    };

    const scrollViewRef = useRef()

    const scrollTo = (coordinates) => {
        scrollViewRef.current.scrollTo({ y: scrollPosition.y - 200 + coordinates.y })
    }

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView ref={scrollViewRef} onScroll={handleScroll} scrollEventThrottle={5}>
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
                    {settingMenu == 'profile' && <UserSettings setShowSaved={setShowSaved} scrollTo={scrollTo} />}
                    {settingMenu == 'account' && <AccountSettings />}
                </View>
            </ScrollView>
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