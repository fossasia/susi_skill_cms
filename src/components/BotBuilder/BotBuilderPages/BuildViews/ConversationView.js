import React, {Component} from 'react';
import colors from '../../../../Utils/colors';
import { Paper } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import './ConversationView.css';

class ConversationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Enter text here',
            textType: 'user'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log('The text is: ' + this.state.value);
        if(this.state.textType === 'user') {
            this.handleUserText(this.state.value);
        } else if(this.state.textType === 'bot') {
            this.handleBotText(this.state.value);
        }
        $('#text-box').val('');
        if (this.state.textType === 'bot') {
            this.setState({textType: 'user'});
        } else if (this.state.textType === 'user') {
            this.setState({textType: 'bot'});
        }
        event.preventDefault();
    }

    handleUserText = (text) => {
        var userText = document.createElement('div');
        userText.className = 'user-text-box';
        userText.innerHTML = text;
        $('#message-container').append(userText);
    }

    handleBotText = (text) => {
        var botText = document.createElement('div');
        botText.className = 'bot-text-box';
        botText.innerHTML = text;
        $('#message-container').append(botText);
    }

    render() {
        return(
            <div style={{padding: '10px 10px 20px 10px'}}>
                <Paper id="message-container" style={styles.paperStyle} zDepth={1}>
                </Paper>
                <form onSubmit={this.handleSubmit} style={{marginTop: '15px'}}>
                    <label>
                        {(this.state.textType==='user')?(<div style={{fontSize:'14px'}}>Type the user message:</div>):(<div style={{fontSize:'14px'}}>Type the bot response:</div>)}
                        <input id='text-box' type="text" placeholder={(this.state.textType==='user')?('Enter the user message'):('Enter the bot response')} onChange={this.handleChange} style={styles.textBox}/>
                    </label>
                    <RaisedButton
                        label="Submit"
                        backgroundColor={colors.header}
                        labelColor='#fff'
                        onTouchTap={this.handleSubmit}
                        style={{marginTop: 10}}
                    />
                </form>
            </div>
        );
    }
}

const styles = {
    textBox: {
        width: '100%',
        fontSize: '14px',
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-block',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box'
    },
    paperStyle: {
        width: '100%',
        padding: '20px 20px 20px 20px'
    },
    submitButton: {
        width: '40px',
        backgroundColor: 'rgb(66, 133, 244)',
        color: 'white',
        padding: '14px 20px',
        margin: '8px 0',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    icon: {
        verticleAlign: 'middle'
    }
}

export default ConversationView;
