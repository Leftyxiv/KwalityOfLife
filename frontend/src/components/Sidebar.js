// SIDEBAR TEMPLATE COURTESY OF https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap
import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Side = props => {
    return (
        <>
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/home"
            // onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                <ul>
            <li>
                <Link to="/feed">Feed</Link>
            </li>
            <li>
                <Link to="/createpost">Create a post</Link>
            </li>

                <Link to="/inbox">Inbox</Link>

            <li>
                <Link to="/outbox">Outbox</Link>
            </li>
            <li>
                <Link to="/createmessage">Send Message</Link>
            </li>
            <li>
                <Link to="/notifications">Notifications</Link>
            </li>
            <li>
                <Link to="/suggestions">Suggestions</Link>
            </li>
            <li>
                <Link to="/myinfo">My Info</Link>
            </li>
            </ul>
            {/* <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item> */}
            </Nav>
          
        </>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar;