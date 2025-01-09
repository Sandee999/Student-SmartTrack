import React from 'react'
import { View, Text,Image, TouchableOpacity, Modal } from 'react-native'
import { router } from 'expo-router';

export default function AddSubjectButton() {
  return (
    <>
      <TouchableOpacity onPress={()=>router.push('/addSubjectScreen')} className={`absolute bottom-20 right-10 w-[6vh] h-[6vh] bg-sky-600 rounded-2xl items-center justify-center border-[1px] border-gray-600`}>
        <Image source={require('../../assets/otherIcons/plus.png')} className={`w-[3vh] h-[3vh]`} />
      </TouchableOpacity>
    </>
  );
}