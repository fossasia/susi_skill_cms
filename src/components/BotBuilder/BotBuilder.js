import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Grid, Col, Row} from 'react-flexbox-grid';
import { Paper } from 'material-ui';
import colors from '../../Utils/colors';
import Build from './BotBuilderPages/Build';
import Design from './BotBuilderPages/Design';
import Configure from './BotBuilderPages/Configure';
import Deploy from './BotBuilderPages/Deploy';
import './BotBuilder.css';

class BotBuilder extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            activeTab: 0,
            showPreview:false
        }
    }

    handleChange = (event, value) => {
        this.setState({ activeTab: value });
    }

    handlePreview = () =>{
        this.setState(prevState => ({
            showPreview:!prevState.showPreview
        }));
    }

    render() {
        return(
            <div>
                <StaticAppBar {...this.props} />
                <div style={styles.home} className="botbuilder-page-wrapper">
                    <Paper style={styles.paperStyle} className="botBuilder-page-card" zDepth={1}>
                        <Grid>
                            <Row>
                                <Col xs={12} md={9}>
                                    <Tabs
                                        tabItemContainerStyle={{backgroundColor:'transparent'}}
                                        inkBarStyle={{backgroundColor:'rgb(66, 133, 245)'}} >
                                        <Tab
                                            style={styles.tabStyle}
                                            className='botbuilder-menu-item'
                                            label="Build" >
                                            <Build />
                                        </Tab>
                                        <Tab
                                            style={styles.tabStyle}
                                            className='botbuilder-menu-item'
                                            label="Design" >
                                            <Design />
                                        </Tab>
                                        <Tab
                                            style={styles.tabStyle}
                                            className='botbuilder-menu-item'
                                            label="Configure" >
                                            <Configure />
                                        </Tab>
                                        <Tab
                                            style={styles.tabStyle}
                                            className='botbuilder-menu-item'
                                            label="Deploy" >
                                            <Deploy />
                                        </Tab>
                                    </Tabs>
                                </Col>
                                <Col xs={12} md={3} style={{textAlign:window.innerWidth>769?'right':'left'}}>
                                    <RaisedButton
                                        label='Preview'
                                        onClick={this.handlePreview}
                                        style={styles.previewButtonStyle}
                                        labelStyle={{color:'#ffffff'}}
                                        backgroundColor={colors.header}
                                    />
                                    <div className={'preview-wrap '+(this.state.showPreview?'show':'hide')}>
                                        <h3>(available soon)</h3>
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
    }
};

BotBuilder.propTypes = {
};

export default BotBuilder;
