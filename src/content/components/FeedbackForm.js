import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import FlashMessage from '../components/FlashMessage';
import axios from 'axios';
import GetSpeech from './GetSpeech';
import GetText from './GetText';

const FeedbackForm = (props) => {
    const [isListening, setIsListening] = useState(false)
    const [inputs, setInputs] = useState({
      answer: '',
      content: '',
      category: ''
    });

    // if a status message should be shown from the server
    const [showStatusMessage, setShowStatusMessage] = useState(false);
    // the message form the server
    const [statusMessage, setStatusMessage] = useState({
      type: '',
      title: '',
      content: ''
    });
    
    const handleCloseStatusMessage = () => {
      setShowStatusMessage(false);
    };
        
    // here we will handle the change in the text user types
    const handleInputChange = e => {
        // e.persist();
        console.log(`Making a change to ${e.target.name}`)
        setInputs({...inputs, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = e => {
      e.preventDefault();
      // mount props on input without setting state to handle edgecase
      inputs.content = props.selectedQuestion;
      inputs.category = props.selectedCategory;
      // get the current user from the jwt token
      const decoded = jwt_decode(localStorage.getItem('jwtToken'));
      console.log(`${process.env.REACT_APP_SERVER_URL}/users/${decoded.id}/questions`)
      axios.post(`${process.env.REACT_APP_SERVER_URL}/users/${decoded.id}/questions`, inputs)
      .then(response => {
          if (response.status === 201) {
              props.setQuestion(response.data)
              props.setAnalysis(true)
          } else {
            // set state for server status message and re render
            setStatusMessage(response.data.message);
            setShowStatusMessage(true);
          }
      })
      .catch(err => console.log(err))
    }

    const displaySpeechForm = (
        <GetSpeech 
        setIsListening={setIsListening}
        setInputs={setInputs}
        handleSubmit={handleSubmit}
        /> 
    )

    const displayWriteForm = (
       <GetText
       handleInputChange={handleInputChange}
       handleSubmit={handleSubmit}
       /> 
    )

    // get one where we are talking into it, or one where we are supposed to write
    let correctForm = isListening ? displaySpeechForm : displayWriteForm
    
    return (
        <div className="show-correct-form">
            <FlashMessage 
              statusMessage={statusMessage} 
              handleCloseStatusMessage={handleCloseStatusMessage} 
              setShowStatusMessage={setShowStatusMessage}
              showStatusMessage={showStatusMessage}
            />
            {correctForm}
        </div>
    )
}

export default FeedbackForm;