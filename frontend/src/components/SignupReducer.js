import { UserTypes } from './SignupTypes';

const initialState = {
  usernameError: "",
  passwordError: "",
  isSubmitted: false
}

export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserTypes.CREATE_USER_SUBMITTED:
      return {
        usernameError: "",
        passwordError: "",
        isSubmitted: true
      };
    case UserTypes.CREATE_USER_SUCCESS:
      return {
        usernameError: "",
        passwordError: "",
        isSubmitted: false
      };
    case UserTypes.CREATE_USER_ERROR:
        const err = {
        usernameError: "",
        passwordError: "",
        isSubmitted: false
      };
      if(action.errorData.hasOwnProperty('username')){
        err.usernameError = action.errorData['username'];
      }
      if(action.errorData.hasOwnProperty('password')){
        err.passwordError = action.errorData['password'];
      }
      return err;
    default:
      return state
  }
}