import React, { useEffect } from 'react';
import Widget from '../layout/Widget';
import { useStateValue } from '../../state/state';
import { getLatestMessagesListener } from '../../state/actions/chatActions';

const Messages = () => {
  const [
    {
      auth: { authId },
      chat: { chatError, chatLoading, latestMessages },
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    if (authId) {
      getLatestMessagesListener(dispatch, 'subscribe', authId);
      return function cleanup() {
        getLatestMessagesListener(dispatch, 'unsubscribe', authId);
      };
    }
  }, [authId, dispatch]);

  return (
    <Widget heading='Messages' className='messages-component'>
      <table className='chat-table'>
        <thead>
          <tr>
            <th colSpan='2'>Recent Chats</th>
          </tr>
        </thead>
        {chatLoading && (
          <tbody>
            <tr>
              <td colSpan='2'>'Loading...'</td>
            </tr>
          </tbody>
        )}
        {chatError && (
          <tbody>
            <tr>
              <td colSpan='2'>{chatError}</td>
            </tr>
          </tbody>
        )}

        {latestMessages && latestMessages.length > 0 ? (
          latestMessages.map(msg => {
            return (
              <tbody key={msg.id}>
                <tr>
                  <td rowSpan='2' className='chat-table-row'>
                    <img src={msg.recipientImgUrl} className='img-tiny' />
                  </td>
                  <td>{msg.recipientName}</td>
                </tr>
                <tr>
                  <td className='chat-table-row'>{msg.text}</td>
                </tr>
              </tbody>
            );
          })
        ) : (
          <tbody>
            <tr>
              <td colSpan='2'>No Active Chats</td>
            </tr>
          </tbody>
        )}
      </table>
    </Widget>
  );
};

export default Messages;
