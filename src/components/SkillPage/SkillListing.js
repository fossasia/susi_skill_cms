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
import {FloatingActionButton, Paper} from "material-ui";
import CircleImage from "../CircleImage/CircleImage";
import Save from 'material-ui/svg-icons/content/save';

export default class SkillListing extends React.Component {

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
                <Paper style={styles.paper_full_width}  rounded={false} >
                    <div style={styles.right}>
                    <CircleImage name="Susi Wikipedia" size="48"/>
                        <div style={{marginLeft:10, flex: 1}}>
                    <p style={{fontWeight: 'bold'}}>Wikipedia Skill</p>
                        <p>Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.
                        </p>
                        </div>
                        <FloatingActionButton backgroundColor="#f44336">
                            <Save/>
                        </FloatingActionButton>
                    </div>

                </Paper>
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
