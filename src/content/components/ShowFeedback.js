import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import QuestionSelector from '../components/QuestionSelector';
import FeedbackForm from '../components/FeedbackForm';

const ShowFeedback = (props) => {

    const handleQuestionClick = (event) => {
        props.setSelectedQuestion(event.target.value)
        props.setSelectedCategory(event.target.name)
        console.log(props.selectedQuestion)
    };

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
                <Box className={props.classes.banner}>
                    <div className="feedback-instructions">
                    <h1>feedback</h1>
                    <Grid item xs={4}>
                    <p>Talk or type in the text box and submit to get instant feedback on your response!</p>
                    </Grid> 
                    </div>
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <FeedbackForm 
                    className={props.classes.feedback}
                    selectedQuestion={props.selectedQuestion}
                    selectedCategory={props.selectedCategory}
                    setAnalysis={props.setAnalysis}
                    setQuestion={props.setQuestion}
                    />
                </Grid>
                <Grid item xs={5}>
                <QuestionSelector handleQuestionClick={handleQuestionClick}/>
                </Grid>  
            </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ShowFeedback;