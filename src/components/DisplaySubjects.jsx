import { View, Text, FlatList, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import { getValue, setValue } from '../util/asyncStorage';
import { router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

export default function DisplaySubjects() {
  const { height, width } = useWindowDimensions();
  const IsFocused = useIsFocused();
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const get = async () => {
      const subjects = await getValue('subjects');
      const data = Object.entries(subjects);
      setSortedData(data.sort((a, b) => a[1].percentage - b[1].percentage));
    };
    get();
  }, [IsFocused]);

  const updateAttendance = async (subject, type, index) => {
    // Get Data
    const subjects = await getValue('subjects');
    // Calculate
    if (type === 'present') subjects[subject].present += 1;
    if (type === 'absent') subjects[subject].absent += 1;
    const totalAttendance = subjects[subject].present + subjects[subject].absent;
    subjects[subject].percentage = totalAttendance > 0 ? parseFloat(((subjects[subject].present / totalAttendance) * 100).toFixed(2)) : 0;
    // Set Data
    await setValue('subjects', subjects);
    // Update Display
    const updatedData = [...sortedData]; // Create a new array
    updatedData[index][1] = subjects[subject]; // Update the specific subject
    setSortedData(updatedData); // Update the state
  };

  const renderItem = ({item, index}) =>(
    <View className={`w-[90vw] h-[170px] justify-center items-center bg-white shadow-xl rounded-xl`}>
      <View className={`w-[90vw] h-[120px] flex-row bg-[#001B2E] rounded-t-xl`}>
        <View className={`w-[60vw] h-[120px] items-center justify-center`}>
          <Text numberOfLines={2} ellipsizeMode='tail' className={`w-[40vw] h-[60px] text-white text-left align-middle text-xl font-psemibold`}>{item[0]}</Text>
          <Text className={`w-[40vw] h-[40px] text-white text-left align-middle text-lg font-psemibold`}>Attendance: {item[1].present}/{item[1].present+item[1].absent}</Text>
        </View>
        <View className={`w-[30vw] h-[120px] items-center justify-center`}>
          <CircularProgress
            initialValue={0}
            value={Math.floor(item[1].percentage)}
            radius={width/8}
            maxValue={100}
            duration={500}
            progressValueColor={'#ecf0f1'}
            activeStrokeColor={(item[1].percentage<75)?((item[1].percentage<65)?'red':'orange'):'green'}
          />
        </View>
      </View>
      <View className={`w-[90vw] h-[50px] flex-row`}>
        <TouchableOpacity onPress={()=>router.push(`/attendanceEditPage/${item[0]}`)} activeOpacity={.8} className={`w-[30vw] h-[50px] bg-[#C89B00] items-center justify-center rounded-bl-xl flex-row`}>
          <Image source={require('../../assets/otherIcons/edit.png')} resizeMode='contain' className={`w-[5vw] h-[30px]`}/>
          <Text adjustsFontSizeToFit className={`px-2 h-[50px] text-center align-middle text-xl font-pmedium`}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>updateAttendance(item[0], 'absent', index)} activeOpacity={.8} className={`w-[30vw] h-[50px] bg-red-600 items-center justify-center`}>
          <Text adjustsFontSizeToFit className={`w-[30vw] h-[50px] text-center align-middle text-xl font-pmedium`}>Absent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>updateAttendance(item[0], 'present', index)} activeOpacity={.8} className={`w-[30vw] h-[50px] bg-green-600 items-center justify-center rounded-br-xl`}>
          <Text adjustsFontSizeToFit className={`w-[30vw] h-[50px] text-center align-middle text-xl font-pmedium`}>Present</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const EmptyComponent =() =>(
    <View className={`w-[100vw] h-[92vh] bg-[#D4D6D6] justify-center items-center`}>
      <Text className={`text-2xl font-pimedium`}>The List is Empty.</Text>
    </View>
  )

  return (
    <FlatList
      data={sortedData}
      renderItem={renderItem}
      keyExtractor={(item)=>item[0]}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<View className={`h-5`}/>}
      ItemSeparatorComponent={<View className={`h-5`}/>}
      ListFooterComponent={<View className={`h-5`}/>}
      ListEmptyComponent={EmptyComponent}
    />
  )
}