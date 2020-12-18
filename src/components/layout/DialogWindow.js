import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

function DialogWindow(props) {
  const [cardWidth, setCardWidth] = useState();
  const [cardHeight, setCardHeight] = useState();
  const [cardPosX, setCardPosX] = useState();
  const [cardPosY, setCardPosY] = useState();
  const { node, cardBorderWidth, borderWidth } = props;

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
      <CSSTransition
        timeout={300}
        classNames='dialog'
        onEnter={() => props.switchVisibility()}
        onExited={() => props.switchVisibility()}
        unmountOnExit>
        <div
          className={`card-expand-window g-${node.gradientId}`}
          id={`${node.id}-dialog`}
          style={{
            '--card-box-shadow': `0 0 0 2px rgba(182, 182, 182, 0), inset 0 0 0 ${cardBorderWidth}px white, 0px 0px 2px 0px rgba(0, 0, 0, 0.2)`,
            '--dialog-box-shadow': `0 0 0 2px rgba(182, 182, 182, 0), inset 0 0 0 ${borderWidth}px white, 0px 0px 50px 0px rgba(0, 0, 0, 0.3)`,
          }}
        />
      </CSSTransition>
      {props.children}
    </div>
  );
}

export default DialogWindow;
