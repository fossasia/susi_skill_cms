import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import RaisedButton from 'material-ui/RaisedButton';
import Cookies from 'universal-cookie';
import { Paper } from 'material-ui';
import colors from '../../Utils/colors';
import './BotBuilder.css';

const cookies = new Cookies();

class BotBuilder extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showCode:false,
            showCodeContact:false
        }
    }

    handleClickGenerate = () =>{
        this.setState({showCode:true});
    }

    handleClickGenerateContact = () => {
        this.setState({showCodeContact:true});
    }

    render() {
        const style = {
          width: '100%',
          padding: '30px',
          textAlign: 'center',
          marginTop:'20px'
        };
        return(
          <div>
            <StaticAppBar {...this.props} />
            <div style={styles.home}>
              <Paper style={style} zDepth={1}>
                <h1 style={styles.bg}>Integrate SUSI chat in your website</h1>
                <br/>
                <RaisedButton
                  label='Generate JavaScript code'
                  backgroundColor={colors.header}
                  labelColor='#fff'
                  onClick={this.handleClickGenerate}
                />
                <br/><br/>
                <div className={'code-wrap '+(this.state.showCode?'show':'hide')}>
                  <div className="code-box">
                    <code>
                      &lt;script type=&quot;text/javascript&quot; src=&quot;https://skills.susi.ai/susi-chatbot.js&quot;&gt;&lt;/script&gt;
                    </code>
                  </div>
                  <h4>Paste the above code just above <i>&lt;/body&gt;</i>
                  tag in your website</h4>
                </div>
                <br/><br/>
                <RaisedButton
                  label='Generate JavaScript code for contact bot'
                  backgroundColor={colors.header}
                  labelColor='#fff'
                  onClick={this.handleClickGenerateContact}
                />
                <br/><br/>
                <div className={'code-wrap '+(this.state.showCodeContact?'show':'hide')}>
                  <div className="code-box">
                    <code>
                      &lt;script type=&quot;text/javascript&quot; id=&quot;susi-bot-script&quot; data-token=&quot;{cookies.get('loggedIn')}&quot; src=&quot;https://skills.susi.ai/susi-contactbot.js&quot;&gt;&lt;/script&gt;
                    </code>
                  </div>
                  <h4>Paste the above code just above <i>&lt;/body&gt;</i>
                  tag in your website</h4>
                </div>
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
