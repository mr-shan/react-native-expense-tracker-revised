import axios from 'axios';

const SIGNUP_API =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const LOG_IN_API = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
const WEB_TOKEN = '';

export const logIn = async (username: string, password: string) => {
  try {
    const response = await axios.post(LOG_IN_API + WEB_TOKEN, {
      email: username,
      password: password,
      returnSecureToken: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error)
  }
};

export const signUp = async (username: string, password: string) => {
  console.log("inside sign up auth call")
  try {
    const response = await axios.post(SIGNUP_API + WEB_TOKEN, {
      email: username,
      password: password,
      returnSecureToken: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.dir(error)
    console.error(JSON.stringify(error))
  }
};
