import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import './Suggestion.css';

const Suggestions = (props) => {
  const [suggestion, setSuggestion] = useState("");
  
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
    <div id='suggestion-form'>
      <h2 style={{'color': 'white'}}>Make a suggestion!</h2>
      <form onSubmit={onSubmit}>
        <textarea value={suggestion} className='form-control' placeholder='Suggestion...' onChange={e => setSuggestion(e.target.value)} />
        <br />
        <input type='submit' className='btn btn-primary btn-lg' />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}


export default connect(mapStateToProps)(Suggestions);
