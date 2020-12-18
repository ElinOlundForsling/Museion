import React from 'react';

const Widget = props => {
  return (
    <div className={`widget ${props.className}`} style={props.style}>
      <div className='widget-title'>
        <h5>{props.heading}</h5>
      </div>
      <article className='widget-text'>{props.children}</article>
    </div>
  );
};

export default Widget;
