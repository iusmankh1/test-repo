import * as Actions from '../types';

export const logIn = (token, dealer, baseUrl) => {
  return dispatch => {
    dispatch({type: Actions.LOGIN, payload: token, dealer: dealer, baseUrl: baseUrl});
  };
};

export const logOut = () => {
  // console.log('-----------Logout in Reducer------------');

  return dispatch => {
    dispatch({type: Actions.LOGOUT});
  };
};
