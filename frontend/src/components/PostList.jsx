import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PostCard from './PostCard';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/post");
    setPosts(res.data.reverse());
  }
  useEffect(() => {
    fetchData()
    return () => {
      // cleanup
    }
  }, [])
  return (
    <div className="cardDiv">
      {posts.map(post => <PostCard post={post} />)}
    </div>
  )
}

export default PostList;
