import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import FlashMessage from '../components/FlashMessage';
import axios from 'axios';
import GetSpeech from './GetSpeech';
import GetText from './GetText';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const FeedbackForm = (props) => {
    const [isListening, setIsListening] = useState(false)
    const [inputs, setInputs] = useState({
      answer: '',
      content: '',
      category: ''
    });

    // here we will handle the change in the text user types
    const handleInputChange = e => {
      // e.persist();
      console.log(`Making a change to ${e.target.name}`)
      setInputs({...props.inputs, [e.target.name]: e.target.value})
  }

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

    // set up all the speech logic

    const startListening = () => {
      SpeechRecognition.startListening({ continuous: true })
      setIsListening(true)
    }

    const stopListening = () => {
        SpeechRecognition.stopListening()
        setIsListening(false)
    }
    
    const {interimTranscript, transcript, finalTranscript, resetTranscript } = useSpeechRecognition()

    // for speech form only
    useEffect(() => {
        if (interimTranscript !== '') {
            // console.log('Got interim result:', interimTranscript)
            setInputs({
                answer: transcript,
                content: props.selectedQuestion,
                category: props.selectedCategory
            })
        }
        if (finalTranscript !== '') {
            // console.log('Got final result:', finalTranscript)
        }
    }, [interimTranscript, finalTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }
        
    const handleSubmit = e => {
      e.preventDefault();
      // mount props on input without setting state to handle edgecase
      inputs.content = props.selectedQuestion;
      inputs.category = props.selectedCategory;
      // get the current user from the jwt token
      const decoded = jwt_decode(localStorage.getItem('jwtToken'));
      console.log(`${process.env.REACT_APP_SERVER_URL}users/${decoded.id}/questions`)
      axios.post(`${process.env.REACT_APP_SERVER_URL}users/${decoded.id}/questions`, inputs)
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
        startListening={startListening}
        stopListening={stopListening}
        resetTranscript={resetTranscript}
        transcript={transcript}
        /> 
    )

    const displayWriteForm = (
       <GetText
       handleSubmit={handleSubmit}
       setInputs={setInputs}
       inputs={inputs}
       startListening={startListening}
       stopListening={stopListening}
       resetTranscript={resetTranscript}
       transcript={transcript}
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