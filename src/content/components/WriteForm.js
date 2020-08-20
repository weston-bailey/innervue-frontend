import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const WriteForm = (props) => {
    
    return (
        <form onSubmit={props.handleSubmit}>    
            <br />
                <TextareaAutosize 
                    className="feedback-form-box"
                    name="answer"
                    onChange={props.handleInputChange}
                    rowsMin={20}>
                </TextareaAutosize>
                <Grid item xs={12} className="feedbackBtn">
                <Button variant="outlined" color="secondary" onSubmit={props.handleSubmit} type="submit">Get Feedback</Button>
                </Grid>
        </form>

    );
};

export default WriteForm;