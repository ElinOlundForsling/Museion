import React, { useMemo } from 'react';
import { useStateValue } from '../state/state';
import Card from '../components/layout/Card';
import Rudl from 'rudl';

function importAll(r) {
  const w = r.keys().map(r);
  return w.map(W => <W.default />);
}

const widgets = importAll(
  require.context('../components/widgets', false, /\.js$/),
);

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

function Dashboard(props) {
  // State
  const [
    {
      cardsWidth,
      cardsMargin,
      cardsHeightRange,
      cardsBorderWidth,
      dialogBorderWidth,
      opened,
    },
    dispatch,
  ] = useStateValue();

  // Set cards height
  const cardsHeight = useMemo(
    () =>
      Array.from(Array(widgets.length)).map(() =>
        getRandomArbitrary(...cardsHeightRange),
      ),
    [cardsHeightRange],
  );

  // Prepare cards Components
  const cards = Array.from(Array(widgets.length)).map((_, index) => {
    return (
      <Card
        key={index}
        width={cardsWidth}
        height={cardsHeight[index]}
        margin={cardsMargin}
        borderWidth={cardsBorderWidth}
        dialogBorderWidth={dialogBorderWidth}
        order={index}
        number={index + 1}
        id={index}
        index={index}
        content={widgets[index]}
      />
    );
  });

  return (
    <div
      className={`card-wrapper
      ${opened ? 'open' : 'closed'}
    `}
      style={{
        width: `96vw`,
        maxWidth: `1920px`,
        overflow: 'hidden',
      }}>
      <Rudl
        key='layout-for-pinned-notes'
        onWidthResize={() => dispatch({ type: 'closed' })}
        transitionDuration={800}
        transitionTimingFunction='cubic-bezier(.42,.2,.23,1.27)'
        ghostTransitionDuration={300}
        ghostTransitionTimingFunction='cubic-bezier(.42,.2,.23,1.27)'>
        {cards}
      </Rudl>
    </div>
  );
}

export default Dashboard;
