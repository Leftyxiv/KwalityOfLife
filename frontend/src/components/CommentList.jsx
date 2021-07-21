import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Comment from './Comment';

const CommentList = (props) => {
  const [messages, setMessages] = useState([])

  const fetchMessages = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/post/${props.postId}/comments/`);
      setMessages(res.data.reverse());
}
  useEffect(() => {
    fetchMessages()
    return () => {

    }
  }, [props.statething])

  return (
    <div>
      {messages.map((message) => <Comment key={message.id} {...message} />)}
    </div>
  )
}

export default CommentList;
