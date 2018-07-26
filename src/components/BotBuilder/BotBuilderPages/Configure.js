import React, { Component } from 'react';
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
import IconButton from 'material-ui/IconButton';
import Code from 'material-ui/svg-icons/action/code';
import Table from 'material-ui/svg-icons/av/web';
import PropTypes from 'prop-types';
import CodeView from './ConfigureViews/CodeView';
import UIView from './ConfigureViews/UIView';

class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastActiveInfo: false,
      code: this.props.code,
      codeView: true,
      uiView: false,
    };
  }

  sendInfoToProps = values => {
    this.props.updateConfiguration(values.code);
    this.setState({ ...values });
  };

  render() {
    return (
      <div className="menu-page">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h1 style={{ lineHeight: '50px' }}>3. Configure your bot</h1>
          <div style={{ marginLeft: 'auto', marginRight: '0px' }}>
            <IconButton
              tooltip="Code View"
              onTouchTap={() => {
                this.setState({
                  codeView: true,
                  uiView: false,
                });
              }}
              disableTouchRipple={true}
            >
              <Code
                color={
                  this.state.codeView
                    ? 'rgb(66, 133, 244)'
                    : 'rgb(158, 158, 158)'
                }
              />
            </IconButton>
            <IconButton
              tooltip="UI View"
              onTouchTap={() => {
                this.setState({
                  codeView: false,
                  uiView: true,
                });
              }}
              disableTouchRipple={true}
            >
              <Table
                color={
                  this.state.uiView ? 'rgb(66, 133, 244)' : 'rgb(158, 158, 158)'
                }
              />
            </IconButton>
          </div>
        </div>
        <div style={{ padding: '30px 10px 0 10px' }}>
          {this.state.codeView ? (
            <CodeView
              configure={{
                sendInfoToProps: this.sendInfoToProps,
                code: this.state.code,
              }}
            />
          ) : null}
          {this.state.uiView ? (
            <UIView
              configure={{
                sendInfoToProps: this.sendInfoToProps,
                code: this.state.code,
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

Configure.propTypes = {
  updateConfiguration: PropTypes.func,
  code: PropTypes.string,
};
export default Configure;
