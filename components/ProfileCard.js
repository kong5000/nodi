import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import { Image } from "react-native-expo-image-cache";
import { calculateAge } from '../services/Utils';
import * as style from '../style';
import NextDestinations from './NextDestinations';
import UserDetail from './UserDetail';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'

import {
    Animated,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { COLORS, FONT_SIZE } from '../style';
import InstagramPhotos from './InstagramPhotos';
import InterestsProfile from './InterestsProfile';
import Profile from './Profile';
import StyleText from './StyleText';
import getUserData from '../hooks/userData';
const { width, height } = Dimensions.get('window');

const ProfileCard = ({ item, showConnectModal, instagramImages, instagramHandle, setImagesLoaded, setCurrentImage, refsArray, viewMode }) => {
    const { userData, conversations, setActiveChat, currentProfile } = getUserData()
    const navigation = useNavigation()

    return (
        <View style={styles.item}>
            {/* Image below just for caching for quick loading in modal */}
            <Image style={{ height: 0, width: 0 }} uri={item.picture} />

            <Animated.View
                style={
                    { flex: 1, backgroundColor: 'transparent' }
                }
            >
                <Animated.Image
                    onLoadEnd={() => {
                        if(!viewMode){
                            setImagesLoaded(prev => prev + 1)
                        }
                    }}
                    source={{ uri: item.picture }}
                    style={[
                        styles.image,
                    ]}
                />
                <ScrollView
                    contentContainerStyle={{
                        width: width,
                        paddingBottom: "10%"
                    }}
                    showsVerticalScrollIndicator={false}
                    ref={(element) => refsArray.current.push(element)}
                    overScrollMode='never'
                    bounces={false}>
                    <View style={styles.slider} />
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={{
                                ...style.FLEX_CENTERED,
                                height: 90,
                                width: 90,
                                borderRadius: 100,
                                backgroundColor: COLORS.mainTheme,
                                position: 'relative',
                                top: 40,
                                left: width - width / 3,
                                zIndex: 10,
                            }}
                            onPress={() => {
                                if (viewMode ) {
                                    if(currentProfile.id != userData.id){
                                        const chatId = [userData.id, currentProfile.id].sort().join('')
                                        const activeChat = conversations.find(conv => conv.id == chatId)
                                        setActiveChat(activeChat)
                                        navigation.navigate('Chat')
                                    }
                                } else {
                                    setCurrentImage(item.picture)
                                    showConnectModal()
                                }

                            }}
                        >
                            {!viewMode && <Ionicons
                                name="paper-plane-outline"
                                size={45} color="white"
                            />}
                            {viewMode && <Ionicons
                                name="chatbox-ellipses-outline"
                                size={45} color="white"
                            />}

                        </TouchableOpacity>
                        <View style={{
                            flex: 1,
                            backgroundColor: "white",
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40
                        }}>
                            <View style={{
                                width: "63%",
                                marginLeft: "10%",
                                marginTop: "10%",
                            }}>
                                <StyleText
                                    text={`${item.name}, ${calculateAge(item.birthDate)}`}
                                    semiBold
                                    fontSize={FONT_SIZE.profileName}
                                />
                            </View>
                            <View style={{
                                display: 'flex',
                                alignItems: 'left',
                                marginLeft: '10%',
                                marginTop: '2%',
                            }}>
                                {item.home && <UserDetail
                                    icon="person-outline"
                                    text={item.home}
                                />}
                                {item.occupation && <UserDetail
                                    icon="person-outline"
                                    text={item.occupation}
                                />}
                                {item.education && <UserDetail
                                    icon="person-outline"
                                    text={item.education}
                                />}
                            </View>

                            <View style={{
                                marginLeft: '10%',
                                marginTop: '10%',
                            }}>
                                <StyleText
                                    text='About'
                                    bold
                                    fontSize={22}
                                    style={{ marginBottom: "3%" }}
                                />
                                <Profile />
                            </View>
                            <View
                                style={{
                                    marginLeft: '10%',
                                    marginTop: '10%',
                                }}
                            >
                                <StyleText
                                    text='Interests'
                                    bold
                                    fontSize={22}
                                    style={{ marginBottom: "3%" }}
                                />
                                <InterestsProfile interests={item.interests} />
                            </View>

                            <View
                                style={{
                                    marginLeft: '10%',
                                    marginTop: '10%',
                                }}
                            >
                                <StyleText
                                    text='Going To'
                                    bold
                                    fontSize={22}
                                    style={{ marginBottom: "3%" }}
                                />
                                <NextDestinations
                                    destinations={["🇵🇭 Philippines", "🇯🇵 Japan"]}
                                />
                                <StyleText
                                    text='Favorite Destinations'
                                    bold
                                    fontSize={22}
                                    style={{ marginTop: "10%", marginBottom: "3%" }}
                                />
                                <NextDestinations
                                    destinations={["🇵🇭 Philippines", "🇯🇵 Japan"]}
                                />
                            </View>
                            <View style={{ marginHorizontal: "10%" }}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: '10%'
                                }}>
                                    <StyleText
                                        text={"Instagram"}
                                        bold
                                        fontSize={22}
                                    />
                                    <StyleText
                                        text={`@${instagramHandle}`}
                                        fontSize={20}
                                        style={{
                                            color: COLORS.mainTheme
                                        }}
                                    />
                                </View>
                                <InstagramPhotos
                                    images={instagramImages}
                                    handle={instagramHandle}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Animated.View>
        </View>
    )
}

export default ProfileCard


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    slider: {
        height: height * 0.45,
        // borderBottomEndRadius: 55
    },
    footer: {
        flex: 1,
        // height: height * 1.5,
        position: 'relative',
        top: -40
    },
    screen: {
        flex: 1,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width,
        height,
        // backgroundColor: 'red'
    },
    image: {
        width: width,
        height: height / 2 + height / 10,
        resizeMode: 'cover',
        position: 'absolute',
        top: 0
        // borderTopLeftRadius: 50
    },
});