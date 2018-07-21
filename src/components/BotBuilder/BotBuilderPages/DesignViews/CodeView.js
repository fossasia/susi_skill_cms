import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/mode/java';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import 'brace/ext/searchbox';
import CircularProgress from 'material-ui/CircularProgress';

class CodeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      botbuilderBackgroundBody: '#ffffff',
      botbuilderBodyBackgroundImg: '',
      botbuilderUserMessageBackground: '#0077e5',
      botbuilderUserMessageTextColor: '#ffffff',
      botbuilderBotMessageBackground: '#f8f8f8',
      botbuilderBotMessageTextColor: '#455a64',
      botbuilderIconColor: '#000000',
      botbuilderIconImg: '',
      editorTheme: 'github',
      fontSizeCode: 14,
      code: this.props.design.code,
      loadedSettings: false,
    };
  }

  componentDidMount() {
    this.getSettings();
  }

  handleChangeCode = event => {
    this.setState({ code: event }, () => this.sendInfoToProps());
    this.getSettings();
  };

  updateSettings = () => {
    let settingsString = JSON.stringify(this.state);
    this.props.design.updateSettings(settingsString);
  };

  sendInfoToProps = () => {
    this.props.design.sendInfoToProps({
      code: this.state.code,
    });
    this.updateSettings();
  };

  getSettings = () => {
    let code = this.state.code;
    const bodyBackgroundMatch = code.match(/^::bodyBackground\s(.*)$/m);
    const bodyBackgroundImageMatch = code.match(
      /^::bodyBackgroundImage\s(.*)$/m,
    );
    const userMessageBoxBackgroundMatch = code.match(
      /^::userMessageBoxBackground\s(.*)$/m,
    );
    const userMessageTextColorMatch = code.match(
      /^::userMessageTextColor\s(.*)$/m,
    );
    const botMessageBoxBackgroundMatch = code.match(
      /^::botMessageBoxBackground\s(.*)$/m,
    );
    const botMessageTextColorMatch = code.match(
      /^::botMessageTextColor\s(.*)$/m,
    );
    const botIconColorMatch = code.match(/^::botIconColor\s(.*)$/m);
    const botIconImageMatch = code.match(/^::botIconImage\s(.*)$/m);

    if (bodyBackgroundMatch) {
      this.setState({
        botbuilderBackgroundBody: bodyBackgroundMatch[1],
      });
    }
    if (bodyBackgroundImageMatch) {
      this.setState({
        botbuilderBodyBackgroundImg: bodyBackgroundImageMatch[1],
      });
    }
    if (userMessageBoxBackgroundMatch) {
      this.setState({
        botbuilderUserMessageBackground: userMessageBoxBackgroundMatch[1],
      });
    }
    if (userMessageTextColorMatch) {
      this.setState({
        botbuilderUserMessageTextColor: userMessageTextColorMatch[1],
      });
    }
    if (botMessageBoxBackgroundMatch) {
      this.setState({
        botbuilderBotMessageBackground: botMessageBoxBackgroundMatch[1],
      });
    }
    if (botMessageTextColorMatch) {
      this.setState({
        botbuilderBotMessageTextColor: botMessageTextColorMatch[1],
      });
    }
    if (botIconColorMatch) {
      this.setState({
        botbuilderIconColor: botIconColorMatch[1],
      });
    }
    if (botIconImageMatch) {
      this.setState({
        botbuilderIconImg: botIconImageMatch[1],
      });
    }

    this.setState(
      {
        loadedSettings: true,
      },
      () => this.updateSettings(),
    );
  };

  render() {
    return (
      <div style={{ marginBottom: '40px' }}>
        {!this.state.loadedSettings ? (
          <div className="center">
            <CircularProgress size={62} color="#4285f5" />
            <h4>Loading</h4>
          </div>
        ) : (
          <AceEditor
            mode="java"
            theme={this.state.editorTheme}
            width="100%"
            fontSize={this.state.fontSizeCode}
            height="200px"
            value={this.state.code}
            onChange={this.handleChangeCode}
            showPrintMargin={false}
            name="skill_code_editor"
            scrollPastEnd={false}
            wrapEnabled={true}
            editorProps={{ $blockScrolling: true }}
            style={{
              resize: 'vertical',
              overflowY: 'scroll',
              minHeight: '200px',
            }}
          />
        )}
      </div>
    );
  }
}

CodeView.propTypes = {
  design: PropTypes.object,
};

export default CodeView;
