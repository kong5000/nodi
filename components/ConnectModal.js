import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native'
import { Modal, Portal, TextInput } from 'react-native-paper';
import { Image } from "react-native-expo-image-cache";
import Ionicons from '@expo/vector-icons/Ionicons';

import React, { useEffect } from 'react'
import StyleText from './StyleText';
import Connect from './Connect';
import { COLORS, FLEX_CENTERED } from '../style';
import { calculateAge } from '../services/Utils';
const { width, height } = Dimensions.get('window');

const ConnectModal = ({ visible, hideModal, currentProfile, imageUri }) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.containerStyle}
            >
                {currentProfile && <View style={{
                    ...FLEX_CENTERED,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: "100%"
                }}>
                    <StyleText
                        style={{ fontSize: 30, marginLeft: "5%" }}
                        semiBold
                        text={currentProfile.name + ',' + calculateAge(currentProfile.birthDate)}
                    />
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: COLORS.neutralGrey,
                            marginRight: "5%",
                            padding: "1%"
                        }}
                        onPress={hideModal}
                    >
                        <Ionicons
                            name="close-outline"
                            size={40}
                            color={COLORS.mainTheme}
                        />
                    </TouchableOpacity>
                </View>}

                <Image
                    style={styles.image}
                    uri={imageUri}
                />
                <TextInput
                    activeOutlineColor='black'
                    placeholder='Send a message'
                    mode='outlined'
                    style={{
                        color: 'black',
                        width: "85%",
                        height: 55,
                        backgroundColor: 'white',
                    }}
                    outlineStyle={{
                        borderColor: COLORS.neutralGrey,
                        borderRadius: 15
                    }}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.mainTheme,
                        width: "85%",
                        padding: "5%",
                        margin: "5%",
                        borderRadius: 15,
                        ...FLEX_CENTERED
                    }}
                >
                    <StyleText
                        text="Send"
                        style={{ color: "white" }}
                        fontSize={25}
                        semiBold
                    />
                </TouchableOpacity>
            </Modal>
        </Portal>
    )
}

export default ConnectModal
const styles = StyleSheet.create({
    containerStyle: {
        display: 'flex',
        backgroundColor: 'white',
        // height: 250,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 30,
        margin: "5%",
        paddingTop: "5%"
    },
    image: {
        width: width * 0.80,
        height: width * 0.80,
        resizeMode: 'cover',
        borderRadius: 20,
        marginVertical: "5%",
        // borderTopLeftRadius: 50
    },
})