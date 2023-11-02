import {
    StyleSheet, View,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { getCards } from '../services/Utils'
import ParallaxCarousel from '../components/ParallaxCarousel'
import getUserData from '../hooks/userData'
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { getSetting, storeSetting } from '../services/LocalStorage'
import { updateUserDoc } from '../services/UserQueries'
import { getGeoHash } from '../services/GeoQueries'
import StyleText from '../components/StyleText'

const HomeScreen = () => {
    const [token, setToken] = useState('')
    const [showLocationPrompt, setShowLocationPrompt] = useState()
    async function registerForPushNotificationsAsync() {
        let token;
        // if (Device.isDevice) {
        if (true) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra.eas.projectId,
            });
            // @todo
            // If token is different from memory, update firebase
            setToken(JSON.stringify(token))
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    const { user } = useAuth()
    const { userData } = getUserData()
    // const [trips, setTrips] = useState([])
    const [items, setItems] = useState([])

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        const enableDisableNotifications = async () => {
            let notificationEnabled = await getSetting('notifcations_enabled');

            if (notificationEnabled) {
                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true,
                        shouldPlaySound: false,
                        shouldSetBadge: false,
                    }),
                });
            } else {
                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: false,
                        shouldPlaySound: false,
                        shouldSetBadge: false,
                    }),
                });
            }

        }
        enableDisableNotifications()
    }, [])

    useEffect(() => {
        const initPushNotifications = async () => {
            const localTokenString = await getSetting('notificationToken')
            registerForPushNotificationsAsync().then(async token => {
                if (localTokenString != token.data) {
                    console.log("NOT EQUAL")
                    await storeSetting('notificationToken', token.data)
                    await updateUserDoc(userData.id, {
                        notificationToken: token.data
                    })
                }
            });

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
            });
        }
        initPushNotifications()

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        (async () => {
            console.log("REQUEST LOC")
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setShowLocationPrompt(true)
                return;
            }
            setShowLocationPrompt(false)

            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            const geohash = getGeoHash(location)
            await updateUserDoc(userData.id, {
                lastLocation: location,
                geohash
            })
            setLocation(location);
        })();
    }, []);

    useEffect(() => {
        console.log("HELLO WORLD")
        const queryData = async () => {
            if (!userData || !location) return
            console.log(location)
            try {
                let potentialMatches = await getCards(userData)
                setItems(potentialMatches)
            } catch (err) {
                console.log(err)
            }
        }
        queryData()
    }, [userData, location])



    return (
        <View style={styles.screen}>
            {showLocationPrompt ?
                <StyleText
                    text="Location sharing is required to use Nodi"
                    fontSize={40}
                    style={{ marginTop: "25%" }}
                />
                :
                <ParallaxCarousel
                    items={items}
                />
            }

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    screen: {
        flex: 1,
        backgroundColor: "white"
    },
    container: {
        flex: 1,
    },
    text: {
        textAlign: "center",
        fontSize: 30,
        backgroundColor: "transparent"
    },
})