import React, { useEffect } from 'react';
import Page from '../components/layout/Page';
import Chat from '../components/layout/Chat';
import { useStateValue } from '../state/state';
import { useParams } from 'react-router-dom';
import { getChatId, getOtherProfile } from '../state/actions/chatActions';

const Messages = () => {
  const [
    {
      auth: { authId },
      chat: { chatError, chatLoading, profile, chatId },
    },
    dispatch,
  ] = useStateValue();

  const userId = useParams().id;
  useEffect(() => {
    if (authId && userId) {
      getChatId(dispatch, authId, userId);
    }
    getOtherProfile(dispatch, userId);
  }, [authId]);

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
          <article className='page-article'>All chats</article>
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
