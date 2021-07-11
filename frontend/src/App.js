import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'react-router';

import Root from './Root';

import Navbar from './components/Navbar';
// import Landing from './components/Landing';
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
        <div class='bars'>
        <Navbar />
        <Dashboard />
        {/* <Switch>
          <Route exact path="/" render={() => <Landing />} />
          <Route exact path="/feed" render={() => <PostList />} />
          <Route exact path="/signup" render={() => <SignupForm />} />
          <Route exact path="/login" render={() => <LoginForm />} />
        </Switch> */}
        </div>
      </Root>
    </div>
  );
}

export default App;
