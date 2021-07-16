import './App.css';
import { ToastContainer } from 'react-toastify';
import { Route } from 'react-router';
import { Switch } from 'react-router';

import Root from './Root';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Dashboard from './components/Dash';
import requireAuth from './components/RequireAuth';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import './App.css'

function App() {
  return (
    <div className="App">
      <Root>
        <ToastContainer hideProgressBar={true} newestOnTop={true} />
        <div className='bars'>
        <Navbar />
        <Switch>
        <Route exact path='/' render={() => <Landing Component={LoginForm}/>} />
        <Route exact path="/signup" render={() => <Landing Component={SignupForm} /> } />
        <Route exact path='/*' component={requireAuth(Dashboard)} />
        </Switch>
        </div>
      </Root>
    </div>
  );
}

export default App;