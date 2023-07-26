import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ConversationScreen from './screens/ConversationsScreen';
import useAuth from './hooks/useAuth';
import ModalScreen from './screens/ModalScreen';
import MatchScreen from './screens/MatchScreen';
import UserSearchScreen from './screens/UserSearchScreen';
import TripAdderScreen from './screens/TripAdderScreen';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user } = useAuth()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            {user ? (
                <>
                    <Stack.Group>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Match" component={MatchScreen} />
                        <Stack.Screen name="Modal" component={ModalScreen} />
                        <Stack.Screen name="Conversations"component={ConversationScreen} />
                        <Stack.Screen name="Users" component={UserSearchScreen} />
                        <Stack.Screen name="Trips" component={TripAdderScreen} />
                    </Stack.Group>
                </>
            ) : (
                <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    )
}

export default StackNavigator