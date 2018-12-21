import React from 'react';
import { Paper } from 'material-ui';
import Cookies from 'universal-cookie';
import MySkills from './MySkills';
import MyRatings from './MyRatings';
import MyAnalytics from './MyAnalytics';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import './Dashboard.css';

const cookies = new Cookies();

const styles = {
  paperStyle: {
    width: '100%',
    marginTop: '20px',
  },
  subHeadingStyle: {
    color: 'rgba(0,0,0,.65)',
  },
  loggedInErrorStyle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '100px',
    fontSize: '50px',
    marginTop: '300px',
  },
};

const { paperStyle, subHeadingStyle, loggedInErrorStyle } = styles;

const Dashboard = props => {
  document.title = 'SUSI.AI - Dashboard';

  if (!cookies.get('loggedIn')) {
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
        <h1 className="center" style={{ color: 'black' }}>
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

export default Dashboard;
