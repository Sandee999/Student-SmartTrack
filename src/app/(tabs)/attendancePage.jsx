import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AddSubjectButton from '../../components/AddSubjectButton';
import DisplaySubjects from '../../components/DisplaySubjects'

export default function attendancePage() {

  return (
    <>
      <SafeAreaView>
        <View className={`w-[100vw] h-[100vh]`}>
          <View className={`w-[100vw] h-[8vh] flex-row items-center justify-center bg-[#005EB8]`}>
            <Pressable onPress={()=>router.back()} className={`absolute left-6 top-5`}>
              <Image source={require('../../../assets/otherIcons/left.png')} resizeMode='contain' tintColor={'white'} className={`w-[5vh] h-[5vh]`}/>
            </Pressable>
            <Text adjustsFontSizeToFit className={`w-[50vw] h-[8vh] pt-2 text-2xl font-pmedium text-center align-middle text-white`}>Attendance</Text>
          </View>
          <View className={`w-[100vw] h-[92vh] bg-[#D4D6D6] justify-center items-center`}>
            <DisplaySubjects/>
          </View>
        </View>
        <AddSubjectButton/>
      </SafeAreaView>
    </>
  )
}