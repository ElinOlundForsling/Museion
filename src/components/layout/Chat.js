import React, { useState, useEffect, useRef } from 'react';
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
    setMessage('');
  };
  const handleChange = e => {
    setMessage(e.target.value);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className='chat-window'>
      {messages ? (
        <div className='chat-message-container'>
          {messages.map(msg => {
            return (
              <div className='chat-msg-box' key={msg.date}>
                {msg.senderId !== authId && (
                  <img src={msg.senderImgUrl} className='img-tiny' />
                )}
                <div
                  className={`chat-msg ${
                    msg.senderId === authId ? 'sender-msg' : 'recepient-msg'
                  }`}
                  key={msg.id}>
                  {msg.text}
                </div>
                {msg.senderId === authId && (
                  <img src={msg.senderImgUrl} className='img-tiny' />
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <p>No messages yet. Write something!</p>
      )}
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' value={message} onChange={handleChange}></input>
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default Chat;
