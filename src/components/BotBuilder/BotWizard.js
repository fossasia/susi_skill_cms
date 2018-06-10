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
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const locationBot = '/BotPreview.html?access='+cookies.get('loggedIn')+'&type=botWindow';
const locationAvatar = '/BotAvatarPreview.html?access='+cookies.get('loggedIn')+'&type=botAvatar';

class ContactBot extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0
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
                                <div style={{display: 'flex', 'flex-direction':window.innerWidth>769?'row':'column'}}>
                                <Col xs={12} md={8} lg={8}>
                                    <div style={{width: '100%', 'max-width': '100%', margin: 'auto'}}>
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
                                <Col xs={12} md={4} lg={4} style={{textAlign:window.innerWidth>769?'right':'left', borderLeft:'1px solid rgb(66, 133, 244)', padding:'0.01em 16px'}}>
                                    <br className='display-mobile-only'/>
                                    <h2 style={{padding:'10px 0 10px 10px', textAlign:'left'}}>Preview</h2><br/>
                                    <div style={{position:'relative', overflow:'hidden'}}>
                                        <iframe title="botPreview" name="frame-name" id="frame-1" src={locationBot} height="600px" style={styles.iframe}></iframe>
                                        <iframe title="botAvatarPreview" name="frame-2" id="frame-2" src={locationAvatar} height="100px" style={styles.iframe}></iframe>
                                    </div>
                                </Col>
                                </div>
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
    bg: {
        textAlign: 'center',
        padding: '30px',
    },
    paperStyle: {
        width: '100%',
        marginTop:'20px',
    },
    tabStyle: {
        color:'rgb(91, 91, 91)'
    },
    iframe: {
        '-moz-border-radius': '12px',
        '-webkit-border-radius': '12px',
        'border-radius': '12px',
        'max-width': '100%',
        margin:'0',
        padding:'0',
        border:'1px solid #ccc',
        overflow:'hidden'
    }
};

export default ContactBot;
