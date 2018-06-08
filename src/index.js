// Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Switch from 'react-router-dom/es/Switch';
import injectTapEventPlugin from 'react-tap-event-plugin';

// DO not register a SW for now
// import registerServiceWorker from './registerServiceWorker';

// Components
import SkillEditor from './components/SkillEditor/SkillEditor';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotFound from './components/NotFound/NotFound';
import Admin from './components/Admin/Admin'
import BotBuilder from './components/BotBuilder/BotBuilder';
import BrowseSkill from './components/BrowseSkill/BrowseSkill';
import SkillListing from './components/SkillPage/SkillListing';
import ListUser from './components/Admin/ListUser/ListUser';
import Logout from './components/Auth/Logout.react';
import CreateSkill from './components/CreateSkill/CreateSkill';
import SkillVersion from './components/SkillVersion/SkillVersion';
import SkillHistory from './components/SkillHistory/SkillHistory';
import SkillRollBack from './components/SkillRollBack/SkillRollBack';
import ContactBot from './components/BotBuilder/ContactBot';
import Explore from './components/Explore/Explore';
import setDefaults from './DefaultSettings';

setDefaults();

injectTapEventPlugin();

class App extends React.Component {

    render() {
        document.body.style.backgroundColor = '#eee';
        return (
            <Router>
                <MuiThemeProvider>
                    <Switch>
                        <Route exact path='/:category/:skill/edit/:lang' component={SkillEditor} />
                        <Route exact path='/:category/:skill/edit/:lang/:commit' component={SkillEditor}/>
                        <Route exact path='/admin' component={Admin}/>
                        <Route path='/listUser' component={ListUser}/>
                        <Route exact path='/:category/:skill/:lang' component={SkillListing}/>
                        <Route exact path='/botbuilder/contactbot' component={ContactBot} />
                        <Route exact path='/botbuilder' component={BotBuilder}/>
                        <Route exact path='/logout' component={Logout} />
                        <Route exact path='/skillCreator' component={CreateSkill}/>
                        <Route exact path='/:category/:skill/versions/:lang' component={SkillVersion}/>
                        <Route exact path='/:category/:skill/compare/:lang/:oldid/:recentid' component={SkillHistory}/>
                        <Route exact path='/:category/:skill/edit/:lang/:latestid/:revertid' component={SkillRollBack}/>
                        <Route exact path='/explore' component={Explore}/>
                        <Route exact path='/' component={BrowseSkill} />
                        <Route exact path='*' component={NotFound} />
                    </Switch>
                </MuiThemeProvider>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
