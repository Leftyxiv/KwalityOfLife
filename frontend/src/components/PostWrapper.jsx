import React from 'react'
import CommentList from './CommentList';
import CreateComment from './CreateComment';
import PostDetail from './PostDetail';

import './PostWrapper.css';

const PostWrapper = (props) => {
  const postId = props.match.params.postId
  return (
    <div className="post-wrapper">
      <PostDetail postId={postId} />
      <div>
      <CreateComment postId={postId} />
      <br />
      <br />
      <CommentList postId={postId} />
      </div>
    </div>
  )
}

export default PostWrapper;
