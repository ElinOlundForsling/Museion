export const initialChatState = {
  chatId: '',
  messages: [],
  chatError: null,
  chatLoading: false,
  profile: { firstName: '', lastName: '', imgUrl: '', bio: '' },
};

export const chatReducer = (state, action) => {
  switch (action.type) {
    case 'chat_error':
      return { ...state, chatLoading: false, chatError: action.payload };
    case 'chat_loading':
      return { ...state, chatLoading: true, chatError: null };
    case 'chat_id':
      return {
        ...state,
        chatId: action.payload,
        chatLoading: false,
        chatError: null,
      };
    case 'get_other_profile':
      return {
        ...state,
        profile: action.payload,
        chatLoading: false,
        chatError: null,
      };
    case 'chat_messages':
      return {
        ...state,
        messages: action.payload,
        chatLoading: false,
        chatError: null,
      };
    default:
      return {
        ...state,
        chatLoading: false,
        chatError: null,
      };
  }
};
