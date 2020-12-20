import React from 'react';
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

function Dashboard() {
  const [
    {
      layout: { cardsWidth, cardsMargin, cardsBorderWidth, dialogBorderWidth },
    },
    dispatch,
  ] = useStateValue();

  const cards = Array.from(Array(widgets.length)).map((_, index) => {
    return (
      <Card
        key={index}
        width={cardsWidth}
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
      className='card-wrapper'
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
