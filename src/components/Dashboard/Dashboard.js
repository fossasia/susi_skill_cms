import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import MySkills from './MySkills';
import MyRatings from './MyRatings';
import MyAnalytics from './MyAnalytics';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import './Dashboard.css';

const styles = {
  paperStyle: {
    width: '100%',
    marginTop: '20px',
    minWidth: '640px',
  },
  subHeadingStyle: {
    color: 'rgba(0,0,0,.65)',
    paddingLeft: '20px',
  },
  loggedInErrorStyle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '100px',
    fontSize: '50px',
    marginTop: '300px',
  },
  headingStyle: {
    color: 'black',
    marginTop: '10px',
  },
};

const {
  paperStyle,
  subHeadingStyle,
  loggedInErrorStyle,
  headingStyle,
} = styles;

const Dashboard = props => {
  const { accessToken } = props;
  document.title = 'SUSI.AI - Dashboard';
  if (!accessToken) {
    return (
      <div>
        <StaticAppBar {...props} />
        <div>
          <p style={loggedInErrorStyle}>Please login to view dashboard.</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <StaticAppBar {...props} />
      <div className="botbuilder-page-wrapper">
        <br />
        <br />
        <h1 className="center" style={{ ...headingStyle, ...paperStyle }}>
          My Dashboard
        </h1>
        <br />
        <Paper style={paperStyle} className="botBuilder-page-card" zDepth={1}>
          <h1 style={subHeadingStyle}>My Skills</h1>
          <MySkills />
        </Paper>
        <Paper style={paperStyle} className="botBuilder-page-card" zDepth={1}>
          <h1 style={subHeadingStyle}>My Ratings</h1>
          <MyRatings />
        </Paper>
        <Paper style={paperStyle} className="botBuilder-page-card" zDepth={1}>
          <h1 style={subHeadingStyle}>My Analytics</h1>
          <MyAnalytics />
        </Paper>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  accessToken: PropTypes.string,
};

function mapStateToProps(store) {
  return {
    accessToken: store.app.accessToken,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Dashboard);
