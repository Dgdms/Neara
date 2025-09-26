import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
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
    await signUp(email, password);

    // Nach erfolgreichem Signup weiterleiten zum Username/Birthday Screen
    navigation.replace('SetupProfile');
  };

  const handleGoogleSignUp = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
    navigation.replace('SetupProfile');
  };

  const handleAppleSignUp = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'apple' });
    navigation.replace('SetupProfile');
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, width: '100%', marginBottom: 8, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, width: '100%', marginBottom: 16, padding: 8 }}
      />
      <Button title="Sign Up with Email" onPress={handleEmailSignUp} />

      <View style={{ height: 16 }} />

      <Button title="Sign Up with Google" onPress={handleGoogleSignUp} />
      <View style={{ height: 8 }} />
      <Button title="Sign Up with Apple" onPress={handleAppleSignUp} />
    </View>
  );
}
