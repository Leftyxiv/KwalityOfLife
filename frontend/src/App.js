import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';

import Root from './Root';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import PostCard from './components/PostCard';
import PostList from './components/PostList';

function App() {
  return (
    <div className="App">
      <Root>
        <ToastContainer hideProgressBar={true} newestOnTop={true} />
        <Navbar />
        <Landing />
        <PostList />
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
      </Root>
    </div>
  );
}

export default App;
