import React from 'react'
import { View, Text,Image, TouchableOpacity, Modal } from 'react-native'
import { router } from 'expo-router';

export default function AddSubjectButton() {
  return (
    <>
      <TouchableOpacity onPress={()=>router.push('/addSubjectScreen')} className={`absolute bottom-20 right-10 w-[8vh] h-[8vh] bg-sky-600 rounded-3xl items-center justify-center`}>
        <Image source={require('../../assets/otherIcons/plus.png')} className={`w-[3vh] h-[3vh]`} />
      </TouchableOpacity>
    </>
  );
}