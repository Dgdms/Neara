import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenProp>();
  const { user, loading, signIn } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigation.replace('Dashboard');
    }
  }, [user]);

  return (
    <View className="flex-1 justify-center items-center p-4 w-full bg-white">
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {/* Inputs */}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 w-full mb-2 p-2 rounded"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="border border-gray-300 w-full mb-4 p-2 rounded"
          />

          {/* Password vergessen (rechts) */}
          <View className="w-full mb-4 flex-row justify-end">
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text className="text-blue-500">Password vergessen?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={() => signIn(email, password)}
            className="bg-black w-full py-3 mb-4 rounded items-center"
          >
            <Text className="text-white font-bold text-center">Login</Text>
          </TouchableOpacity>

          {/* Register (links) */}
          <View className="w-full flex-row justify-start">
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-gray-500">Register here</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
