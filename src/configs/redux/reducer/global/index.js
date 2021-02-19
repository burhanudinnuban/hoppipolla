import {reducer} from '../../../../constants/values';

const initialStateRoot = {
  loading: false,
  isLogIn: false,
  isFirstLaunch: false,
  disable: false,
  dataUser: {},
  phoneNumber: '',
};

const global = (state = initialStateRoot, action) => {
  switch (action.type) {
    case reducer.LOADING:
      return {
        ...state,
        loading: action.value,
      };
    case reducer.ISLOGIN:
      return {
        ...state,
        isLogIn: action.value,
      };
    case reducer.ISFIRSTLAUNCH:
      return {
        ...state,
        isFirstLaunch: action.value,
      };
    case reducer.DISABLE:
      return {
        ...state,
        disable: action.value,
      };
    case reducer.DATAUSER:
      return {
        ...state,
        dataUser: action.value,
      };
    case reducer.PHONENUMBER:
      return {
        ...state,
        phoneNumber: action.value,
      };
    default:
      return state;
  }
};

export default global;
