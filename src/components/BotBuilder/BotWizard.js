import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import {Grid, Col, Row} from 'react-flexbox-grid';
import colors from '../../Utils/colors';
import Build from './BotBuilderPages/Build';
import Design from './BotBuilderPages/Design';
import Configure from './BotBuilderPages/Configure';
import Deploy from './BotBuilderPages/Deploy';
import { Paper } from 'material-ui';
import './BotBuilder.css';
import $ from 'jquery';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ContactBot extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            showPreview:false,
            chatbotOpen: false
        }
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 3,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <Build />;
            case 1:
                return <Design />;
            case 2:
                return <Configure />;
            case 3:
                return <Deploy />;
            default:
        }
    }

    componentWillUnmount = () =>{
      this.handleChatbotClose();
    }

    handleChatbotOpen = () =>{
      this.setState({
        chatbotOpen:true
      });
    }

    handleChatbotClose = () =>{
      this.setState({
        chatbotOpen:false
      });
      $('#susi-launcher-container').remove();
      $('#susi-frame-container').remove();
      $('#susi-launcher-close').remove();
      $('#susi-bot-script').remove();
    }

    injectJS = () => {
        const myscript = document.createElement('script');
        myscript.type = 'text/javascript';
        myscript.id = 'susi-bot-script';
        myscript.setAttribute('data-token',cookies.get('loggedIn'));
        myscript.src = '/susi-chatbot.js';
        myscript.async = true;
        document.body.appendChild(myscript);
        this.setState({
            chatbotOpen:true
        });
    };

	render() {
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
		return (
			<div>
				<StaticAppBar {...this.props} />
				<div style={styles.home} className="botbuilder-page-wrapper">
					<Paper style={styles.paperStyle} className="botBuilder-page-card" zDepth={1}>
                        <Grid>
                            <Row>
                                <Col xs={12} md={9}>
                                    <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                                        <Stepper activeStep={stepIndex}>
                                            <Step>
                                                <StepLabel>Build</StepLabel>
                                            </Step>
                                            <Step>
                                                <StepLabel>Design</StepLabel>
                                            </Step>
                                            <Step>
                                                <StepLabel>Configure</StepLabel>
                                            </Step>
                                            <Step>
                                                <StepLabel>Deploy</StepLabel>
                                            </Step>
                                        </Stepper>
                                        <div style={contentStyle}>
                                            <p>{this.getStepContent(stepIndex)}</p>
                                            <div style={{marginTop: '20px'}}>
                                                <RaisedButton
                                                    label="Back"
                                                    disabled={stepIndex === 0}
                                                    backgroundColor={colors.header}
                                                    labelColor='#fff'
                                                    onTouchTap={this.handlePrev}
                                                    style={{marginRight: 12}}
                                                />
                                                {(stepIndex<3) ? (
                                                <RaisedButton
                                                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                                                    backgroundColor={colors.header}
                                                    labelColor='#fff'
                                                    onTouchTap={this.handleNext}
                                                    />
                                                ) : (
                                                    <p style={{'padding': '20px 0px 0px 0px' , 'font-family': 'sans-serif', 'font-size': '14px'}}>You&apos;re all done. Thanks for using SUSI Bot.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={3} style={{textAlign:window.innerWidth>769?'right':'left', padding:window.innerWidth<350?'40px 20px 20px 20px':''}}>
                                    {!this.state.chatbotOpen?(<RaisedButton
                                        label='Preview'
                                        style={{ width: '148px' }}
                                        onClick={this.injectJS}
                                    />):(<RaisedButton
                                        label='Close Preview'
                                        style={{ width: '148px' }}
                                        onClick={this.handleChatbotClose}
                                    />)}
                                </Col>
                            </Row>
                        </Grid>
					</Paper>
				</div>
		 	</div>
		);
	}
}

const styles = {
	home: {
        width: '100%'
    },
	paperStyle: {
		width: '100%',
		marginTop:'20px'
	}
}

export default ContactBot;
