import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import ShowAnalysis from '../components/ShowAnalysis';
import ShowFeedback from '../components/ShowFeedback';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 2,
        fontSize: '10em',
        color: 'white',
        height: '5em',
        padding: theme.spacing(20, 10)
    },
    banner: {
        backgroundColor: "#90caf9",
        height: '100%',
        color: "#000",
        fontSize: "2rem",
        paddingLeft: "50px",
        paddingTop: "25px"
    },
    feedbackLogo: {
        flexGrow: 2,
        border: "1px solid black"
    },
    analysis: {
        fontSize: "0.5em"
    },
    moreFeedback: {
        color: "#0235F4"
    }

}));

const GetFeedback = (props) => {
      // pass down as properties to QuestionSelector
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    // const [analysis, setAnalysis] = useState(false);
    // question object with analysis in it sent from server
    const [question, setQuestion] = useState({
      category: '',
      content: '',
      answer: '',
      analysis: {
        negativeMentions: [],
        overallScore: '',
        overallMagnitude: '',
        overallFeedback: ''
      }
    });
 
    const classes = useStyles()

    const gettingFeedback = (
        <ShowFeedback
        classes={classes}
        selectedCategory={selectedCategory}
        selectedQuestion={selectedQuestion}
        setSelectedCategory={setSelectedCategory}
        setSelectedQuestion={setSelectedQuestion}
        setQuestion={setQuestion}
        />
    )
    console.log('question:', question);

    // map the negative mentions into something pretty -- this array can be empty sometimes (nothing was mentioned negatively)
    const negativity = ( question.analysis.negativeMentions.map( negativeMention => {
        return (
            <div>
            <strong>{negativeMention}</strong> was mentioned negatively. Consider reframing your experience with <strong>{negativeMention}</strong> . 
            </div>
            )
        })
    )

    const gettingAnalysis = (
        <div>
            <ShowAnalysis
            classes={classes}
            question={question}
            negativity={negativity}
            />
        </div>
    )

    return (
            <div>
                {props.analysis ? gettingAnalysis : gettingFeedback}
            </div>
    );
};

export default GetFeedback;