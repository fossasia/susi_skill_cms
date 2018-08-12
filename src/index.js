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
import { colors } from './utils';

setDefaults();

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  checkbox: {
    checkedColor: colors.primary,
  },
  stepper: {
    iconColor: colors.primary,
  },
});

class App extends React.Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
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
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
