import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { supabase } from '../../../services/supabaseClient';
import { useAuthStore } from '../store/authStore';
import { useNavigation } from '@react-navigation/native';

export default function SetupProfileScreen() {
  const { user } = useAuthStore();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSaveProfile = async () => {
    if (!user) return;
    await supabase.from('users').update({ username, birthday }).eq('id', user.id);
    navigation.replace('Dashboard');
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Setze deinen Username:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, width: '100%', marginBottom: 8, padding: 8 }}
      />

      <Text>Geburtsdatum:</Text>
      <TextInput
        value={birthday}
        onChangeText={setBirthday}
        placeholder="YYYY-MM-DD"
        style={{ borderWidth: 1, width: '100%', marginBottom: 16, padding: 8 }}
      />

      <Button title="Speichern & Weiter" onPress={handleSaveProfile} />
    </View>
  );
}
