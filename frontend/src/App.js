import { Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'react-router';

import Root from './Root';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
<<<<<<< HEAD
import Signup from './components/SignupPage';
import PostDetail from './components/PostDetailPage';
import AuthorDetail from './components/AuthorDetailPage';
import CreatePost from './components/CreatePostPage';
import ChangeUserDetail from './components/ChangeUserDetailPage';
import LoginPage from './components/LoginPage';
=======
import PostCard from './components/PostCard';
import PostList from './components/PostList';
import SignupForm from './components/SignupForm';
>>>>>>> manny4

function App() {
  return (
    <div className="App">
      <Root>
        <ToastContainer hideProgressBar={true} newestOnTop={true} />
        <Navbar />
        <Switch>
<<<<<<< HEAD
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/post/:id">
            <PostDetail />
          </Route>
          <Route path="/author/:id">
            <AuthorDetail />
          </Route>
          <Route path="/addpost">
            <CreatePost />
          </Route>
          <Route path="/myaccount">
            <ChangeUserDetail />
          </Route>
        </Switch>
        
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
=======
          <Route exact path="/" render={() => <Landing />} />
          <Route exact path="/feed" render={() => <PostList />} />
          <Route exact path="/signup" render={() => <SignupForm />} />
        </Switch>
      </Root>
>>>>>>> manny4
    </div>
  );
}

export default App;
