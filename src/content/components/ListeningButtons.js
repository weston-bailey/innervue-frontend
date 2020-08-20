import React from 'react';
import Button from '@material-ui/core/Button';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import StopIcon from '@material-ui/icons/Stop';

const ListeningButtons = (props) => {
    return (
        <div>
            <Button
                variant="outlined"
                color="secondary"
                startIcon={<KeyboardVoiceIcon />}
                onClick={props.startListening}
                >
                Start
                </Button>
                <Button onClick={props.stopListening}
                startIcon={<StopIcon/>}
                variant="outlined"
                color="secondary"
                >Stop</Button>
                <Button onClick={props.resetTranscript}
                variant="outlined"
                color="secondary"
                >Reset</Button>
        </div>
    );
};

export default ListeningButtons;