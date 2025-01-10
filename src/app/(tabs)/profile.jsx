import React, { useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, Modal, BackHandler } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { getValue, clearAll } from '../../util/asyncStorage';

export default function profile() {
  const { top } = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const [ resetModalVisible, setResetModalVisible ] = useState(false);

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

  const name = user ? user.name : '';
  const profilePictureSource = user ? profilePictures[user.pfpId] : profilePictures[1];

  const handleReset = async () => {
    setResetModalVisible(false);
    await clearAll();
    BackHandler.exitApp();
  }

  return (
    <>
      <View className={`w-full h-full rounded-t-xl`}>
        <View className={`w-full justify-center items-center bg-white`} style={{ height: top}}>
          <View className={`w-[30vw] h-[5px] rounded-xl bg-gray-600`}/>
        </View>
        <View className={`w-[100vw] h-[100vh] bg-white items-center justify-start`}>
          <View className={`w-[100vw] h-[45vh] items-center justify-end bottom-6`}>
            <TouchableOpacity activeOpacity={.9} className={`w-[31vh] h-[31vh] bg-gray-200 items-center justify-center rounded-full`}>
              <Image source={profilePictureSource} resizeMode='contain' className={`w-[30vh] h-[30vh] rounded-full bg-white`}/>
            </TouchableOpacity>
          </View>
          <View className={`w-[100vw] h-[10vh] items-center justify-center`}>
            <Text className={`w-[80wv] h-[8vh] text-center align-middle text-3xl font-pregular`}>{name}</Text>
          </View>
          <TouchableOpacity onPress={()=>setResetModalVisible(true)} className={`absolute bottom-10 w-[65vw] h-[7vh] items-center justify-center rounded-3xl bg-red-600`}>
            <Text adjustsFontSizeToFit className={`w-[60vw] h-[5vh] text-center align-middle text-lg text-white font-psemibold`}>Erase Data and Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={resetModalVisible}
        animationType='fade'
        transparent
        onRequestClose={()=>setResetModalVisible(false)}
      >
        <View className={`w-full h-full bg-[#00000030] items-center justify-center`}>
          <View className={`w-[80vw] h-[26vh] bg-white rounded-xl border-[.5px] border-gray-400 shadow-xl`}>
            <Text className={`w-[80vw] h-[7vh] rounded-t-xl text-center align-middle text-2xl font-psemibold text-red-600 bg-yellow-300 border-[.5px] border-gray-400`}>Warning</Text>
            <Text className={`w-[80vw] h-[12vh] p-4 text-left align-middle font-pregular text-lg border-[.5px] border-gray-400`}>You will Lose All Your App Data, including any attendance records you have saved so far.</Text>
            <View className={`w-[80vw] h-[7vh] rounded-b-xl flex-row`}>
              <TouchableOpacity onPress={()=>setResetModalVisible(false)} className={`w-[40vw] h-[7vh] rounded-bl-xl items-center justify-center border-[.5px] border-gray-400`}>
                <Text className={`w-[30vw] h-[5vh] text-center align-middle font-pregular text-xl`}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleReset} className={`w-[40vw] h-[7vh] rounded-br-xl items-center justify-center border-[.5px] border-gray-400`}>
                <Text className={`w-[30vw] h-[5vh] text-center align-middle font-pregular text-xl`}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}