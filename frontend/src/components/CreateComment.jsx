import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';



const CreateComment = (props) => {
  const [comment, setComment] = useState("");
  console.log(props)

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(comment)
    console.log({ 'body': comment, "post": props.postId })
    const res = await axios.post(`http://127.0.0.1:8000/post/${props.postId}/comment/`, { 'body': comment, "post": props.postId, "user": 1 }, {
      headers: {
        'Authorization': `Token ${props.token}`
      }
    })
    console.log(res.data)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Comment: </label>
        <input type="text" onChange={(e) => setComment(e.target.value)}/>
        <input type="submit" />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { token: state.auth.token,
            user: state.auth.user }
}

export default connect(mapStateToProps)(CreateComment);
