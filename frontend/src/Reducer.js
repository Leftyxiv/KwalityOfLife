// create a root reducer
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { signupReducer } from './components/SignupReducer';
import { LoginReducer } from './components/LoginReducer';

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: LoginReducer,
  });
};

export default createRootReducer;