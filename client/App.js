import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import ChatScreen from './screens/ChatScreen';

// Mock data for demonstration purposes
const mockUser = {
  _id: 'user1',
  name: 'Alex',
  emotionalValues: ['Trust', 'Empathy', 'Humor'],
};

const mockMatch = {
  _id: 'match123',
  users: ['user1', 'user2'],
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ChatScreen matchId={mockMatch._id} user={mockUser} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
