import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getValue } from '../util/asyncStorage';
import { router } from 'expo-router';

export default function SearchSubjects() {
  const isFocused = useIsFocused();
  const [ subjects, setSubjects ] = useState([]);
  const [ filteredSubjects, setFilteredSubjects ] = useState([]);
  const searchRef = useRef(null)

  useEffect(()=>{
    const get= async () =>{
      const data =await getValue('subjects');
      if (data) {
        setSubjects(Object.keys(data));
      }
    }
    get()
  },[isFocused]);

  const handleTextChange = (text) => {
    if(!text.trim()){
      setFilteredSubjects([]);
      return;
    }

    const filtered = subjects.filter(subject => 
      subject.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSubjects(filtered);
  };

  const openSubject = (item) => {
    setFilteredSubjects([]);
    router.push(`/attendanceEditPage/${item}`);
  }

  const handleSubmit = (event) => {
    const text = event.nativeEvent.text;
    if(subjects.includes(text)){
      setFilteredSubjects([]);
      router.push(`/attendanceEditPage/${text}`);
    }
  }

  const ListItem = ({item}) => {
    return(
      <TouchableOpacity onPress={()=>openSubject(item)} className={`w-[85vw] h-[7vh] flex-row justify-center items-center bg-white `}>
        <Text className={`w-[84vw] h-[7vh] pl-12 text-xl align-middle bg-[#F3F4F6] border-[1px] border-white`}>{item}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View className={`w-[85vw] flex-col`}>
        <View className={`z-10 w-[85vw] h-[5vh] flex-row justify-start items-center bg-[#F3F4F6] rounded-lg px-3`}>
          <Image source={require('../../assets/otherIcons/search.png')} resizeMode='contain' className={`w-[3vh] h-[3vh]`} />
          <TextInput
            ref={searchRef}
            className={`w-[75vw] h-[5vh] px-3 pb-1 align-text-bottom font-pregular`}
            placeholder='Search Subjects'
            placeholderTextColor={'#BCC1CAFF'}
            onChangeText={handleTextChange}
            onSubmitEditing={handleSubmit}
            autoCapitalize='words'
          />
        </View>
        {filteredSubjects.length > 0 && (
          <FlatList
            data={filteredSubjects}
            keyExtractor={(item)=>item}
            renderItem={ListItem}
            className={`absolute top-[5vh] left-0 w-[85wv] max-h-[30vh] z-30 rounded-b-xl`}
          />
        )}
      </View>
    </>
  )
}