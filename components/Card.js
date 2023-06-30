import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Ionicons from '@expo/vector-icons/Ionicons';
import { addPass, addLike } from '../services/UserQueries';
import React from 'react'
import useAuth from '../hooks/useAuth';
import getUserData from '../hooks/userData';

const Card = ({card}) => {
    return (
        <ScrollView key={card.userInfo.id} style={styles.scroll} showsVerticalScrollIndicator={false}>
            <TouchableOpacity activeOpacity={1}>
                <View style={styles.card}>
                    <View style={styles.cardImageContainer} >
                        <Image style={styles.cardImage} source={{ uri: card.userInfo.pictures[0] }} />
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 20,
                                minWidth: 100,
                                borderRadius: 20,
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{
                                fontSize: 25,

                            }}>HELLO</Text>
                        </View>
                    </View>

                    <View style={styles.cardSummary}>
                        <View style={styles.cardNameLocation}>
                            <Text style={styles.text}>{card.userInfo.name}, {card.userInfo.age}</Text>
                        </View>
                    </View>
                    <View style={styles.userDetailsContainer}>
                        <View style={styles.userDetail}>
                            <Ionicons
                                style={styles.detailIcon}
                                name="briefcase-outline" size={32} />
                        </View>
                    </View>
                    <View style={styles.travelMatches}>
                        <Text style={styles.text}>See You In</Text>
                        <View style={styles.cityMatches}>
                            {card.seeYouIn && card.seeYouIn.map((city) =>
                                <View key={city} style={styles.city}>
                                    <Text style={styles.cityText}>{city}</Text>
                                </View>
                            )}

                        </View>
                    </View>
                    <View style={styles.travelMatches}>
                        <Text style={styles.text}>Missed You In</Text>
                        <View style={styles.cityMatches}>
                            {card.missedYouIn && card.missedYouIn.map((city) =>
                                <View key={city} style={styles.city}>
                                    <Text style={styles.cityText}>{city}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Card

const styles = StyleSheet.create({
    detailIcon: {
        padding: 10
    },
    userDetailsContainer: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 8,
        width: '90%',
        margin: 10
    },
    userDetail: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    city: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 8,
        margin: 10,
    },
    cityText: {
        fontSize: 20,
        padding: 5
    },
    travelMatches: {
        display: 'flex',
        flexDirection: 'column',
        width: '95%'
    },
    cityMatches: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    cardSummary: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: 15
    },
    cardNameLocation: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    scroll: {
        height: 1000,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    headerProfile: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    cardStack: {
        display: 'flex',
    },
    screen: {
        flex: 1
    },
    container: {
    },
    card: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white",
    },
    text: {
        textAlign: "center",
        fontSize: 30,
        backgroundColor: "transparent"
    },
    cardSmallText: {
        textAlign: "center",
        fontSize: 20,
        backgroundColor: "transparent",
        marginTop: 2
    },
    cardImageContainer:{
        width: "100%",
        display: 'flex',
        alignItems: 'center'
    },
    cardImage: {
        height: 450,
        width: "100%",
        resizeMode: 'stretch',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})