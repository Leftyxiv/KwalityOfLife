import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './MyInfo.css';


const MyInfo = (props) => {
  const [user, setUser] = useState(null);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);

  const fetchUser = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/users/getme/${props.user.user.username}`)
    setUser(res.data)
    setFirst(res.data.first_name)
    setLast(res.data.last_name)
    setEmail(res.data.email)
    setUsername(res.data.username)
    console.log(res.data.avatar)
    setAvatar(res.data.avatar)
  }
  useEffect(() => {
    fetchUser()
    // console.log(props.user.user.username)
  }, []);

  const handleImageChange = (e) => {
    e.preventDefault()
    setImgUpload(e.target.files[0])
    console.log(imgUpload)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    if(imgUpload) {
    formData.append('avatar', imgUpload, imgUpload['name'])
    }
    formData.append('first_name', first)
    formData.append('last_name', last)
    formData.append('email', email)
    formData.append('username', username)
    formData.append('id', user.id)
    console.log(imgUpload, imgUpload['name'])
  const res =  axios.post(`http://127.0.0.1:8000/info/myinfo/`, formData, {
     headers: {
    'content-type': 'multipart/form-data',
    'Authorization': `Token ${props.user.token}`
  }});
  console.log(res)
  }
  return (
    <div id='myinfo-form'>
      <form onSubmit={onSubmit}>
        {/* <label>First Name: </label> */}
        <input type='text' className='form-control' placeholder='First Name' name='fname' value={first} onChange={(e) => setFirst(e.target.value)} />
        <br />
        {/* <label>Last Name: </label> */}
        <input type='text' name='lname' className='form-control' placeholder='Last Name'  value={last} onChange={(e) => setLast(e.target.value)} />
        <br />
        {/* <label>Email: </label> */}
        <input type='text' name='email' className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Avatar: </label>
        <img src={`http://127.0.0.1:8000${avatar}`} style={{'width':'100px', 'height':'100px'}} />
        <input type="file" className='form-control-files' id="avatar" accept="image/png, image/jpg" onChange={handleImageChange} />
        <br />
        <input type='submit' value='Submit' className='btn btn-primary btn-lg'/>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth
});

export default connect(mapStateToProps)(MyInfo);