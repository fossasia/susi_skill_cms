import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Code from 'material-ui/svg-icons/action/code';
import Table from 'material-ui/svg-icons/av/web';
import CodeView from './DesignViews/CodeView';
import UIView from './DesignViews/UIView';

class Design extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeView: true,
      uiView: false,
      code: this.props.code,
    };
  }

  sendInfoToProps = values => {
    this.setState({ ...values });
  };

  updateSettings = value => {
    this.props.updateSettings(value);
  };

  render() {
    return (
      <div className="center menu-page">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h1 style={{ lineHeight: '50px' }}>2. Design your bot</h1>
          <div style={{ marginLeft: 'auto', marginRight: '0px' }}>
            <IconButton
              tooltip="Code View"
              onTouchTap={() => {
                this.setState({
                  codeView: true,
                  uiView: false,
                });
              }}
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
              design={{
                sendInfoToProps: this.sendInfoToProps,
                updateSettings: this.updateSettings,
                code: this.state.code,
              }}
            />
          ) : null}
          {this.state.uiView ? (
            <UIView
              design={{
                sendInfoToProps: this.sendInfoToProps,
                updateSettings: this.updateSettings,
                code: this.state.code,
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

Design.propTypes = {
  updateSettings: PropTypes.func,
  code: PropTypes.string,
};

export default Design;
