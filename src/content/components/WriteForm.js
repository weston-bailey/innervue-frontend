import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const WriteForm = (props) => {

    // here we will handle the change in the text user types
    const handleInputChange = e => {
        // e.persist();
        console.log(`Making a change to ${e.target.name}`)
        props.setInputs({...props.inputs, [e.target.name]: e.target.value})
    }
    
    return (
        <form onSubmit={props.handleSubmit}>    
            <br />
                <TextareaAutosize 
                    className="feedback-form-box"
                    name="answer"
                    onChange={handleInputChange}
                    rowsMin={20}>
                </TextareaAutosize>
                <Grid item xs={12} className="feedbackBtn">
                <Button variant="outlined" color="secondary" onSubmit={props.handleSubmit} type="submit">Get Feedback</Button>
                </Grid>
        </form>

    );
};

export default WriteForm;