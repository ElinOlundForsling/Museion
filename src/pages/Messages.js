import React, { useEffect } from 'react';
import Page from '../components/layout/Page';
import Chat from '../components/layout/Chat';
import { useStateValue } from '../state/state';
import { useParams } from 'react-router-dom';
import { getChatId } from '../state/actions/chatActions';

const Messages = () => {
  const [
    {
      auth: { authId },
      chat: { chatError, chatLoading, chatId },
    },
    dispatch,
  ] = useStateValue();

  const userId = useParams().id;
  useEffect(() => {
    if (authId && userId) {
      getChatId(dispatch, authId, userId);
    }
  }, [authId]);

  return (
    <Page heading='Messages'>
      <div className='page-content'>
        <section className='page-sidebar page-section'>
          <article className='page-article'>Current chat</article>
          <article className='page-article'>All chats</article>
        </section>
        <section className='page-main page-section'>
          <article className='page-article'>
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
