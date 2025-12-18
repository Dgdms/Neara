// src/features/groups/screens/DashboardScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useGroupStore } from '../../groups/store/groupStore';
export default function DashboardScreen() {
  const { groups, loading, fetchGroups } = useGroupStore();

  useEffect(() => {
    fetchGroups();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;


  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Gruppen</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text style={{ color: '#555' }}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
