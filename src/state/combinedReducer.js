import combineReducers from 'react-combine-reducers';
import { layoutReducer, initialLayoutState } from './layoutReducer';
import authReducer from './authReducer';
import { classReducer, initialClassState } from './classReducer';

const initialAuthState = {
  uid: null,
  authError: '',
};

const [reducer, initialState] = combineReducers({
  layout: [layoutReducer, initialLayoutState],
  auth: [authReducer, initialAuthState],
  class: [classReducer, initialClassState],
});

export { reducer, initialState };
