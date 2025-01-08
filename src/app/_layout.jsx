import "../global.css";
import React from 'react';
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, presentation: 'card' }} />
      </Stack>
    </>
  );
}