import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function edit() {
  const { subject } = useLocalSearchParams();

  return (
    <View className={`w-full h-full pt-safe-offset-0 items-center justify-end`}>
      <View className={`w-[100vw] h-[60vh] bg-[#f4f3ff] rounded-t-[30px] items-center justify-center`}>
        <Text>{subject}</Text>
      </View>
    </View>
  )
}