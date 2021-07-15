import './App.css';
import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'react-router';

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
        <Route exact path='/' component={Landing} />
        <Route exact path='/*' component={Dashboard} />
        {/* <Switch>
          <Route exact path="/" render={() => <Landing />} />
          <Route exact path="/feed" render={() => <PostList />} />
          <Route exact path="/signup" render={() => <SignupForm />} />
          <Route exact path="/login" render={() => <LoginForm />} />
        </Switch> */}
        {/* <Switch>
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
        </Switch> */}
        </div>
      </Root>
    </div>
  );
}

export default App;
