import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../state/state';
import {
  getMessagesListener,
  sendMessage,
} from '../../state/actions/chatActions';

const Chat = ({ chatId, userId }) => {
  const [message, setMessage] = useState('');
  const [
    {
      auth: { authId },
      profile: { firstName, imgUrl },
      chat: { messages },
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    getMessagesListener(dispatch, chatId, 'subscribe');

    return function cleanup() {
      getMessagesListener(dispatch, chatId, 'unsubscribe');
    };
  }, [chatId]);

  const handleSubmit = e => {
    e.preventDefault();
    if ((authId, userId, message, firstName, imgUrl, chatId)) {
      sendMessage(dispatch, authId, userId, message, firstName, imgUrl, chatId);
    } else {
      dispatch({
        type: 'chat_error',
        payload: 'Cannot send message. Refresh the page and try again please.',
      });
    }
  };
  const handleChange = e => {
    setMessage(e.target.value);
  };

  return (
    <div className='chat-window'>
      {messages &&
        messages.map(msg => {
          return (
            <div className='chat-msg' key={msg.id}>
              {msg.text}
            </div>
          );
        })}
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' value={message} onChange={handleChange}></input>
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default Chat;
