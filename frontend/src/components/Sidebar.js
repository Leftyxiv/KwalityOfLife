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
            <Nav.Item>
                <Link to="/feed">Feed</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/createpost">Create a post</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/inbox">Inbox</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/outbox">Outbox</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/createmessage">Send Message</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="notifications">Notifications</Link>
            </Nav.Item>
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