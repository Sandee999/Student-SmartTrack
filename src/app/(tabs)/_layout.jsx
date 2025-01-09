import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" options={{ title: 'Home' }}/>
        <Stack.Screen name="profile" options={{ title: 'Profile' }}/>
        <Stack.Screen name="attendancePage" options={{ title:'Attendance' }}/>
        <Stack.Screen name="todo" options={{ title: 'ToDo' }}/>
      </Stack>
      <StatusBar animated backgroundColor='white' style='dark'/>
    </>
  );
}
