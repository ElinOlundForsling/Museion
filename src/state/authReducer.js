const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state };
    case 'SIGN_OUT':
      return { ...state };
    default:
      return { ...state };
  }
};

export default authReducer;
