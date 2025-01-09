import AsyncStorage from "@react-native-async-storage/async-storage";

const getValue = async (key) => {
  try{
    const jsonValue = await AsyncStorage.getItem(key);
    return (jsonValue) ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log("getValue: "+e);
  }
}

const setValue = async (key, value) => {
  try{
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch(e) {
    console.log("setValue: "+e);
  }
}

const mergeValue = async (key, value) => {
  try{
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, jsonValue);
  } catch(e) {
    console.log("mergeValue: "+e);
  }
}

const removeValue = async (key) =>{
  try{
    await AsyncStorage.removeItem(key);
  } catch(e) {
    console.log("removeValue: "+e);
  }
}

const clearAll = async () => {
  try{
    await AsyncStorage.clear();
  } catch(e) {
    console.log("clearAll: "+e);
  }
}

export { getValue, setValue, mergeValue, removeValue, clearAll }