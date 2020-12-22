import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useStateValue } from './state/state';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/layout/Sidebar';
import Classroom from './pages/Classroom';
import Calender from './pages/Calender';
import Grades from './pages/Grades';
import Profile from './pages/Profile';
import TeachersPanel from './pages/TeachersPanel';
import Messages from './pages/Messages';
import SubmitWork from './pages/SubmitWork';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import PublicRoute from './components/routers/PublicRoute';
import PrivateRoute from './components/routers/PrivateRoute';

function App() {
  const [
    {
      layout: { opened },
    },
  ] = useStateValue();
  return (
    <Router>
      <main
        className={`main
      ${opened ? 'open' : 'closed'}
    `}>
        <Switch>
          <PublicRoute component={SignIn} restricted={true} path='/' exact />
          <PublicRoute
            component={SignUp}
            restricted={true}
            path='/signup'
            exact
          />
          <PrivateRoute component={Dashboard} path='/dashboard' exact />
          <PrivateRoute component={Profile} path='/profile/:userId' />
          <PrivateRoute component={Messages} path='/messages/:id' />
          <PrivateRoute component={Classroom} path='/classroom' exact />
          <PrivateRoute component={Calender} path='/calender' exact />
          <PrivateRoute component={Grades} path='/grades' exact />
          <PrivateRoute component={SubmitWork} path='/submitwork' exact />
          <PrivateRoute component={TeachersPanel} path='/teacherspanel' exact />
        </Switch>
      </main>
      <aside>
        <Sidebar />
      </aside>
    </Router>
  );
}

export default App;
