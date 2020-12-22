export const initialClassState = {
  classes: [],
  classmates: [],
  classError: '',
};

export const classReducer = (state, action) => {
  switch (action.type) {
    case 'class_error':
      return { ...state, classError: action.payload };
    case 'get_classes':
      return { ...state, classes: action.payload, classError: '' };
    case 'get_classmates':
      console.log(action.payload);
      return { ...state, classmates: action.payload, classError: '' };
    default:
      return { ...state };
  }
};
