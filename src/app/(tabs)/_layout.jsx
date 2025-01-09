import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" options={{ title: 'Home' }}/>
        <Stack.Screen name="profile" options={{ title: 'Profile', presentation:'formSheet' }}/>
        <Stack.Screen name="attendancePage" options={{ title:'Attendance' }}/>
        <Stack.Screen name='addSubjectScreen' options={{ title: 'AddSubjectScreen', presentation: 'transparentModal', animation:'fade_from_bottom', contentStyle:{ backgroundColor: '#00000000'} }}/>
        <Stack.Screen name="todo" options={{ title: 'ToDo' }}/>
      </Stack>
      <StatusBar animated backgroundColor='white' style='dark'/>
    </>
  );
}
