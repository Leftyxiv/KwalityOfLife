// SIDEBAR TEMPLATE COURTESY OF https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap
import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
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
                <Nav.Link href="/feed">Feed</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/createpost">Create a post</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/inbox">Inbox</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/outbox">Outbox</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/createmessage">Send Message</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="notifications">Notifications</Nav.Link>
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