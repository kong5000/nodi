import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import ConversationScreen from './screens/ConversationsScreen';
import useAuth from './hooks/useAuth';
import ModalScreen from './screens/ModalScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user } = useAuth()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            {/* <Stack.Navigator screenOptions={{
            headerShown: false
        }}> */}

            {user ? (
                <>
                    <Stack.Group>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Modal" component={ModalScreen} />
                        <Stack.Screen name="Conversations" component={ConversationScreen} />
                    </Stack.Group>
                </>
            ) : (
                // <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />

            )}
        </Stack.Navigator>
    )
}

export default StackNavigator