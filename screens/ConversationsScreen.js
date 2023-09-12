import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import ConversationList from '../components/ConversationList';
import Footer from '../components/Footer';
import StyleText from '../components/StyleText';
import { COLORS } from '../style';

const ConversationScreen = () => {
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
                            }
                        }}
                    />
                    <ConversationList />
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