import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { router } from 'expo-router';
import { getValue, setValue } from '../util/asyncStorage'
import { useIsFocused } from '@react-navigation/native';

export default function HomeAttendanceDisplay() {
  const { height, width } = useWindowDimensions();
  const isFocused = useIsFocused();
  const [ data, setData ] = useState([]);
  const belowAvgData = data.filter(x=>x[1].percentage<75)
  console.log(belowAvgData)

  useEffect(()=>{
    const get = async () => {
      const subjects = await getValue('subjects');
      setData(Object.entries(subjects));
    }
    get();
  },[ isFocused ])

  const totalPresent = () =>{
    let totalPresent = 0;
    data.forEach(x=>totalPresent+=x[1].present);
    return totalPresent;
  }

  const totalAbsent = () =>{
    let totalAbsent = 0;
    data.forEach(x=>totalAbsent+=x[1].absent);
    return totalAbsent;
  }

  const avgPercentage = () =>{
    let totalPercentage = 0;
    data.forEach(x=>totalPercentage+=x[1].percentage);
    return totalPercentage/data.length;
  }

  const ListHeader = () => {
    const displayPercentage = Math.floor(avgPercentage()) || 0;
    return(
      <>
        <TouchableOpacity activeOpacity={.8} onPress={() => router.push('/attendancePage')} className={`w-[95vw] h-[25vh] border-[1.5px] border-gray-400 rounded-2xl bg-[#1D3557] flex-row`}>
          <View className={`w-[55vw] h-[25vh] items-center justify-start rounded-l-2xl`}>
            <Text className={`w-[50vw] h-[10vh] pl-5 pt-5 text-left align-middle text-white text-3xl font-psemibold`}>Attendance</Text>
            <View className={`w-[50vw] h-[5vh] flex-row items-center justify-center`}>
              <Text className={`w-[50vw] h-[5vh] pl-6 text-left align-middle text-green-500 text-lg font-psemibold`}>Total Present: {totalPresent()}</Text>
            </View>
            <View className={`w-[50vw] h-[5vh] flex-row items-center justify-center`}>
              <Text className={`w-[50vw] h-[5vh] pl-6 text-left align-middle text-red-600 text-lg font-psemibold`}>Total Absent: {totalAbsent()}</Text>
            </View>
          </View>
          <View className={`w-[40vw] h-[25vh] rounded-r-2xl justify-center items-center`}>
          <CircularProgress
            initialValue={0}
            value={displayPercentage}
            radius={Math.floor(width*3/20)}
            maxValue={100}
            duration={500}
            progressValueColor={'#ecf0f1'}
            activeStrokeColor={(displayPercentage<75)?((displayPercentage<65)?'red':'orange'):'green'}
          />
          </View>
        </TouchableOpacity>
        {belowAvgData.length>0 &&
          <> 
            <View className={`w-[95vw] h-[7vh] items-center justify-center`}>
              <Text className={`w-[80vw] h-[7vh] pl-3 pt-4 pb-2 font-psemibold text-lg text-left align-middle`}>Attendance Below 75%:</Text>
            </View>
          </>
        }
      </>
    );
  }

  const belowAvgList = ({item}) => {
    return(
    <>
      <View className={`w-[95vw] h-[7vh] items-center justify-center`}>
        <View className={`w-[75vw] h-[6vh] flex-row items-center justify-center rounded-xl border-2 bg-white`}>
          <Text numberOfLines={1} ellipsizeMode='tail' className={`w-[40vw] h-[5vh] text-left align-middle text-red-600`}>{item[0]}</Text>
          <Text className={`w-[20vw] h-[5vh] text-right align-middle text-red-600`}>{Math.floor(item[1].percentage)}%</Text>
        </View>
      </View>
    </>
    )
  }

  return (
    // Should use Flatlist
    <FlatList
      data={belowAvgData}
      keyExtractor={item=>item[0]}
      ListHeaderComponent={ListHeader}
      renderItem={belowAvgList}
    />
  )
}