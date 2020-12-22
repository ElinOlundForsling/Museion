export const initialProfileState = {
  firstName: '',
  lastName: '',
  classN: '',
  bio: '',
  imgUrl: '',
  notes: [],
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
        classN: action.payload.class,
        bio: action.payload.bio || state.bio,
        imgUrl: action.payload.imgUrl || state.imgUrl,
        profileLoading: false,
        classError: null,
      };
    case 'profile_loading':
      return { ...state, profileLoading: true, profileError: null };
    case 'update_bio':
      return {
        ...state,
        bio: action.payload,
        profileLoading: false,
        profileError: null,
      };
    case 'update_imgUrl':
      return {
        ...state,
        imgUrl: action.payload,
        profileLoading: false,
        profileError: null,
      };
    case 'update_notes':
      return {
        ...state,
        notes: action.payload,
        profileLoading: false,
        profileError: null,
      };
    default:
      return { ...state };
  }
};
