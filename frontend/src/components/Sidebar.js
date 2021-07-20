// SIDEBAR TEMPLATE COURTESY OF https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap
import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Side = props => {
    return (
        <div style={{'paddingTop': '75px'}}>
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/home"
            >
                <div className="sidebar-sticky"></div>
                <ul>
            <li>
                <Link className='sidebar-link' to="/feed">Feed</Link>
            </li>
            <li>
                <Link className='sidebar-link' to="/createpost">Create a post</Link>
            </li>

                <Link className='sidebar-link' to="/inbox">Inbox</Link>

            <li>
                <Link className='sidebar-link' to="/outbox">Outbox</Link>
            </li>
            <li>
                <Link className='sidebar-link' to="/createmessage">Send Message</Link>
            </li>
            <li>
                <Link className='sidebar-link' to="/notifications">Notifications</Link>
            </li>
            <li>
                <Link className='sidebar-link' to="/suggestions">Suggestions</Link>
            </li>
            <li>
                <Link className='sidebar-link' to="/myinfo">My Info</Link>
            </li>
            </ul>
            </Nav>
          
        </div>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar;