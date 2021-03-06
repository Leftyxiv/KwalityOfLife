// DASHBOARD TEMPLATE BORROWED FROM https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap

import React from "react";
import { Switch, Route } from 'react-router';
import {Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "./Sidebar";
import './Dash.css';

import Landing from './Landing';
import PostList from './PostList';
import LoginForm from './LoginForm';
import PostWrapper from './PostWrapper';
import Inbox from './Inbox';
import Outbox from './Outbox';
import Notifications from './Notifications';
import DirectMessage from './DirectMessage';
import CreatePost from './CreatePost';
import Suggestions from './Suggestions';
import ProfilePage from './ProfilePage';
import MyInfo from './MyInfo';
import PostEdit from './PostEdit';

const Dash = props => {
  let name = ['','']
  if(localStorage.getItem('user')){
    const thisuser = localStorage.getItem('user');
    const regex = /{"username":"(\w+)"}/
    name = thisuser.match(regex)
  }
    return (
        <>
         <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                      <Sidebar />
                    </Col>
                    <Col  xs={10} id="page-content-wrapper" style={{'paddingTop': '75px'}}>
                    <Switch>
          <Route exact path="/" render={() => <Landing />} />
          <Route exact path="/feed" render={() => <PostList />} />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/post/:postId" component={PostWrapper} />
          <Route exact path="/post/:postId/edit" component={PostEdit} />
          
          <Route exact path="/inbox" render={() => <Inbox name={name[1]} />} />
          <Route exact path="/outbox" render={() => <Outbox name={name[1]} />} />
          <Route exact path="/notifications" render={() => <Notifications name={name[1]} />} />
          <Route exact path="/createmessage" render={() => <DirectMessage />} />
          <Route exact path="/createpost" render={() => <CreatePost />} />
          <Route exact path="/suggestions" render={() => <Suggestions />} />
          <Route exact path="/user/:id" render={(props) => <ProfilePage { ...props } /> } />
          <Route exact path="/myinfo" render={(props) => <MyInfo { ...props } /> } />
        </Switch>
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };
  const Dashboard = withRouter(Dash);
  export default Dashboard;