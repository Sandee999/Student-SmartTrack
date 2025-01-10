import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function HomeAttendanceDisplay() {
  return (
    // Should use Flatlist
    <TouchableOpacity activeOpacity={.7} onPress={() => router.push('/attendancePage')} className={`w-[95vw] h-48 border-[1.5px] border-gray-400 rounded-md bg-[#001B2E] justify-center items-center`}>
      <Text className="text-lg font-semibold">Attendance</Text>
    </TouchableOpacity>
  )
}