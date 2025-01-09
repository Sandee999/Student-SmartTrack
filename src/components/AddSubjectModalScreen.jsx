import React from 'react';
import { View, Text, Modal,TouchableOpacity, Keyboard, TextInput } from 'react-native';
import { setValue, getValue } from '../util/asyncStorage'

export default function AddSubjectModalScreen({showAddSubjectScreen, setShowAddSubjectScreen}) {
  const [ subject, setSubject ] = React.useState('');
  const [ errorMessage, setErrorMessage ] = React.useState('');

  function onClose(){
    setSubject('');
    setShowAddSubjectScreen(false);
  }

  async function onSubmit() {
    //Check if the text field is empty
    if(!subject.trim()){
      setErrorMessage('Please Enter a Name');
      return;
    }
    //Check if the Subject Already Exists
    const subjects = (await getValue('subjects')) || {};
    if(subject in subjects){
      setErrorMessage('Subject Already Exists');
      return;
    }
    //Adds the subject
    const value = {
      ...subjects,
      [subject]:{ present:0, absent: 0, percentage: 0 }
    }
    await setValue('subjects', value);

    setSubject('');
    setErrorMessage('');
    setShowAddSubjectScreen(false);
  }

  return (
    <Modal
      animationType='slide'
      visible={showAddSubjectScreen}
      transparent
      onRequestClose={()=>setShowAddSubjectScreen(false)}
    >
      <View onTouchStart={Keyboard.dismiss} className={`w-[100vw] h-[100vh] items-center justify-center -z-10`}>
        <View className={`w-[80vw] h-[28vh] bg-white rounded-3xl shadow-lg border-[1px] border-gray-400`}>
          <View className={`w-[80vw] h-[20vh] items-center justify-center rounded-t-3xl border-[1px] border-gray-400`}>
            <TextInput
              className={`w-[70vw] h-[7vh] px-4 rounded-xl border-[0.5px] border-gray-300 font-pmedium`}
              placeholder='Enter Subject Name'
              placeholderTextColor={'#BCC1CAFF'}
              onChangeText={(e)=>setSubject(e)}
              maxLength={30}
            />
            <Text className={`relative w-[65vw] text-base text-red-600`}>{(errorMessage)?`*${errorMessage}`:``}</Text>
          </View>
          <View className={`w-[80vw] h-[8vh] flex-row items-center justify-start`}>
            <TouchableOpacity onPress={onClose} className={`w-[40vw] h-[8vh] items-center justify-center rounded-bl-3xl border-[1px] border-gray-400`}>
              <Text className={`w-[20vw] h-[5vh] text-center align-middle text-2xl font-plight`}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSubmit} className={`w-[40vw] h-[8vh] items-center justify-center rounded-br-3xl border-[1px] border-gray-400`}>
            <Text className={`w-[20vw] h-[5vh] text-center align-middle text-2xl font-plight`}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}