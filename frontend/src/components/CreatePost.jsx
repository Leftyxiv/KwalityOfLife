import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { push } from 'connected-react-router';

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

  useEffect(() => {
    fetchUser();
    return () => {
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    // https://www.itsolutionstuff.com/post/react-email-validation-exampleexample.html
    const pattern = /.(\w{2,3})$/
    if(!company.search(pattern)){
      toast.error('Please enter a valid website or leave blank');
      return
    }
    if(!title || !description){
      toast.erre('Please add a title and description of the item')
    }
    console.log(productImg)
    let formData = new FormData();
    if(productImg){
      formData.append('product_image', productImg, productImg['name']);
    }
    formData.append('title', title);
    formData.append('company_website', company);
    formData.append('description', description);
    formData.append('user', user.id)
    const endPoint = 'http://127.0.0.1:8000/post/create/';
    const res = await axios.post(endPoint, formData, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': props.auth.token
      }
    })
    console.log(res.data)
    toast.success('Post created!')
    setTitle("");
    setProduct("");
    setDescription("");
    setCompany("");
  }
  // fetchUser();
  // const 
  const handleImageChange = (e) => {
    e.preventDefault()
    console.log(e.target.files[0]['name'])
    setProduct(e.target.files[0])
  }
  return (
    <div style={{ 'paddingTop': '150px' }}>
      <form onSubmit={onSubmit}>
        <label>Title: </label>
        <input type='text' id="title" value={title} onChange={e => setTitle(e.target.value)}/>
        <br />
        <label>Company Website: </label>
        <input type='text' id="company_website" value={company} onChange={e => setCompany(e.target.value)}/>
        <br />
        <label>Product Image: </label>
        <input type="file" id="image" accept="image/png, image/jpg" onChange={handleImageChange} />
        <br />
        <label>Description: </label>
        <textarea value={description} id="description" onChange={(e) => setDescription(e.target.value)} />
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(CreatePost);
