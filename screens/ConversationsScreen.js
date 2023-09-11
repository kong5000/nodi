import React, { useState } from 'react'
import ConversationList from '../components/ConversationList';
import ChatScreen from './ChatScreen'
import Footer from '../components/Footer';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { COLORS } from '../style';
import { Searchbar } from 'react-native-paper';
import StyleText from '../components/StyleText';

const ConversationScreen = () => {
    const [activePartner, setActivePartner] = useState(null)
    const [activeConversation, setActiveConversation] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const onChangeSearch = (textInput) => {
        setSearchQuery(textInput)
    }
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
                        width: "80%",
                        marginBottom: "7%"
                    }}>
                        <StyleText
                            bold
                            text="Messages"
                            fontSize={34}
                            style={{ width: "100%" }}
                        />
                    </View>

                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        mode='view'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            borderRadius: 20,
                            width: '85%',
                            borderWidth: 1,
                            borderColor: COLORS.neutralGrey,
                            marginBottom: "10%"
                        }}
                        showDivider={false}
                        theme={{
                            colors: {
                                surface: 'purple',
                                // primaryContainer: 'red',
                                // primary: 'red',
                                // background: 'red'
                                // onSurfaceVariant: COLORS.halfGrey,
                            }
                        }}
                    />
                    <ConversationList setActivePartner={setActivePartner} setActiveConversation={setActiveConversation} />
                    {activePartner && <ChatScreen
                        activeConversation={activeConversation}
                        activePartner={activePartner}
                        setActivePartner={setActivePartner} />}
                </View>
            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}

export default ConversationScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
    }
})