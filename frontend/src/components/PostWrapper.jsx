import React, { useState, useEffect } from 'react'
import CommentList from './CommentList';
import CreateComment from './CreateComment';
import PostDetail from './PostDetail';

import './PostWrapper.css';

const PostWrapper = (props) => {
  const [statething, setStateThingy] = useState(1)
  useEffect(() => {
  }, [statething])
  const postId = props.match.params.postId;
  return (
    <div className="post-wrapper">
      <PostDetail postId={postId} />
      <div>
      <CreateComment postId={postId} updateState={setStateThingy} />
      <br />
      <br />
      <CommentList postId={postId} stateThing={statething} />
      </div>
    </div>
  )
}

export default PostWrapper;
