import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostDetail = ({postId}) => {
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});

  const fetchUser = async (url) => {
    const res = await axios.get(url);
    setUser(res.data)
  }

  const fetchPost = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/post/${postId}/`);
    setPost(res.data);
    fetchUser(res.data.user)
    console.log(user)
  }

  const deletePost = async () => {
    const res = await axios.delete(`http://127.0.0.1:8000/api/post/${postId}`);
  }

  useEffect(() => {
    fetchPost()
    return () => {
      
    }
  }, [])
  return (
    <div>
      <div>
        <h2>{post.title}</h2>
        <img src={post.product_image} style={{'maxWidth': "20vw"}}/>
        <br />
        <Link to={`/user/${user.id}`}>{ user.username }</Link>
        <br />
        { post.description }
      </div>
      <button onClick={deletePost}>Delete</button>
      <div>
      <br />
      <Link to="/feed">Go back!</Link>
      </div>
    </div>
  )
}

export default PostDetail
