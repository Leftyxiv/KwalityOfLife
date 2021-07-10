import axios from 'axios';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { LoginTypes } from './LoginTypes';
import { setAxiosToken , toastError } from '../utils/Utils';

export const login = (user, redirect) => dispatch => {
  axios.post("/api/token/login", user)
        .then(res => {
          const { auth_token } = res.data;
          setAxiosToken(auth_token);
          dispatch(setToken(auth_token));
          dispatch(getCurrentUser(redirect));
        }).catch(err => {
            dispatch(unsetCurrentUser());
            toastError(err);
        })
}

export const getCurrentUser = redirect => dispatch => {
  axios.get('/api/users/me').then((res) => {
    const user = {
      username: res.data.username,
    }
    dispatch(setCurrentUser(user, redirect));
  }).catch(err => {
    dispatch(unsetCurrentUser());
    toastError(err);
  })
}

export const setToken = (token) => dispatch => {
  setAxiosToken("");
  localStorage.setItem('token', token);
  dispatch({
    type: LoginTypes.SET_TOKEN,
    payload: token,
  });
};

export const setCurrentUser = (user, redirect) => dispatch => {
  localStorage.setItem('user', JSON.stringify(user));
  dispatch({
    type: LoginTypes.SET_USER,
    payload: user,
  });
  if(redirect !== ""){
    dispatch(push(redirect))
  }
}

export const unsetCurrentUser = () => dispatch => {
  setAxiosToken("");
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch({
    type: LoginTypes.UNSET_USER
  })
}

export const logout = () => dispatch => {
  axios.post('/api/token/logout').then(res => {
    dispatch(unsetCurrentUser());
    dispatch(push("/"));
    toast.success('Logged out!')
  }).catch(err => {
    dispatch(unsetCurrentUser());
    toastError(err);
  })
}