import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import AddSubjectButton from '../../components/AddSubjectButton'
import AddSubjectScreen from '../../components/AddSubjectScreen'
import DisplaySubjects from '../../components/DisplaySubjects'

export default function attendancePage() {
  const [ subjectScreenVisible, setSubjectScreenVisible ] = useState(false);

  return (
    <>
      <View className={`w-[100vw] h-[100vh] mt-safe-offset-0`}>
        <View className={`w-[100vw] h-[5vh] items-center justify-center`}>
          <Pressable onPress={()=>router.back()} className={`absolute left-3 w-[5vh] h-[5vh] pt-1 items-center justify-center`}>
            <Image source={require('../../../assets/otherIcons/left.png')} resizeMode='contain' className={`w-[4vh] h-[4vh]`}/>
          </Pressable>
          <Text adjustsFontSizeToFit className={`w-[50vw] h-[5vh] pt-2 text-2xl font-pmedium text-center align-bottom`}>Attendance</Text>
        </View>
        <View className={`w-[100vw] h-[92vh] justify-start items-center`}>
          <DisplaySubjects/>
          <AddSubjectScreen modalVisible={subjectScreenVisible} setModalVisible={setSubjectScreenVisible}/>
          <AddSubjectButton onPress={()=>setSubjectScreenVisible(true)}/>
        </View>
      </View>
      <StatusBar animated style='dark' />
    </>
  )
}