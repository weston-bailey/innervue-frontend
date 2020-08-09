import React from 'react';
import FeedbackLogo from '../components/FeedbackLogo';
import Paper from '@material-ui/core/Paper';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const ShowAnalysis = (props) => {
    return (
        <div>
            <Grid container spacing={6}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                    <Box className={props.classes.banner}>
                        <h1 >analysis</h1>
                        <Grid container spacing={6}>
                            <Grid item xs={6}>
                                <Paper variant="outlined" ><p className={props.classes.analysis}><strong>Question category:</strong> {props.question.category}</p>
                                <p className={props.classes.analysis}><strong>The question you selected:</strong> {props.question.content}</p>
                                <p className={props.classes.analysis}><strong>Your response:</strong> {props.question.answer}</p>
                                <p className={props.classes.analysis}><strong>Your overall sentiment score:</strong> {props.question.analysis.overallMagnitude} {props.question.analysis.overallScore} </p>
                                <p className={props.classes.analysis}><strong>Our feedback:</strong> {props.question.analysis.overallFeedback}</p>
                                <p className={props.classes.analysis}>{props.negativity}</p>
                                </Paper>
                                <Button className={props.classes.moreFeedback} color="secondary" variant="contained">
                                    <Link className="nav-link" to="/feedback" onClick={() => {
                                        props.setAnalysis(false)
                                        }}>Get More Feedback</Link>
                                </Button>
                            </Grid>
                            <Grid item xs={6}><FeedbackLogo className={props.classes.feedbackLogo}/></Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default ShowAnalysis;