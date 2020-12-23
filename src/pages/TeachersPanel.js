import React from 'react';
import Page from '../components/layout/Page';
import Header from '../components/teachersPanels/Header';

const TeachersPanel = () => {
  return (
    <Page heading="Teacher's Panel">
      <div className='page-content-column'>
        <article className='page-article'>
          <Header />
        </article>
        <article className='page-article'></article>
      </div>
    </Page>
  );
};

export default TeachersPanel;
