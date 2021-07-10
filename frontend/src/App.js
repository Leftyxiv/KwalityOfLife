import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'react-router';

import Root from './Root';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import PostCard from './components/PostCard';
import PostList from './components/PostList';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <div className="App">
      <Root>
        <ToastContainer hideProgressBar={true} newestOnTop={true} />
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <Landing />} />
          <Route exact path="/feed" render={() => <PostList />} />
          <Route exact path="/signup" render={() => <SignupForm />} />
        </Switch>
      </Root>
    </div>
  );
}

export default App;
