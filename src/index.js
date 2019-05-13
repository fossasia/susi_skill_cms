// Packages
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Switch from 'react-router-dom/es/Switch';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';
// DO not register a SW for now
// import registerServiceWorker from './registerServiceWorker';

// Components
import SkillRollBack from './components/SkillRollBack/SkillRollBack';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';
import NotFound from './components/NotFound/NotFound.react';
import Admin from './components/Admin/Admin';
import Users from './components/Admin/ListUser/ListUser.js';
import Skills from './components/Admin/ListSkills/ListSkills.js';
import SystemSettings from './components/Admin/SystemSettings/SystemSettings';
import SystemLogs from './components/Admin/SystemLogs/SystemLogs.js';
import Dashboard from './components/Dashboard/Dashboard';
import BrowseSkill from './components/BrowseSkill/BrowseSkill';
import SkillListing from './components/SkillPage/SkillListing';
import Logout from './components/Auth/Logout.react';
import SkillCreator from './components/SkillCreator/SkillCreator';
import SkillVersion from './components/SkillVersion/SkillVersion';
import SkillHistory from './components/SkillHistory/SkillHistory';
import SkillFeedbackPage from './components/SkillFeedbackPage/SkillFeedbackPage';
import BotBuilderWrap from './components/BotBuilder/BotBuilderWrap';
import setDefaults from './DefaultSettings';
import BrowseSkillByCategory from './components/BrowseSkill/BrowseSkillByCategory';
import BrowseSkillByLanguage from './components/BrowseSkill/BrowseSkillByLanguage';
import { colors, isProduction } from './utils';
import Login from './components/Auth/Login/Login';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import SignUp from './components/Auth/SignUp/SignUp';
import store from './store';
import appActions from './redux/actions/app';
import uiActions from './redux/actions/ui';
import { listUserSettings } from './api/index';

setDefaults();

injectTapEventPlugin();

const cookies = new Cookies();
const cookieDomain = isProduction() ? '.susi.ai' : '';

const muiTheme = getMuiTheme({
  appBar: {
    color: colors.primary,
  },
  checkbox: {
    checkedColor: colors.primary,
  },
  stepper: {
    iconColor: colors.primary,
  },
  radioButton: {
    backgroundColor: '#ffffff',
    borderColor: colors.primary,
    checkedColor: colors.primary,
  },
  raisedButton: {
    primaryColor: colors.primary,
    primaryTextColor: '#ffffff',
    textColor: '#ffffff',
  },
  flatButton: {
    color: '#FFFFFF',
    primaryTextColor: colors.primary,
    textColor: colors.primary,
  },
});

class App extends React.Component {
  static propTypes = {
    getApiKeys: PropTypes.func,
    actions: PropTypes.object,
    accessToken: PropTypes.string,
    snackBarProps: PropTypes.object,
  };

  componentDidMount = () => {
    const { actions, accessToken } = this.props;
    actions.getApiKeys();
    accessToken && actions.getAdmin();
    accessToken &&
      listUserSettings()
        .then(payload => {
          let userName = '';
          if (payload.settings && payload.settings.userName) {
            userName = payload.settings.userName;
          }
          cookies.set('username', userName, {
            path: '/',
            domain: cookieDomain,
          });
        })
        .catch(error => {});
    window.addEventListener('offline', this.onUserOffline);
    window.addEventListener('online', this.onUserOnline);
  };

  componentWillUnmount = () => {
    window.addEventListener('offline', this.onUserOffline);
    window.addEventListener('online', this.onUserOnline);
  };

  onUserOffline = () => {
    const { actions } = this.props;
    actions.openSnackBar({
      snackBarMessage: 'It seems you are offline!',
      snackBarDuration: 4000,
    });
  };

  onUserOnline = () => {
    const { actions } = this.props;
    actions.openSnackBar({
      snackBarMessage: 'Welcome back!',
      snackBarDuration: 4000,
    });
  };

  render() {
    const {
      actions,
      snackBarProps: { snackBarMessage },
      snackBarProps: { isSnackBarOpen },
      snackBarProps: { snackBarDuration },
    } = this.props;
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Snackbar
              open={isSnackBarOpen}
              message={snackBarMessage}
              autoHideDuration={snackBarDuration}
              onRequestClose={actions.closeSnackBar}
            />
            <Login />
            <SignUp />
            <ForgotPassword />
            <Switch>
              <Route
                exact
                path="/:category/:skill/edit/:lang"
                component={SkillCreator}
              />
              <Route
                exact
                path="/:category/:skill/edit/:lang/:commit"
                component={SkillCreator}
              />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin/users" component={Users} />
              <Route exact path="/admin/skills" component={Skills} />
              <Route exact path="/admin/settings" component={SystemSettings} />
              <Route exact path="/admin/logs" component={SystemLogs} />
              <Route
                exact
                path="/:category/:skill/:lang"
                component={SkillListing}
              />
              <Route
                exact
                path="/:category/:skill/:lang/feedbacks"
                component={SkillFeedbackPage}
              />
              <Route path="/botbuilder" component={BotBuilderWrap} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/skillCreator" component={SkillCreator} />
              <Route
                exact
                path="/:category/:skill/versions/:lang"
                component={SkillVersion}
              />
              <Route
                exact
                path="/:category/:skill/compare/:lang/:oldid/:recentid"
                component={SkillHistory}
              />
              <Route
                exact
                path="/:category/:skill/edit/:lang/:latestid/:revertid"
                component={SkillRollBack}
              />
              <Route
                exact
                path="/category/:category"
                component={BrowseSkillByCategory}
              />
              <Route
                exact
                path="/language/:language"
                component={BrowseSkillByLanguage}
              />
              <Route
                exact
                path="/"
                render={routeProps => <BrowseSkill {...routeProps} />}
              />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...appActions, ...uiActions }, dispatch),
  };
}

function mapStateToProps(store) {
  return {
    ...store.ui,
    ...store.app,
  };
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

ReactDOM.render(
  <Provider store={store} key="provider">
    <ConnectedApp />
  </Provider>,
  document.getElementById('root'),
);
