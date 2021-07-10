import React from 'react'
import CommentList from './CommentList';
import PostDetail from './PostDetail';

import './PostWrapper.css';

const PostWrapper = (props) => {
  const postId = props.match.params.postId
  return (
    <div className="post-wrapper">
      <PostDetail postId={postId} />
      <CommentList postId={postId} />
    </div>
  )
}

export default PostWrapper;
