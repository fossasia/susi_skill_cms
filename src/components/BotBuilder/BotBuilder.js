import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid, Col, Row} from 'react-flexbox-grid';
import { Paper } from 'material-ui';
import colors from '../../Utils/colors';
import './BotBuilder.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const locationBot = '/BotPreview.html?access='+cookies.get('loggedIn')+'&type=botWindow';
const locationAvatar = '/BotAvatarPreview.html?access='+cookies.get('loggedIn')+'&type=botAvatar';

class BotBuilder extends React.Component {
    render() {
        if(!cookies.get('loggedIn'))
        {
            return (
                <div>
                    <StaticAppBar {...this.props} />
                    <div>
                        <p style={styles.loggedInError}>
                            Please login to create a skill bot.
                        </p>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <StaticAppBar {...this.props} />
                <div style={styles.home} className="botbuilder-page-wrapper">
                    <Paper style={styles.paperStyle} className="botBuilder-page-card" zDepth={1}>
                        <Grid>
                            <Row>
                                <Col xs={12} md={12}>
                                    <div style={{textAlign: 'center'}}>
                                    <Link to="/botbuilder/contactbot">
                                        <RaisedButton
                                            label='Use pre-coded Contact Bot'
                                            backgroundColor={colors.header}
                                            labelColor='#fff'
                                        />
                                    </Link>
                                    </div>
                                    <br /><h2 style={{textAlign: 'center'}}> OR </h2><br />
                                    <div style={{textAlign: 'center'}}>
                                        <Link to="/botbuilder/botwizard">
                                            <RaisedButton
                                                label='Create your own SUSI AI Web bot'
                                                backgroundColor={colors.header}
                                                labelColor='#fff'
                                                onClick={this.toggleCreateBotWizard}
                                            />
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                    </Paper>
                </div>
              </div>
        )
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
    previewButtonStyle: {
        width: '100px',
        marginTop:'50px'
    },
    loggedInError: {
        textAlign:'center',
        textTransform:'uppercase',
        fontWeight:'bold',
        marginBottom: '100px',
        fontSize: '50px',
        marginTop: '300px'
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

BotBuilder.propTypes = {
};

export default BotBuilder;
