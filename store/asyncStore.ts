import AsyncStorage from '@react-native-async-storage/async-storage';

const set = async (key: string, value: any) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const get = async (key: string, isJson = false) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (isJson && value) return JSON.parse(value);
    return value;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default {
  get,
  set,
  remove,
};
