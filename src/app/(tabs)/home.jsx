import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function Home() {
  const [totalAttendance, setTotalAttendance] = useState(0);

  useEffect(() => {
    const calculateTotalAttendance = async () => {
      try {
        const subjectsJson = await AsyncStorage.getItem('attendance');
        const subjects = subjectsJson != null ? JSON.parse(subjectsJson) : null;

        if (subjects) {
          let totalPresent = 0;
          let totalAbsent = 0;

          // Calculate total present and absent counts
          Object.values(subjects).forEach(details => {
            totalPresent += details.present;
            totalAbsent += details.absent;
          });

          // Calculate total attendance percentage
          const total = totalPresent + totalAbsent;
          const percentage = total > 0 ? ((totalPresent / total) * 100).toFixed(2) : 0;
          setTotalAttendance(percentage);
        }
      } catch (error) {
        console.error("Error fetching attendance data: ", error);
      }
    };

    calculateTotalAttendance();
  }, []);

  return (
    <>
      <ScrollView className={`w-[100vw] h-[100vh] mt-safe-offset-0 bg-[#fdfdfd]`}>
        {/* Header */}
        <View className={`w-[100vw] h-[13vh] items-center justify-center`}>
          <Text adjustsFontSizeToFit className={`w-[50vw] h-[8vh] pt-2 text-2xl font-pmedium text-center align-middle`}>Home</Text>
          <View className={`z-10 w-[85vw] h-[5vh] flex-row justify-start items-center bg-[#F3F4F6FF] rounded-lg px-3`}>
            <Image source={require('../../../assets/otherIcons/search.png')} resizeMode='contain' className={`w-[3vh] h-[3vh]`} />
            <TextInput
              className={`w-[75vw] h-[5vh] px-3 pb-1 align-text-bottom font-pregular`}
              placeholder='Search ToDo'
              placeholderTextColor={'#BCC1CAFF'}
            />
          </View>
        </View>
        {/* Body */}
        <View className={`w-[100vw] min-h-[87vh] justify-start items-center`}>
          <Text adjustsFontSizeToFit className={`w-[100vw] h-[8vh] pl-3 pt-4 pb-2 font-psemibold text-2xl text-left align-middle`}>Dashboard Overview</Text>
          {/* Display Total attendance in TouchableOpacity below */}
          <TouchableOpacity activeOpacity={.7} onPress={() => router.push('/attendancePage')} className={`w-[95vw] h-48 border-[1.5px] border-gray-400 rounded-md bg-white justify-center items-center`}>
            <Text className="text-lg font-semibold">Attendance</Text>
            <Text className="text-xl font-bold mt-2">{totalAttendance}%</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar animated backgroundColor='white' style='dark' />
    </>
  );
}