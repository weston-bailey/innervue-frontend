import React, { useState, useEffect } from 'react';
import ListeningButtons from './ListeningButtons';
import SpeechForm from './SpeechForm';
import Grid from '@material-ui/core/Grid';

const GetSpeech = (props) => {

    return (
        <Grid container spacing={12}>
        <Grid item xs={12} className="feedback-buttons-row">
            <ListeningButtons 
                startListening={props.startListening}
                stopListening={props.stopListening}
                resetTranscript={props.resetTranscript}
                transcript={props.transcript}
            />
        </Grid>
        <Grid item xs={6}>
            <SpeechForm
            handleSubmit={props.handleSubmit}
            transcript={props.transcript}
            />
        </Grid>
    </Grid>      
    );
};

export default GetSpeech;