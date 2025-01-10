import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { getValue } from '../../util/asyncStorage';
import SearchSubjects from '../../components/SearchSubjects';
import HomeAttendanceDisplay from '../../components/HomeAttendanceDisplay';

export default function Home() {
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const profilePictures = {
    1: require('../../../assets/profilePic/pfp1.png'),
    2: require('../../../assets/profilePic/pfp2.png'),
    3: require('../../../assets/profilePic/pfp3.png'),
    4: require('../../../assets/profilePic/pfp4.png'),
    5: require('../../../assets/profilePic/pfp5.png'),
    6: require('../../../assets/profilePic/pfp6.png'),
    7: require('../../../assets/profilePic/pfp6.png'),
    8: require('../../../assets/profilePic/pfp6.png'),
    9: require('../../../assets/profilePic/pfp6.png'),
  };

  useEffect(()=>{
    const get = async () =>{
      setUser(await getValue('user'));
    }
    get();
  },[isFocused])

  const profilePictureSource = user ? profilePictures[user.pfpId] : profilePictures[1];

  return (
    <>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className={`w-[100vw] h-[100vh] bg-[#fdfdfd]`}>
            {/* Header */}
            <View className={`w-[100vw] h-[13vh] items-center justify-center`}>
              <Text adjustsFontSizeToFit className={`w-[50vw] h-[8vh] pt-2 text-2xl font-pmedium text-center align-middle`}>Home</Text>
              <TouchableOpacity onPress={()=>router.push('/profile')} activeOpacity={.7} className={`w-[5vh] h-[5vh] absolute top-4 right-5`}>
                <Image source={profilePictureSource} resizeMode='contain' className={`w-[5vh] h-[5vh]`}/>
              </TouchableOpacity>
              <SearchSubjects/>
            </View>
            {/* Body */}
            <View className={`w-[100vw] min-h-[87vh] justify-start items-center`}>
              <Text adjustsFontSizeToFit className={`w-[100vw] h-[8vh] pl-3 pt-4 pb-2 font-psemibold text-2xl text-left align-middle`}>Dashboard Overview</Text>
              {/* Display Total attendance in TouchableOpacity below */}
              <HomeAttendanceDisplay/>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
}