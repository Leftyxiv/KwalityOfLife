import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostDetail = ({ post }) => {
  const [messages, setMessages] = useState([]);
  const fetchMessages = async () => {
    const message = await axios.get("http://127.0.0.1:8000/api/comment");
    // message = message.filter(m => m.user === )
    console.log(message)
  }
  return (
    <div>
      <div>
        <h2>{post.title}</h2>
        <img src={post.product_image} />

      </div>
      <div>

      </div>
    </div>
  )
}

export default PostDetail
