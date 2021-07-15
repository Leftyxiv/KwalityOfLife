import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


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
    <div style={{'paddingTop':'150px'}}>
      <form onSubmit={onSubmit}>
        <label>First Name: </label>
        <input type='text' name='fname' value={first} onChange={(e) => setFirst(e.target.value)} />
        <br />
        <label>Last Name: </label>
        <input type='text' name='lname' value={last} onChange={(e) => setLast(e.target.value)} />
        <br />
        <label>Email: </label>
        <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <img src={avatar} style={{'width':'100px', 'height':'100px'}} />
        <label>Avatar: </label>
        <input type="file" id="avatar" accept="image/png, image/jpg" onChange={handleImageChange} />
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth
});

export default connect(mapStateToProps)(MyInfo);