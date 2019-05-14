import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';
import Code from 'material-ui/svg-icons/action/code';
import Table from 'material-ui/svg-icons/av/web';
import PropTypes from 'prop-types';
import CodeView from './ConfigureViews/CodeView';
import UIView from './ConfigureViews/UIView';
import createActions from '../../../redux/actions/create';
import './Animation.min.css';
class Configure extends Component {
  render() {
    const { actions, view } = this.props;
    return (
      <div className="menu-page">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h1 style={{ lineHeight: '50px' }}>3. Configure your bot</h1>
          <div style={{ marginLeft: 'auto', marginRight: '0px' }}>
            <IconButton
              className="iconbutton"
              tooltip="Code View"
              onClick={() => actions.setView({ view: 'code' })}
              disableTouchRipple={true}
            >
              <Code
                color={
                  view === 'code' ? 'rgb(66, 133, 244)' : 'rgb(158, 158, 158)'
                }
              />
            </IconButton>
            <IconButton
              className="iconbutton"
              tooltip="UI View"
              onClick={() => actions.setView({ view: 'ui' })}
              disableTouchRipple={true}
            >
              <Table
                color={
                  view === 'ui' ? 'rgb(66, 133, 244)' : 'rgb(158, 158, 158)'
                }
              />
            </IconButton>
          </div>
        </div>
        <div style={{ padding: '30px 10px 0 10px' }}>
          {view === 'code' ? <CodeView /> : null}
          {view === 'ui' ? <UIView /> : null}
        </div>
      </div>
    );
  }
}

Configure.propTypes = {
  view: PropTypes.string,
  actions: PropTypes.object,
};

function mapStateToProps(store) {
  return {
    view: store.create.view,
  };
}

function mapDispatchToActions(dispatch) {
  return {
    actions: bindActionCreators(createActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(Configure);
