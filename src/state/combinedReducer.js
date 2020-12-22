import combineReducers from 'react-combine-reducers';
import { layoutReducer, initialLayoutState } from './layoutReducer';
import { profileReducer, initialProfileState } from './profileReducer';
import { authReducer, initialAuthState } from './authReducer';
import { classReducer, initialClassState } from './classReducer';
import { chatReducer, initialChatState } from './chatReducer';

const [reducer, initialState] = combineReducers({
  layout: [layoutReducer, initialLayoutState],
  profile: [profileReducer, initialProfileState],
  auth: [authReducer, initialAuthState],
  chat: [chatReducer, initialChatState],
  class: [classReducer, initialClassState],
});

export { reducer, initialState };
