import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DisplaySubjects() {
  const [ subjects, setSubjects ] = useState(null);

  const getSubjects = async () => {
    const data = await AsyncStorage.getItem('attendance');
    if(data){
      return JSON.parse(data);
    } else {
      return null;
    }
  }
  useEffect(()=>{
    getSubjects().then(
      e=>setSubjects(e)
    );
  },[]);

  const sortedData = subjects ? Object.entries(subjects.sort((a,b)=>(a[1].percentage-b[1].percentage))) : [];


  return (
    <>
    </>
  )
}