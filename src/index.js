import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Home from "./components/Home/Home";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route} from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import Chatbox from "./components/Chatbox/Chatbox";
import Switch from "react-router-dom/es/Switch";
import BrowseHistory from "./components/BrowseHistory/BrowseHistory";
import BrowseSkill from "./components/BrowseSkill/BrowseSkill";
import injectTapEventPlugin from 'react-tap-event-plugin';
import Body from "./components/Body/Body";
import Logout from './components/Auth/Logout';
import BrowseExamples from "./components/BrowseExamples/BrowseExamples";
import VisualEditor from "./components/VisualEditor/VisualEditor";
import SkillListing from "./SkillPage/SkillListing";
injectTapEventPlugin();

class App extends React.Component {

    render() {
        return (
            <Router>
        <MuiThemeProvider>

            <div style={styles.app}>
                <Sidebar />
                <Header />
                <Body>
                    <Switch>
                        <Route path="/chat" component={Chatbox}/>
                        <Route path="/skillEditor" component={Home} />
                        <Route path="/browseHistory" component={BrowseHistory} />
                        <Route path="/browseExamples" component={BrowseExamples} />
                        <Route path="/browseSkill" component={BrowseSkill}/>
                        <Route path="/visualEditor" component={VisualEditor}/>
                        <Route path="/skillPage" component={SkillListing}/>
                        <Route path="/" component={BrowseSkill} />
                        <Route exact path="/logout" component={Logout} />
                        <Route component={NotFound} />
                    </Switch>
                </Body>
            </div>
        </MuiThemeProvider>
            </Router>
        );
    }
}

const styles = {
    app: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        background: '#eee',
        flexDirection: "row",
        overflow: "hidden"
    }
};

ReactDOM.render(<App />, document.getElementById('root'));
