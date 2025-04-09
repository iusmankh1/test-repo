import {combineReducers} from 'redux';
import authReducer from './authReducers';

const rootReducer = combineReducers({
  authReducer: authReducer,
});
// Exports
export default rootReducer;
