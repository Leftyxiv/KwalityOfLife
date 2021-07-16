import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import './CreatePost.css';

const CreatePost = (props) => {
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [productImg, setProduct] = useState("");
  const [description, setDescription] = useState("");

  // const values = document.getElementById('options')
  // console.log(values.value);
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
      toast.error('Please add a title and description of the item')
    }
    console.log(productImg)
    let formData = new FormData();
    if(productImg){
      formData.append('product_image', productImg, productImg['name']);
    }
    formData.append('title', title);
    formData.append('company_website', company);
    formData.append('description', description);
    formData.append('user', user.id);
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
    // dispatch(push('/feed'))
  }
  // fetchUser();
  // const 
  const handleImageChange = (e) => {
    e.preventDefault()
    console.log(e.target.files[0]['name'])
    setProduct(e.target.files[0])
  }
  return (
    <div style={{ 'paddingTop': '150px', 'width': '30vw', 'display': 'flex', 'justifyContent': 'center' }}>
      <form onSubmit={onSubmit} id='createFormDiv' style={{'position': 'relative', 'left': '20vw', 'border': '1px solid rgb(211,211,211, .5)'}}>
      {/* style={{'width': '30vw'}}> */}
        <div className='form-group'>
        {/* <label for='title'>Title: </label> */}
        <input type='text' id="title" className='form-control' placeholder='title' value={title} onChange={e => setTitle(e.target.value)}/>
        <br />
        {/* <label>Company Website: </label> */}
        <input type='text' id="company_website" className='form-control' placeholder='company website' value={company} onChange={e => setCompany(e.target.value)}/>
        <br />
        {/* <label>Product Image: </label> */}
        <input type="file" id="image" className='form-control-file' accept="image/png, image/jpg" onChange={handleImageChange} />
        <br />
        {/* <label>Description: </label> */}
        <textarea className='form-control' placeholder='Description...' value={description} id="description" onChange={(e) => setDescription(e.target.value)} />
        <br />
        <label>Assists with: </label>
        <select id="disability">
          <option value="INTELLECTUAL">Intellectual</option>
          <option value="PHYSICAL">Physical</option>
          <option value="SENSORY">Sensory</option>
          <option value="MENTAL">Physical</option>
          {/* ("INTELLECTUAL", "Intellectual"),
    ("PHYSICAL", "Physical"),
    ("SENSORY", "Sensory"),
    ("MENTAL", "Mental")] */}
        {/* ("EDUCATION", "Education"),
    ("ENTERTAINMENT", "Entertainment"),
    ("CLOTHING", "Clothing"),
    ("CUISINE&DINING", "Cuisine&Dining"),
    ("TRANSPORTATION", "Transportation"),
    ("HOBBY", "Hobby"), */}
        </select>
    <br />
    <label>Purpose: </label>
        <select id="purposes">
          <option value="EDUCATION">Education</option>
          <option value="ENTERTAINMENT">Physical</option>
          <option value="CLOTHING">Sensory</option>
          <option value="CUISINEDINING">Cuisine & Dining</option>
          <option value="TRANSPORTATION">Transportation</option>
          <option value="HOBBY">Hobby</option>
          </select>
        <br />
        <input type="submit" />
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(CreatePost);
