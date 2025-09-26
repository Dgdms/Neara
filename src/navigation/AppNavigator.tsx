// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../features/auth/screens/LoginScreen';
import { useAuthStore } from '../features/auth/store/authStore';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import DashboardScreen from '../features/dashboard/screens/DashboardScreen';
import SetupProfileScreen from '../features/auth/screens/SetupProfileScreen';
export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  SetupProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const user = useAuthStore((state) => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        ) : (
          <>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="SetupProfile" component={SetupProfileScreen} />
        </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
