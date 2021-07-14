import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const ProfilePage = (props) => {
  const [user, setUser] = useState({});
  // console.log(props.match.params.id)

  const fetchInfo = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/customuser/${props.match.params.id}`, {
      headers: {
        'Authorization': `Token ${props.auth.token}`
      }
    });
    setUser(res.data)
  };
  useEffect(() => {
    fetchInfo()
    return () => {
    }
  }, [])

  return (
    <div style={{ 'paddingTop': '150px' }}>
      <div className="card">
          <img src={user.avatar} class="card-img-top" alt={`${user.username}'s avatar`} />
          <div class="card-body">
            <h4 class="card-title">{ `${user.username}` }</h4>
            <h5 class="card-title">{ `${user.first_name}  ${user.last_name}` }</h5>
            <p class="card-text">{ user.email }</p>
            <Link to="/createmessage" class="btn btn-primary">Send Message</Link>
          </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(ProfilePage);
