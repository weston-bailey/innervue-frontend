import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const SpeechForm = (props) => {
    return (
            <form className="feedbackBtn" onSubmit={
            props.handleSubmit}>
                <br />
            <TextareaAutosize 
                name="answer"
                className="feedback-form-box"
                rowsMin={20}
                value={props.transcript}
                >Transcription:
            </TextareaAutosize>
            <Grid item xs={12}>
            <Button className="where" variant="outlined" color="secondary" type="submit">Get Feedback</Button>
            </Grid>
        </form>
    );
};

export default SpeechForm;