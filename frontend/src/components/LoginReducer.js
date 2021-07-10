import { LoginTypes } from './LoginTypes';

const initialState = {
  user: {},
  authenticated: false,
  token: ""
}

export const LoginReducer = (state=initialState, action) => {
  switch(action.type){
    case LoginTypes.SET_TOKEN:
      return {...state,
        authenticated: true,
        token: action.payload
      }
    case LoginTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case LoginTypes.UNSET_USER:
      return initialState
    default:
      return state;
  }
}