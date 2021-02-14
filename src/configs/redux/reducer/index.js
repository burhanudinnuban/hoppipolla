import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from './global';
import cartReducer from './cartReducer';

const reducer = {
  global: global,
  cartReducer: cartReducer,
};

const configReduxPersist = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['global', 'cartReducer'],
};

const reduxPersistReducer = persistCombineReducers(configReduxPersist, reducer);

export default reduxPersistReducer;
