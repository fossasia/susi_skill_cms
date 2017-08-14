import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import Home from "./components/SkillEditor/SkillEditor";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route} from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import Admin from "./components/Admin/Admin"
import Settings from "./components/Settings/Settings";
import Switch from "react-router-dom/es/Switch";
import BrowseHistory from "./components/BrowseHistory/BrowseHistory";
import BrowseSkill from "./components/BrowseSkill/BrowseSkill";
import injectTapEventPlugin from 'react-tap-event-plugin';
import BrowseExamples from "./components/BrowseExamples/BrowseExamples";
import VisualEditor from "./components/VisualEditor/VisualEditor";
import SkillListing from "./components/SkillPage/SkillListing";
import ListUser from "./components/Admin/ListUser/ListUser";
import Logout from './components/Auth/Logout.react';
import CreateSkill from "./components/CreateSkill/CreateSkill";
import SkillHistory from "./components/SkillHistory/SkillHistory";
import SkillRollBack from "./components/SkillRollBack/SkillRollBack";
injectTapEventPlugin();

class App extends React.Component {

    render() {
        document.body.style.backgroundColor = "#eee";
        return (
            <Router>
                <MuiThemeProvider>
                    <Switch>
                        <Route exact path="/skillEditor" component={Home} />
                        <Route exact path="/browseHistory" component={BrowseHistory} />
                        <Route exact path="/browseExamples" component={BrowseExamples} />
                        <Route exact path="/browseSkill" component={BrowseSkill}/>
                        <Route exact path="/admin" component={Admin}/>
                        <Route path="/listUser" component={ListUser}/>
                        <Route exact path="/visualEditor" component={VisualEditor}/>
                        <Route exact path="/skillPage" component={SkillListing}/>
                        <Route exact path="/settings" component={Settings}/>
                        <Route exact path="/logout" component={Logout} />
                        <Route exact path="/skillCreator" component={CreateSkill}/>
                        <Route exact path="/skillHistory" component={SkillHistory}/>
                        <Route exact path="/skillRollBack" component={SkillRollBack}/>
                        <Route exact path="/" component={BrowseSkill} />
                        <Route exact path="*" component={NotFound} />
                    </Switch>
                </MuiThemeProvider>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
