const masterWidth = opened => {
  let width = Math.round(window.innerWidth - (window.innerWidth / 100) * 4);
  width = width > 1900 ? 1900 : width;
  return width - sidebarWidth(opened);
};

const sidebarWidth = opened => {
  return opened ? 300 : 60;
};

const margin = opened => {
  if (masterWidth(opened) <= 960) return 4;
  else return 12;
};

const borderWidth = opened => (masterWidth(opened) <= 640 ? 2 : 4);

const dialogBorderWidth = opened => (masterWidth(opened) <= 640 ? 4 : 8);

const masonryCardsWidth = opened => {
  let width = masterWidth(opened);
  let numOfColumns = width > 640 ? 3 : 2;
  return width / numOfColumns - 2;
};

const LayoutParams = opened => {
  let cardsWidth = masonryCardsWidth(opened);
  cardsWidth = cardsWidth < 200 ? 200 : cardsWidth;
  return {
    cardsWidth,
    cardsMargin: margin(opened),
    cardsBorderWidth: borderWidth(opened),
    dialogBorderWidth: dialogBorderWidth(opened),
    opened,
  };
};

export const initialState = LayoutParams(false);

export const reducer = (state, action) => {
  switch (action.type) {
    case 'open':
      return LayoutParams(true);
    case 'closed':
      return LayoutParams(false);
    default:
      return initialState;
  }
};
