import React from 'react';
import ReactDOM from 'react-dom';
// State
import { StateProvider } from './state/state';
import { initialState, reducer } from './state/layoutReducer';
// Local components
import Dashboard from './pages/Dashboard';
// Styles
import './styles/App.css';
import './styles/dialog-window.css';
import './styles/gradients.css';
import './styles/widget.css';

function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Dashboard />
    </StateProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
