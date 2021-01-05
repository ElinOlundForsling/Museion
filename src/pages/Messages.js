import React, { useEffect } from 'react';
import Page from '../components/layout/Page';
import Chat from '../components/layout/Chat';
import { useStateValue } from '../state/state';
import { useParams } from 'react-router-dom';
import {
  getChatId,
  getLatestMessagesListener,
  getOtherProfile,
} from '../state/actions/chatActions';

const Messages = () => {
  const [
    {
      auth: { authId },
      chat: { chatError, chatLoading, profile, chatId, latestMessages },
    },
    dispatch,
  ] = useStateValue();

  const userId = useParams().id;
  useEffect(() => {
    getOtherProfile(dispatch, userId);
    if (authId && userId) {
      getChatId(dispatch, authId, userId);
    }

    if (authId) {
      getLatestMessagesListener(dispatch, 'subscribe', authId);
      return function cleanup() {
        getLatestMessagesListener(dispatch, 'unsubscribe', authId);
      };
    }
  }, [authId, dispatch, userId]);

  return (
    <Page heading='Messages'>
      <div className='page-content'>
        <section className='page-sidebar page-section'>
          <article className='page-article'>
            {profile && (
              <div className='chat-profile'>
                <img
                  src={profile.imgUrl}
                  alt='Avatar'
                  className='img-sidebar'
                />
                <h5>{profile.firstName + ' ' + profile.lastName}</h5>
                <p>{profile.bio}</p>
              </div>
            )}
          </article>
          <article className='page-article'>
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
          </article>
        </section>
        <section className='page-main page-section'>
          <article className='page-article chat-window'>
            {chatError && <p>{chatError}</p>}
            {chatLoading && <p>Loading...</p>}
            {chatId && <Chat chatId={chatId} userId={userId} />}
          </article>
        </section>
      </div>
    </Page>
  );
};

export default Messages;
