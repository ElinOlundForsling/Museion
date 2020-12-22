import combineReducers from 'react-combine-reducers';
import { layoutReducer, initialLayoutState } from './layoutReducer';
import { profileReducer, initialProfileState } from './profileReducer';
import { authReducer, initialAuthState } from './authReducer';

const [reducer, initialState] = combineReducers({
  layout: [layoutReducer, initialLayoutState],
  profile: [profileReducer, initialProfileState],
  auth: [authReducer, initialAuthState],
});

export { reducer, initialState };
