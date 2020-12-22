import combineReducers from 'react-combine-reducers';
import { layoutReducer, initialLayoutState } from './layoutReducer';
import { profileReducer, initialProfileState } from './profileReducer';

const [reducer, initialState] = combineReducers({
  layout: [layoutReducer, initialLayoutState],
  profile: [profileReducer, initialProfileState],
});

export { reducer, initialState };
