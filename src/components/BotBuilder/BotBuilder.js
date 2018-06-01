import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Paper } from 'material-ui';
import Cookies from 'universal-cookie';
import colors from '../../Utils/colors';
import Builder from './BotBuilderPages/Builder';
import Design from './BotBuilderPages/Design';
import Analytics from './BotBuilderPages/Analytics';
import './BotBuilder.css';

const cookies = new Cookies();
class BotBuilder extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showCode:false,
            activeTab: 0
        }
    }

    handleClickGenerate = () =>{
        this.setState(prevState => ({
            showCode: !prevState.showCode
        }));
    }

    handleChange = (event, value) => {
        this.setState({ activeTab: value });
    };

    render() {
        const style = {
            width: '100%',
            padding: '30px',
            textAlign: 'right',
            marginTop:'20px'
        };
        return(
            <div>
                <StaticAppBar {...this.props} />
                <div style={styles.home}>
                    <Paper style={style} zDepth={1}>
                        <Tabs>
                            <Tab label="Builder">
                                <Builder />
                            </Tab>
                            <Tab label="Design">
                                <Design />
                            </Tab>
                            <Tab label="Analytics">
                                <Analytics />
                            </Tab>
                        </Tabs>
                        <RaisedButton
                            label='Deploy'
                            backgroundColor={colors.header}
                            labelColor='#fff'
                            onClick={this.handleClickGenerate}
                            style={{ width: '100px' }}
                        />
                        <br/><br/>
                        <div className={'code-wrap '+(this.state.showCode?'show':'hide')}>
                            <div className="code-box">
                                <code>
                                    &lt;script type=&quot;text/javascript&quot; id=&quot;susi-bot-script&quot; data-token=&quot;{cookies.get('loggedIn')}&quot; src=&quot;https://skills.susi.ai/susi-chatbot.js&quot;&gt;&lt;/script&gt;
                                </code>
                            </div>
                            <h4>Paste the above code just above <i>&lt;/body&gt;</i>
                            tag in your website</h4>
                        </div>
                        <br />
                        <RaisedButton
                            label='Preview'
                            style={{ width: '100px' }}
                        />
                    </Paper>
                </div>
            </div>
        )
    }
}

    const styles = {
        home: {
            width: '100%',
            padding: '40px 30px 30px',
        },
        bg: {
            textAlign: 'center',
            padding: '30px',
        }
    };

    BotBuilder.propTypes = {
    };

    export default BotBuilder;
