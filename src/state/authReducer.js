export const initialAuthState = {
  authId: null,
  authError: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'auth_error':
      return { ...state, authError: action.payload };
    case 'sign_up':
      return { ...state };
    case 'sign_in':
      return { ...state, authId: action.payload, authError: null };
    case 'sign_out':
      return { ...state, authId: null, authError: null };
    default:
      return { ...state };
  }
};
