import { View, Text,Image, TouchableOpacity, Modal } from 'react-native'
import React from 'react'

export default function AddSubjectButton(props) {
  return (
    <>
      <TouchableOpacity onPress={props.onPress} className={`absolute bottom-20 right-10 w-[8vh] h-[8vh] bg-sky-600 rounded-3xl items-center justify-center`}>
        <Image source={require('../../assets/otherIcons/plus.png')} className={`w-[3vh] h-[3vh]`} />
      </TouchableOpacity>
    </>
  );
}