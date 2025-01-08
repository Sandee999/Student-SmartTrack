import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddSubjectScreen({ modalVisible, setModalVisible }) {
  const [subject, setSubject] = useState('');

  const getSubjects = async () => {
    const data = await AsyncStorage.getItem('attendance');
    return data ? JSON.parse(data) : {};
  };

  const setSubjects = async (data) => {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('attendance', jsonValue);
  };

  const handleSubmit = async () => {
    if (!subject.trim()) {
      Alert.alert("Error", "Enter a value");
      return;
    }

    const subjects = await getSubjects();
    
    if (subjects[subject]) {
      Alert.alert("Error", "Value Exists");
      return;
    }      

    subjects[subject] = { present : 0, absent: 0, percentage: 0 };
    await setSubjects(subjects);

    setSubject(''); // Clear the input field
    setModalVisible(false); // Close the modal
  };

  return (
    <Modal
      visible={modalVisible}
      animationType='slide'
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <View className={`w-[100vw] h-[100vh] justify-center items-center`}>
        <View className={`w-[80vw] h-[28vh] bg-white rounded-3xl z-50 border-[1px] border-gray-200 shadow-2xl`}>
          <View className={`w-[80vw] h-[20vh] justify-center items-center border-b-[1px] border-gray-200 rounded-t-3xl`}>
            <Text className={`w-[65vw] h-[4vh] font-pregular`}>Enter: </Text>
            <TextInput
              className={`w-[70vw] h-[7vh] px-3 border-[1px] border-slate-300 rounded-2xl`}
              placeholder='Subject Name'
              placeholderTextColor={'#BCC1CAFF'}
              onChangeText={(e)=>setSubject(e)}
            />
          </View>
          <View className={`w-[80vw] h-[8vh] flex-row rounded-b-3xl`}>
            <TouchableOpacity onPress={() => setModalVisible(false)} className={`w-[40vw] h-[8vh] justify-center items-center border-r-[0.5px] border-gray-200 rounded-bl-3xl`}>
              <Text className={`font-plight text-xl text-center`}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleSubmit()} className={`w-[40vw] h-[8vh] border-l-[0.5px] justify-center items-center border-gray-200 rounded-br-3xl`}>
              <Text className={`font-plight text-xl text-center`}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}