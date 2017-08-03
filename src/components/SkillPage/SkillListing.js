import React from 'react';
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import { FloatingActionButton} from "material-ui";
import ContentSave from "material-ui/svg-icons/editor/mode-edit";
import {Link} from "react-router-dom";
let url,name,model,group,language,expert;
export default class SkillListing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code:"// code", fontSizeCode:14, editorTheme:"github"
        };

        url = this.props.location.state.url;
        name = this.props.location.state.name;

        name = name.replace(".txt","")
        console.log(props)
        if(url.indexOf("model") < 0) {
            url = this.props.location.state.url + "?skill=" + name;
        }
        else {
            url = this.props.location.state.url + "&skill=" + name;
        }

        url = url.toString()
        url =  url.replace("getSkillList","getSkill");
        console.log(url)

    }

    componentDidMount() {
        // let element = this.props.location.state.element

        // let self = this;
        // $.ajax({
        //     url: url,
        //     jsonpCallback: 'pc',
        //     dataType: 'jsonp',
        //     jsonp: 'callback',
        //     crossDomain: true,
        //     success: function (data) {
        //     }
        // });
    };


    render() {
        return (
          <div>
            <StaticAppBar {...this.props} />
            <div style={styles.home}>
                <center><h1>Skill Info</h1></center>
                <Link to={{
                    pathname: '/skillEditor',
                    state: { url: url, name:name, }
                }}>
                <FloatingActionButton
                    style={{right: 0,
                    margin:40,
                    bottom: 0,
                    position: "absolute"}}>
                    <ContentSave />
                </FloatingActionButton>
                </Link>
            </div>
          </div>

        );
    }
}

const styles = {
    home: {
        width: '100%',
        padding: "80px 30px 30px",
    },
    right: {
    display: 'flex',
        alignItems:"center",
        flexDirection: 'row',
    padding: "10px",
},
    paper_full_width : {
        width: "100%",
        marginBottom:10,
        display: 'inline-block',
    }
};
