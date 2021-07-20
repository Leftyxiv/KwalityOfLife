import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const ProfilePage = (props) => {
  const [user, setUser] = useState({});

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
          <img src={user.avatar} className="card-img-top" alt={`${user.username}'s avatar`} />
          <div className="card-body">
            <h4 className="card-title">{ `${user.username}` }</h4>
            <h5 className="card-title">{ `${user.first_name}  ${user.last_name}` }</h5>
            <p className="card-text">{ user.email }</p>
            <Link to="/createmessage" className="btn btn-primary">Send Message</Link>
          </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(ProfilePage);
