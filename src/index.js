import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from './state/state';
import { initialState, reducer } from './state/combinedReducer';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/layout/Sidebar';
import Classroom from './pages/Classroom';
import Calender from './pages/Calender';
import Grades from './pages/Grades';
import Profile from './pages/Profile';
import TeachersPanel from './pages/TeachersPanel';
import Chat from './pages/Chat';
import Messages from './pages/Messages';
import SubmitWork from './pages/SubmitWork';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import PublicRoute from './components/routers/PublicRoute';
import PrivateRoute from './components/routers/PrivateRoute';
import './stylesheets/App.css';
// import './stylesheets/gradients.css';
import './stylesheets/widget.css';
import './stylesheets/sidebar.css';
import './stylesheets/form.css';

function App() {
  return (
    <Router>
      <StateProvider initialState={initialState.layout} reducer={reducer}>
        <main className='main'>
          <Switch>
            <PublicRoute component={SignIn} restricted={false} path='/' exact />
            <PublicRoute
              component={SignUp}
              restricted={false}
              path='/signup'
              exact
            />
            <PrivateRoute component={Dashboard} path='/dashboard' exact />
            <PrivateRoute component={Profile} path='/profile/:id' />
            <PrivateRoute component={Messages} path='/messages' exact />
            <PrivateRoute component={Chat} path='/chat/:chatId' />
            <PrivateRoute component={Classroom} path='/classroom' exact />
            <PrivateRoute component={Calender} path='/calender' exact />
            <PrivateRoute component={Grades} path='/dashboard' exact />
            <PrivateRoute component={SubmitWork} path='/submitwork' exact />
            <PrivateRoute
              component={TeachersPanel}
              path='/teacherspanel'
              exact
            />
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
