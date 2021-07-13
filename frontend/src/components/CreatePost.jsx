import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const CreatePost = (props) => {
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [productImg, setProduct] = useState("");
  const [description, setDescription] = useState("");


  const fetchUser = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/users/getme/${props.auth.user['username']}/`);
    setUser(res.data);
  } 
  console.log(props)
  useEffect(() => {
    fetchUser();
    return () => {
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
  }
  // fetchUser();
  // const 
  return (
    <div style={{ 'paddingTop': '150px' }}>
      <form>
        <label>Title: </label>
        <input type='text' value={title} onChange={e => setTitle(e.target.value)}/>
        <br />
        <label>Company Website: </label>
        <input type='text' value={company} onChange={e => setCompany(e.target.value)}/>
        <br />
        <label>Product Image: </label>
        <input type="file" value={productImg} onChange={(e) => setProduct(e.target.value)} />
        <br />
        <label>Description: </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(CreatePost);
