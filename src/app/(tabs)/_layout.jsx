import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" options={{ title: 'Home', presentation: 'modal' }}/>
      <Stack.Screen name="attendancePage" options={{ title:'Attendance', presentation: 'modal' }}/>
      <Stack.Screen name="todo" options={{ title: 'ToDo', presentation:'card' }}/>
    </Stack>
  );
}
