import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './Reducer';

export const history = createBrowserHistory();

export default function configureStore(preloadedState){
  const store = createStore(createRootReducer(history),
  preloadedState,
  applyMiddleware(routerMiddleware(history))
  )
  return store
}