// Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Switch from 'react-router-dom/es/Switch';
import injectTapEventPlugin from 'react-tap-event-plugin';

// DO not register a SW for now
// import registerServiceWorker from './registerServiceWorker';

// Components
import SkillEditor from './components/SkillEditor/SkillEditor';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
import SkillRollBack from './components/SkillRollBack/SkillRollBack';
import SkillFeedbackPage from './components/SkillFeedbackPage/SkillFeedbackPage';
import BotBuilderWrap from './components/BotBuilder/BotBuilderWrap';
import setDefaults from './DefaultSettings';
import BrowseSkillByCategory from './components/BrowseSkill/BrowseSkillByCategory';
import BrowseSkillByLanguage from './components/BrowseSkill/BrowseSkillByLanguage';
import Cookies from 'universal-cookie';
import { urls } from './utils';
import $ from 'jquery';

setDefaults();

injectTapEventPlugin();

const cookies = new Cookies();

let lightTheme = {
  palette: {
    primary1Color: '#4285f4',
    accent1Color: '#4285f4',
    textColor: '#000',
    backgroundColor: '#fff',
  },
};

let darkTheme = {
  palette: {
    primary1Color: '#19324c',
    accent1Color: '#19324c',
    textColor: '#fff',
    canvasColor: '#3F51B5',
    backgroundColor: '#303030',
  },
};

class App extends React.Component {
  state = {
    muiTheme: {
      ...lightTheme,
    },
  };

  componentDidMount() {
    if (cookies.get('loggedIn')) {
      $.ajax({
        url:
          urls.API_URL +
          '/aaa/listUserSettings.json?access_token=' +
          cookies.get('loggedIn'),
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          let themeValue = { theme: 'light' };
          if (data.settings && data.settings.theme) {
            themeValue = { theme: data.settings.theme };
            if (
              data.settings.theme === 'custom' &&
              data.settings.customThemeValue
            ) {
              let customThemeValues = data.settings.customThemeValue.split(',');
              themeValue.customThemeValue = customThemeValues;
            }
          }
          if (themeValue.customThemeValue) {
            let palette = {
              primary1Color: '#' + themeValue.customThemeValue[0],
              accent1Color: '#' + themeValue.customThemeValue[5],
              textColor: this.invertColorTextArea(
                '#' + themeValue.customThemeValue[2],
              ),
              backgroundColor: '#' + themeValue.customThemeValue[2],
            };
            this.setState({
              muiTheme: { palette },
            });
          } else if (themeValue.theme === 'dark') {
            this.setState({
              muiTheme: {
                ...darkTheme,
              },
            });
          }
        }.bind(this),
        error: function(errorThrown) {
          console.log(errorThrown);
        },
      });
    }
  }

  invertColorTextArea = hex => {
    // get the text are code
    hex = hex.slice(1);

    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);

    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: this.state.muiTheme.palette.backgroundColor,
          color: this.state.muiTheme.palette.textColor,
          position: 'fixed',
          overflowY: 'scroll',
          width: '100%',
          height: '100%',
        }}
      >
        <Router>
          <MuiThemeProvider muiTheme={getMuiTheme({ ...this.state.muiTheme })}>
            <Switch>
              <Route
                exact
                path="/:category/:skill/edit/:lang"
                component={SkillEditor}
              />
              <Route
                exact
                path="/:category/:skill/edit/:lang/:commit"
                component={SkillEditor}
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
              <Route exact path="/" component={BrowseSkill} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
