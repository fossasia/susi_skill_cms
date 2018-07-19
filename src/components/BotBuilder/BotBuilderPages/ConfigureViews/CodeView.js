import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

class CodeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorTheme: 'github',
      fontSizeCode: 14,
      code: this.props.configure.code,
    };
  }

  handleChangeCode = event => {
    this.setState({ code: event }, () => this.sendInfoToProps());
  };

  sendInfoToProps = () => {
    this.props.configure.sendInfoToProps({
      code: this.state.code,
    });
  };

  render() {
    return (
      <div>
        <AceEditor
          mode="java"
          theme={this.state.editorTheme}
          width="100%"
          fontSize={this.state.fontSizeCode}
          height="300px"
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
      </div>
    );
  }
}

CodeView.propTypes = {
  configure: PropTypes.object,
};

export default CodeView;
