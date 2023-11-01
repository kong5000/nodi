import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import StackNavigator from './StackNavigator';
import Footer from './components/Footer';
import { AuthProvider } from './hooks/useAuth';
import { UserDataProvider } from './hooks/userData';
// eas build -p android --profile preview
// ./emulator -avd Pixel_3a_API_34_extension_level_7_arm64-v8a

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <UserDataProvider>
            <StackNavigator />
          </UserDataProvider>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
