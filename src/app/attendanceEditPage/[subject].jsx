import { View, Text, TouchableOpacity, TextInput, Image,TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { getValue, mergeValue } from '../../util/asyncStorage'

export default function editSubject() {
  const { subject } = useLocalSearchParams();
  const [ presentValue, setPresentValue ] = useState(0);
  const [ absentValue, setAbsentValue ] = useState(0);
  const [ percentageValue, setPercentageValue ] = useState(0);
  const presentRef = useRef(null);
  const absentRef = useRef(null);

  useEffect(()=>{
    const get = async () =>{
      const subjects = await getValue('subjects');
      setPresentValue(Number(subjects[subject].present));
      setAbsentValue(Number(subjects[subject].absent));
    }
    get();
  },[]);

  // Percentage Calculation
  useEffect(()=>{
    if (presentValue + absentValue > 0) {
      setPercentageValue(((presentValue / (presentValue + absentValue)) * 100).toFixed(2));
    } else {
      setPercentageValue(0);
    }
  },[ presentValue, absentValue ]);

  const handleSave = async() =>{
    const subjects = {
      [subject]: {
        present: presentValue,
        absent: absentValue,
        percentage: percentageValue
      }
    }
    await mergeValue('subjects', subjects);
    router.back();
  }

  const NunberCompunent = forwardRef(({ value, type }, ref) => {
    const [ text, setText ] = useState(value);

    const handleDecrement = () => {
      if(type==='present') setPresentValue(Math.max(Number(text)-1, 0));
      if(type==='absent') setAbsentValue(Math.max(Number(text)-1, 0));
    }

    const handleIncrement = () => {
      if(type==='present') setPresentValue(Math.min(Number(text)+1, 999));
      if(type==='absent') setAbsentValue(Math.min(Number(text)+1, 999));
    }

    const onBlur = () => {
      if(type==='present') setPresentValue(Math.min(Math.max(Number(text), 0), 999));  // O if text is empty
      if(type==='absent') setAbsentValue(Math.min(Math.max(Number(text), 0), 999));
    }

    const onSubmitEditing = () => {
      if(type==='present') setPresentValue(Math.min(Math.max(Number(text), 0), 999));  // O if text is empty
      if(type==='absent') setAbsentValue(Math.min(Math.max(Number(text), 0), 999));
    }

    return (
      <View className={`w-[130px] h-[40px] flex-row items-center justify-center rounded-xl border-[1px] border-gray-200`}>
        <TouchableOpacity onPress={handleDecrement} className={`w-[40px] h-[40px] rounded-l-xl items-center justify-center border-[1px] border-gray-200 bg-red-600`}>
          <Image source={require('../../../assets/otherIcons/subtract.png')} resizeMode='contain' className={`w-[23px] h-[23px]`}/>
        </TouchableOpacity>
        <TextInput 
          ref={ref}
          className={`w-[50px] h-[40px] bg-[#FBFBFB] border-[1px] border-gray-200 text-center align-middle`}
          value={text}
          onChangeText={(e)=>setText(e)}
          onSubmitEditing={onSubmitEditing}
          onBlur={onBlur}
          keyboardType='number-pad'
        />
        <TouchableOpacity onPress={handleIncrement} className={`w-[40px] h-[40px] rounded-r-xl items-center justify-center border-[1px] border-gray-200 bg-green-600`}>
          <Image source={require('../../../assets/otherIcons/add.png')} resizeMode='contain' className={`w-[23px] h-[23px]`}/>
        </TouchableOpacity>
      </View>
    );
  })

  return (
    <View className={`w-[100vw] h-full items-center justify-end`}>
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View className={`w-[100vw] h-[60vh] bg-[#fdfdfd] rounded-t-[40px] items-center justify-start`}>
        <View className={`w-[100vw] h-[4vh] bg-[#F9A620] rounded-t-[60px] items-center justify-center`}>
          <View className={`w-[50px] h-[5px] bg-white rounded opacity-60`}/>
        </View>
        {/* Header */}
        <View className={`w-[100vw] h-[7vh] bg-[#F9A620] items-center justify-center flex-row`}>
          {/* Title */}
          <Text className={`w-[70vw] h-[5vh] px-5 font-pisemibold text-xl text-left align-middle text-white`}>{subject}</Text>
          {/* Save Button */}
          <View className={`w-[30vw] h-[7vh] items-center justify-center`}>
            <TouchableOpacity onPress={handleSave} className={`w-[20vw] h-[5vh] items-center justify-center rounded-md bg-sky-600`}>
              <Text className={`w-[20vw] h-[5vh] pt-1 text-center align-middle font-pmedium text-white`}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Body */}
        <View className={`w-[100vw] h-[49vh] items-center justify-start`}>
          <View className={`w-[100vw] h-[11vh] justify-center items-center flex-row`}>
            <Text className={`w-[60vw] h-[10vh] pl-5 pt-1 text-left align-middle text-2xl font-plight `}>Present Classes: </Text>
            <View className={`w-[40vw] h-[10vh] items-center justify-center`}>
              <NunberCompunent value={String(presentValue)||0} type='present' ref={presentRef}/>
            </View>
          </View>
          <View className={`w-[100vw] h-[11vh] justify-center items-center flex-row`}>
            <Text className={`w-[60vw] h-[10vh] pl-5 pt-1 text-left align-middle text-2xl font-plight `}>Absent Classes: </Text>
              <View className={`w-[40vw] h-[10vh] items-center justify-center`}>
                <NunberCompunent value={String(absentValue)||0} type='absent' ref={absentRef}/>
              </View>
            </View>
          <View className={`w-[100vw] h-[11vh] justify-center items-center flex-row`}>
            <Text className={`w-[60vw] h-[10vh] pl-5 pt-1 text-left align-middle text-2xl font-plight `}>Total Classes: </Text>
            <View className={`w-[40vw] h-[10vh] items-center justify-center`}>
              <Text className={`w-[40vw] h-[10vh] pt-1 text-left align-middle text-2xl font-plight`}>{presentValue+absentValue}</Text>
            </View>
          </View>
          <View className={`w-[100vw] h-[11vh] justify-center items-center flex-row`}>
          <Text className={`w-[60vw] h-[10vh] pl-5 pt-1 text-left align-middle text-2xl font-plight `}>Percentage: </Text>
            <View className={`w-[40vw] h-[10vh] items-center justify-center`}>
              <Text className={`w-[40vw] h-[10vh] pt-1 text-left align-middle text-2xl font-plight`}>{percentageValue}%</Text>
            </View>
          </View>
        </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}