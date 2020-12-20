export const initialClassState = {
  classes: [],
  classMates: [],
  classError: '',
};

export const classReducer = (state, action) => {
  switch (action.type) {
    case 'CLASS_ERROR':
      return { ...state, classError: action.payload };
    case 'GET_CLASSES':
      return { ...state, classes: action.payload, classError: '' };
    case 'GET_CLASSMATES':
      return { ...state, classMates: action.payload, classError: '' };
    default:
      return { ...state };
  }
};
