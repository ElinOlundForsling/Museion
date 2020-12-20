import combineReducers from 'react-combine-reducers';
import { layoutReducer, initialLayoutState } from './layoutReducer';
import authReducer from './authReducer';

const initialAuthState = {
  uid: null,
  authError: '',
};

const [reducer, initialState] = combineReducers({
  layout: [layoutReducer, initialLayoutState],
  auth: [authReducer, initialAuthState],
});

export { reducer, initialState };
