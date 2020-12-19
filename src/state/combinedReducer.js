import combineReducers from 'react-combine-reducers';
import layoutReducer from './layoutReducer';
import authReducer from './authReducer';
import LayoutParams from './layoutReducer';
import authReducer from './authReducer';

const initialAuthState = {
  uid: null,
  authError: '',
};

const [reducer, initialState] = combineReducers({
  layout: [layoutReducer, LayoutParams],
  auth: [authReducer, initialAuthState],
});

export { reducer, initialState };
