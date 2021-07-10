// DASHBOARD TEMPLATE BORROWED FROM https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap

import React from "react";
import { Switch, Route } from 'react-router';
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "./Sidebar";
import './Dash.css';

import Navbar from './Navbar';
import Landing from './Landing';
import PostCard from './PostCard';
import PostList from './PostList';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import PostWrapper from './PostWrapper';
import Inbox from './Inbox';
import Outbox from './Outbox';

const Dash = props => {
  const thisuser = localStorage.getItem('user');
    const regex = /{"username":"(\w+)"}/
    const name = thisuser.match(regex)
    console.log(name[1])
    return (
        <>
         <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      <Sidebar />
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                    <Switch>
          <Route exact path="/" render={() => <Landing />} />
          <Route exact path="/feed" render={() => <PostList />} />
          <Route exact path="/signup" render={() => <SignupForm />} />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/post/:postId" component={PostWrapper} />
          <Route exact path="/inbox" render={() => <Inbox name={name[1]} />} />
          <Route exact path="/outbox" render={() => <Outbox name={name[1]} />} />
        </Switch>
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  const Dashboard = withRouter(Dash);
  export default Dashboard;