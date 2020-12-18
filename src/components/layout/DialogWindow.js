import React, { useState, useEffect } from 'react';

function DialogWindow(props) {
  const [cardWidth, setCardWidth] = useState();
  const [cardHeight, setCardHeight] = useState();
  const [cardPosX, setCardPosX] = useState();
  const [cardPosY, setCardPosY] = useState();
  const { node } = props;

  useEffect(() => {
    const element = document.getElementById(node.id);
    // Set and update card's size
    const updateCardParams = () => {
      setCardHeight(`${element.offsetHeight}px`);
      setCardWidth(`${element.offsetWidth}px`);
    };

    setCardHeight(`${element.offsetHeight}px`);
    setCardWidth(`${element.offsetWidth}px`);
    window.addEventListener('resize', updateCardParams);
    return () => window.removeEventListener('resize', updateCardParams);
  }, [node.id]);

  // Set and update card's position
  useEffect(() => {
    const element = document.getElementById(node.id);
    var rect = element.getBoundingClientRect();
    setCardPosX(rect.left);
    setCardPosY(rect.top);
    setCardHeight(`${element.offsetHeight}px`);
    setCardWidth(`${element.offsetWidth}px`);
  }, [props, node.id]);

  return (
    <div
      className='dialog-wrapper'
      style={{
        '--card-width': cardWidth,
        '--card-height': cardHeight,
        '--card-pos-x': `${cardPosX}px`,
        '--card-pos-y': `${cardPosY}px`,
      }}>
      {props.children}
    </div>
  );
}

export default DialogWindow;
