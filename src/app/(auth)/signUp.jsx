import React from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import ProfilePicSelection from '../../components/ProfilePicSelection';
import { setValue } from '../../util/asyncStorage';

export default function SignUp() {
  const [ user, setUser ] = React.useState({
    name: '',
    pfpId: 1,
  });

  const [ errorMessage, setErrorMessage ] = React.useState('');
  const [ disableSubmitButton, setDisableSubmitButton ] = React.useState(false);
  
  function onChangeText(text) {
    setUser({
      ...user,
      name: text
    });
    if(text.length >= 20) setErrorMessage('cannot exceed 20 characters');
    else setErrorMessage('');
  }

  async function onSubmit() {
    if(!user.name.trim()) setErrorMessage('name cannot be empty');
    else{
      setDisableSubmitButton(true);
      // Store User Data using AsyncStorage
      await setValue('user', user);
      await setValue('subjects', {});
      // Going to Home Page
      await router.replace('/home');
    }
  }

  return (
    <>
      <SafeAreaView>
        <KeyboardAvoidingView onTouchStart={Keyboard.dismiss} behavior='position' className={`w-[100vw] h-[100vh] bg-white`}>
          <View className={`w-[100vw] h-full justify-center items-center`}>
            <Text adjustsFontSizeToFit className={`w-[80vw] h-[5vh] absolute top-16 text-3xl font-bold text-sky-600 text-center`}>Set Up Your Profile</Text>
            <ProfilePicSelection user={user} setUser={setUser} />
            <View className={`w-[90vw] h-[8vh] my-16`}>
              <TextInput
                className={`w-[90vw] h-[8vh] px-5 bg-[#F3F4F6FF] rounded-3xl`}
                placeholder='Enter a Name You Like...'
                placeholderTextColor={'#BCC1CAFF'}
                onChangeText={(e)=>onChangeText(e)}
                maxLength={20}
              />
              {errorMessage && <Text className={`text-sm text-red-600 relative bottom-0 left-7`}>*{errorMessage}</Text>}
            </View>
            <TouchableOpacity onPress={()=>onSubmit()} disabled={disableSubmitButton} activeOpacity={0.9} className={`absolute bottom-16 w-[60vw] h-[8vh] justify-center items-center bg-sky-500 rounded-3xl shadow-sm shadow-black`}>
              <Text adjustsFontSizeToFit className={`text-center text-2xl text-white`}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <StatusBar animated backgroundColor='white' style='dark' />
    </>
  );
}