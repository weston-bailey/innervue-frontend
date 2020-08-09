import React, { useState, useEffect } from 'react';
import ListeningButtons from './ListeningButtons';
import SpeechForm from './SpeechForm';
import Grid from '@material-ui/core/Grid';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const GetSpeech = (props) => {

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true })
        props.setIsListening(true)
    }

    const stopListening = () => {
        SpeechRecognition.stopListening()
        props.setIsListening(false)
    }
    
    const {interimTranscript, transcript, finalTranscript, resetTranscript } = useSpeechRecognition()

    // for speech form only
    useEffect(() => {
        if (interimTranscript !== '') {
            // console.log('Got interim result:', interimTranscript)
            props.setInputs({
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

    return (
        <Grid container spacing={12}>
        <Grid item xs={12} className="feedback-buttons-row">
            <ListeningButtons 
                startListening={startListening}
                stopListening={stopListening}
                resetTranscript={resetTranscript}
            />
        </Grid>
        <Grid item xs={6}>
            <SpeechForm
            handleSubmit={props.handleSubmit}
            transcript={transcript}
            />
        </Grid>
    </Grid>      
    );
};

export default GetSpeech;