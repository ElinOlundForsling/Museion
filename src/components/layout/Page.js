import React, { useMemo } from 'react';

const getGradientNum = () => {
  return Math.round(Math.random() * 22);
};

const Widget = props => {
  const gradientId = useMemo(() => getGradientNum(), []);
  return (
    <div className='page'>
      <div className={`page-title g-${gradientId}`}>
        <h2>{props.heading}</h2>
      </div>
      <div className='page-children'>{props.children}</div>
    </div>
  );
};

export default Widget;
