export const initialProfileState = {
  firstName: '',
  lastName: '',
  class: '',
  bio: '',
  imgUrl: '',
  profileError: null,
  profileLoading: false,
};

export const profileReducer = (state, action) => {
  switch (action.type) {
    case 'profile_error':
      return { ...state, profileLoading: false, classError: action.payload };
    case 'get_profile':
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        class: action.payload.class,
        bio: action.payload.bio || state.bio,
        imgUrl: action.payload.imgUrl || state.imgUrl,
        profileLoading: false,
        classError: null,
      };
    case 'profile_loading':
      return { ...state, profileLoading: true, profileError: null };
    default:
      return { ...state };
  }
};
