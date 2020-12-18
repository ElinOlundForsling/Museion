import React from 'react';

const Widget = props => {
  return (
    <div className={`widget ${props.className}`} style={props.style}>
      <div className='card-title'>
        <h5>{props.heading}</h5>
      </div>
      <article className='card-inside'>{props.children}</article>
    </div>
  );
};

export default Widget;
