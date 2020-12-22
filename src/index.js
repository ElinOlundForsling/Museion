import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from './state/state';
import { initialState, reducer } from './state/combinedReducer';
import App from './App';
import './stylesheets/App.css';
import './stylesheets/gradients.css';
import './stylesheets/page.css';
import './stylesheets/widget.css';
import './stylesheets/sidebar.css';
import './stylesheets/form.css';
import './stylesheets/blueprints/user-image.css';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root'),
);
