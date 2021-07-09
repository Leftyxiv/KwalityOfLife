// create a root reducer
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import { createBrowserHistory } from 'history';

import { signupReducer } from './components/SignupReducer';

const createRootReducer = (history) => {
  // const history = createBrowserHistory()
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
  });
};

export default createRootReducer;