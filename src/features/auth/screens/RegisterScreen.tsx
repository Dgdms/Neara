import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../../../services/supabaseClient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type RegisterScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenProp>();
  const { signUp } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignUp = async () => {
    await signUp(email, password).then(() => navigation.replace('SetupProfile')).catch((errror) => console.log(errror));

  };
  /* 
    const handleGoogleSignUp = async () => {
      await supabase.auth.signInWithOAuth({ provider: 'google' });
      navigation.replace('SetupProfile');
    };
  
    const handleAppleSignUp = async () => {
      await supabase.auth.signInWithOAuth({ provider: 'apple' });
      navigation.replace('SetupProfile');
    };
   */


  return (
    <KeyboardAvoidingView className="flex-1 justify-center items-center p-4 w-full bg-white" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <>
        {/* Inputs */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-gray-400 w-full m-2 p-4 rounded"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-400 w-full mb-4 p-4 rounded"
        />


        {/* Login Button */}
        <TouchableOpacity
          onPress={() => handleEmailSignUp()}
          className="bg-black w-full py-3 mb-4 rounded items-center"
        >
          <Text className="text-white font-bold text-center">Register</Text>
        </TouchableOpacity>

      </>
    </KeyboardAvoidingView>
  )

}
