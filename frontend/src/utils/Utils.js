import axios from 'axios';
import { toast } from 'react-toastify';

export const setAxiosToken = (token) => {
  if (typeof token !== 'undefined' && token){
    // apply the auth token to the request headers
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export const toastError = (err) => {
  if(err.response){
    toast.error(JSON.stringify(err.response.data))
  } else if (err.message){
    toast.error(JSON.stringify(err.message))
  } else {
    toast.error(JSON.stringify(err))
  }
}

export const isEmpty = (item) => item === undefined || item === null || (typeof item === "object" && Object.keys(item).length === 0) || (typeof item === "string" && item.trim().length === 0);