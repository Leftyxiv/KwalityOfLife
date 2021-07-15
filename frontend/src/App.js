import './App.css';
import { ToastContainer } from 'react-toastify';
import { Route } from 'react-router';
import { Switch } from 'react-router';

import Root from './Root';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
// import PostCard from './components/PostCard';
// import PostList from './components/PostList';
// import SignupForm from './components/SignupForm';
// import LoginForm from './components/LoginForm';
import Dashboard from './components/Dash';
import requireAuth from './components/RequireAuth';
import './App.css'

function App() {
  return (
    <div className="App">
      <Root>
        <ToastContainer hideProgressBar={true} newestOnTop={true} />
        <div className='bars'>
        <Navbar />
        <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/*' component={requireAuth(Dashboard)} />
        </Switch>
        </div>
      </Root>
    </div>
  );
}

export default App;