import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from './state/state';
import { initialState, reducer } from './state/layoutReducer';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/layout/Sidebar';
import './stylesheets/App.css';
// import './stylesheets/dialog-window.css';
import './stylesheets/gradients.css';
import './stylesheets/widget.css';
import './stylesheets/sidebar.css';

function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <main className='main'>
        <Dashboard />
      </main>
      <aside>
        <Sidebar />
      </aside>
    </StateProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
