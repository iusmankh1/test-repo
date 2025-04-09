import * as Actions from '../types';
import { devBaseURL } from '../../Config/networkModule';

const initialState = {
  uid: null,
  accessToken: null,
  userData: {},
  tempUser: null,
  dealer: null,
  baseUrl: devBaseURL,
  // userType: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOGIN: {
      return {
        ...state,
        accessToken: action.payload,
        dealer: action.dealer,
        baseUrl: action.baseUrl || devBaseURL,
      };
    }
    case Actions.LOGOUT: {
      console.log('-----------Logout in Reducer------------');
      return {
        ...state,
        uid: null,
        userData: null,
        accessToken: null,
        dealer: null,
        baseUrl: devBaseURL,
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
