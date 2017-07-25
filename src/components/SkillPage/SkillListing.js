import React from 'react';
import AceEditor from 'react-ace';
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
import * as $ from "jquery";
export default class SkillListing extends React.Component {

    state = {
        code :"cako"
    }
    constructor(props) {
        super(props);

        this.state = {
            code:"// code", fontSizeCode:14, editorTheme:"github"
        };

    }

    componentDidMount() {
        // let element = this.props.location.state.element
        let url = this.props.location.state.url;
        let name = this.props.location.state.name;
        name = name.replace(".txt","")
        console.log(url)
        if(url.indexOf("model") < 0) {
            url = this.props.location.state.url + "?skill=" + name;
        }
        else {
            url = this.props.location.state.url + "&skill=" + name;
        }

        url = url.toString()
        url =  url.replace("getSkillList","getSkill");
        console.log(url)
        let self = this;
        $.ajax({
            url: url,
            jsonpCallback: 'pc',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                self.updateCode(data.text)
            }
        });
    };

    updateCode = (newCode) => {
        this.setState({
            code: newCode,
        });
        console.log(this.state.code);
    }


    render() {
        return (
            <div style={styles.home}>
                <AceEditor
                    mode="markdown"
                    theme={this.state.editorTheme}
                    width="100%"
                    fontSize={this.state.fontSizeCode}
                    height= "600px"
                    value={this.state.code}
                    name="skill_code_editor"
                    editorProps={{$blockScrolling: true}}
                />

            </div>

        );
    }
}

const styles = {
    home: {
        width: '100%'
    }
};
