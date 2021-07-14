import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { connect } from 'connected-react-router';


const ProfilePage = (props) => {
  const [user, setUser] = useState({});

  fetchInfo = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/customusers/${user.id}`)
  }
  return (
    <div>
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(ProfilePage);
