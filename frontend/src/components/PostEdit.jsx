import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const PostEdit = (props) => {
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");

  console.log(props)
    const handleImageChange = (e) => {
    e.preventDefault()
    setImg(e.target.files[0])
  }
    const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    if(img) {
    formData.append('avatar', img, img['name'])
    }
    formData.append('title', title)
    formData.append('company_website', website)
    formData.append('description', description)
    formData.append('id', props.match.params.postId)
  const res =  axios.patch(`http://127.0.0.1:8000/api/post/${props.match.params.id}`, formData, {
     headers: {
    'content-type': 'multipart/form-data',
    'Authorization': `Token ${props.user.token}`
  }});
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
        <input type='text' id="company_website" className='form-control' placeholder='company website' value={website} onChange={e => setWebsite(e.target.value)}/>
        <br />
        {/* <label>Product Image: </label> */}
        <input type="file" id="image" className='form-control-file' accept="image/png, image/jpg" onChange={handleImageChange} />
        <br />
        {/* <label>Description: </label> */}
        <textarea className='form-control' placeholder='Description...' value={description} id="description" onChange={(e) => setDescription(e.target.value)} />
        <br />
        <input type='submit' className='btn btn-dark' />
        </div>
        </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(PostEdit);

// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import axios from 'axios';

// import './MyInfo.css';


//   const handleImageChange = (e) => {
//     e.preventDefault()
//     setImgUpload(e.target.files[0])
//     console.log(imgUpload)
//   }
//   const onSubmit = (e) => {
//     e.preventDefault()
//     const formData = new FormData()
//     if(imgUpload) {
//     formData.append('avatar', imgUpload, imgUpload['name'])
//     }
//     formData.append('first_name', first)
//     formData.append('last_name', last)
//     formData.append('email', email)
//     formData.append('username', username)
//     formData.append('id', user.id)
//     // console.log(imgUpload, imgUpload['name'])
//   const res =  axios.post(`http://127.0.0.1:8000/info/myinfo/`, formData, {
//      headers: {
//     'content-type': 'multipart/form-data',
//     'Authorization': `Token ${props.user.token}`
//   }});
//   console.log(res)
//   }
//   return (
//     <div id='myinfo-form'>
//       <form onSubmit={onSubmit}>
//         {/* <label>First Name: </label> */}
//         <input type='text' className='form-control' placeholder='First Name' name='fname' value={first} onChange={(e) => setFirst(e.target.value)} />
//         <br />
//         {/* <label>Last Name: </label> */}
//         <input type='text' name='lname' className='form-control' placeholder='Last Name'  value={last} onChange={(e) => setLast(e.target.value)} />
//         <br />
//         {/* <label>Email: </label> */}
//         <input type='text' name='email' className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
//         <br />
//         <label>Avatar: </label>
//         <img src={`http://127.0.0.1:8000${avatar}`} style={{'width':'100px', 'height':'100px'}} />
//         <input type="file" className='form-control-files' id="avatar" accept="image/png, image/jpg" onChange={handleImageChange} />
//         <br />
//         <input type='submit' value='Submit' className='btn btn-dark btn-lg'/>
//       </form>
//     </div>
//   )
// }

// const mapStateToProps = (state) => ({
//   user: state.auth
// });

// export default connect(mapStateToProps)(MyInfo);