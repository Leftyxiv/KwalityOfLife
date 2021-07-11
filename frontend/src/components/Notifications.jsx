import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Notification from './Notification';
import './Notifications.css';

const Notifications = ({ name }) => {
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/notifications/${name}`);
    setNotifications(res.data);
  }
  useEffect(() => {
    fetchNotifications()
    return () => {
    }
  }, [])

  return (
    <div className="notifyDiv">
      { notifications.map(not => <Notification user={not.user} text={not.text} />)}
    </div>
  )
}

export default Notifications;
