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


class App extends React.Component {

    render() {
        return (
            <Router>
        <MuiThemeProvider>

            <div style={styles.app}>
                <Sidebar />
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/chat" component={Chatbox}/>
                    <Route path="/home" component={Home} />
                    <Route component={NotFound} />
                </Switch>
                <Header />
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
        alignItems: 'center',
        justifyContent: 'center',
        background: '#eee',
        flexDirection: "column"
    }
};

ReactDOM.render(<App />, document.getElementById('root'));
