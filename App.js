import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import { UserDataProvider } from './hooks/userData';
import { PaperProvider } from 'react-native-paper';
import StackNavigator from './StackNavigator';
// eas build -p android --profile preview
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
