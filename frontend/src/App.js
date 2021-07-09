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
      </Root>
    </div>
  );
}

export default App;
