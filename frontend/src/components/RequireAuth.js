import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';

export default function(Component){
  class AuthenticateComponent extends React.Component{
    constructor(props){
      super(props);
      this.checkAuth();
    }

    componentDidUpdate(prevProps, prevState){
      this.checkAuth();
    }

    checkAuth(){
      if(!this.props.authenticated){
        // const redirect = this.props.location.pathname;
        this.props.dispatch(push(`/`));
       // login?next=${redirect}))
      }
    }

    render(){
      return <div>
        { this.props.authenticated === true ? <Component {...this.props} /> : null }
      </div>
    }
  }


  AuthenticateComponent.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  }

  const mapStateToProps = (state) => {
    return {
      authenticated: state.auth.authenticated,
      token: state.auth.token,
    }
  }

  return connect(mapStateToProps)(AuthenticateComponent);
}