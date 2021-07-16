import axios from 'axios';
import { toast } from 'react-toastify';
import { isEmpty } from '../utils/Utils';
import { UserTypes } from './SignupTypes';

export const signupUser = (userData) => dispatch => {
  dispatch({ type: UserTypes.CREATE_USER_SUBMITTED });
  axios.post('http://127.0.0.1:8000/api/users/', userData).then((res) => {
    toast.success(`Account for ${userData.username} created! Please log in.`)
    dispatch({ type: UserTypes.CREATE_USER_SUCCESS });
  })
  .catch (err => {
    if(err.response){
      toast.error(JSON.stringify(err.response.data));
      dispatch({ type: UserTypes.CREATE_USER_ERROR, errorData: err.response.data })
    } else if(err.message){
      toast.error(JSON.stringify(err.message))
    } else {
      toast.error(JSON.stringify(err))
    };
  });
};
