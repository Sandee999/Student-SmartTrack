import "../global.css";
import React from 'react';
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="(auth)"/>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen name="attendanceEditPage/[subject]" options={{ presentation: 'formSheet', animation: 'slide_from_bottom', contentStyle:{ backgroundColor: '#00000000'} }}/>
      </Stack>
    </>
  );
}