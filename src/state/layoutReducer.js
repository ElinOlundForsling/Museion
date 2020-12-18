const masterWidth = () => {
  let width = Math.round(window.innerWidth - (window.innerWidth / 100) * 4);
  return width > 1900 ? 1900 : width;
};

const margin = () => {
  if (masterWidth() <= 960) return 4;
  else return 12;
};

const borderWidth = () => (masterWidth() <= 640 ? 2 : 4);

const dialogBorderWidth = () => (masterWidth() <= 640 ? 4 : 8);

const masonryCardsWidth = () => {
  let width = masterWidth();
  let numOfColumns = 4;
  if (width < 450) {
    numOfColumns = 1;
  } else if (width < 640) {
    numOfColumns = 2;
  } else if (width < 1280) {
    numOfColumns = 3;
  }
  return width / numOfColumns - 2;
};

const masonryLayoutParams = () => {
  const cardsWidth = masonryCardsWidth();
  const cardsHeightRange = [cardsWidth / 2.5, cardsWidth * 1.4];
  return {
    layout: 'masonry',
    cardsWidth,
    cardsHeightRange,
    cardsMargin: margin(),
    cardsBorderWidth: borderWidth(),
    dialogBorderWidth: dialogBorderWidth(),
  };
};

export const initialState = masonryLayoutParams();

export const reducer = (state, action) => {
  switch (action.type) {
    case 'masonry':
      return masonryLayoutParams();
    default:
      return initialState;
  }
};
