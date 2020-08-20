import React from 'react';
import WriteForm from './WriteForm';
import ListeningButtons from './ListeningButtons';
import Grid from '@material-ui/core/Grid';

const GetText = (props) => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} className="feedback-buttons-row">
                <ListeningButtons
                startListening={props.startListening}
                stopListening={props.stopListening}
                resetTranscript={props.resetTranscript}
                transcript={props.transcript}
                />
            </Grid>
            <Grid item xs={6}>
                <WriteForm
                handleInputChange={props.handleInputChange}
                handleSubmit={props.handleSubmit}
                setInputs={props.setInputs}
                />
            </Grid>
        </Grid>
    );
};

export default GetText;