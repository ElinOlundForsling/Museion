import React, { useMemo } from 'react';

const getGradientNum = () => {
  return Math.round(Math.random() * 22);
};

const Widget = props => {
  const gradientId = useMemo(() => getGradientNum(), []);
  return (
    <div className={`widget ${props.className}`} style={props.style}>
      <div className={`widget-title g-${gradientId}`}>
        <h5>{props.heading}</h5>
      </div>
      <article className='widget-content'>{props.children}</article>
    </div>
  );
};

export default Widget;
