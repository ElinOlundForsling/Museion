import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from './state/state';
import { initialState, reducer } from './state/layoutReducer';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/layout/Sidebar';
// import PublicRoute from './components/routers/PublicRoute';
import PrivateRoute from './components/routers/PrivateRoute';
import './stylesheets/App.css';
// import './stylesheets/gradients.css';
import './stylesheets/widget.css';
import './stylesheets/sidebar.css';
import PublicRoute from './components/routers/PublicRoute';

function App() {
  return (
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <main className='main'>
          <Switch>
            <PublicRoute
              component={Dashboard}
              restricted={true}
              path='/'
              exact
            />
            <PrivateRoute component={Dashboard} path='/dashboard' exact />
          </Switch>
        </main>
        <aside>
          <Sidebar />
        </aside>
      </StateProvider>
    </Router>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
