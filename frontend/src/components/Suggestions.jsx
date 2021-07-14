import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const Suggestions = (props) => {
  const [suggestion, setSuggestion] = useState("");
  const [user, setUser] = useState(-1)
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:8000/suggestions/send/', {
      content: suggestion,
    }, {
      headers: {
        'Authorization': `Token ${props.auth.token}`
      }
    })
    toast.success('Suggestion sent successfully!')
    setSuggestion("");
  }

  return (
    <div style={{ 'paddingTop': '150px' }}>
      <h2>Make a suggestion!</h2>
      <form onSubmit={onSubmit}>
        <textarea value={suggestion} onChange={e => setSuggestion(e.target.value)} />
        <br />
        <input type='submit' />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}


export default connect(mapStateToProps)(Suggestions);
