import React from 'react';
import {Link} from 'react-router-dom'
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
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import './SkillListing.css';
import {FloatingActionButton, Paper, } from "material-ui";
import CircleImage from "../CircleImage/CircleImage";
import EditBtn from 'material-ui/svg-icons/editor/mode-edit';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';

const defaultNullSkillList = ['image', 'author', 'author_url', 'developer_privacy_policy', 'terms_of_use', 'dynamic_content', 'examples'];
let urlCode,name;

export default class SkillListing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            skill_data: {},
            fontSizeCode: 14,
            editorTheme: "github",
            image: '',
            author: '',
            author_url: '',
            developer_privacy_policy: '',
            terms_of_use: '',
            dynamic_content: '',
            examples: '',
            descriptions: '',
            skill_name: '',
            dataReceived: false
        };
        let url = this.props.location.state.url;
        name = this.props.location.state.name;
        // name = name.replace(".txt", "");
        if(url.indexOf("model") < 0) {
            urlCode = this.props.location.state.url + "?skill=" + name;
        }
        else {
            urlCode = this.props.location.state.url + "&skill=" + name;
        }

        urlCode = urlCode.toString()
        urlCode =  urlCode.replace("getSkillList","getSkill");
        console.log(urlCode);


    }


    componentDidMount() {

        let baseUrl = 'http://35.192.82.114/cms/getSkillMetadata.json';
        let url = this.props.location.state.url;





        let modelValue =  this.props.location.state.modelValue;
        let groupValue = this.props.location.state.groupValue;
        let languageValue = this.props.location.state.languageValue;
        groupValue = groupValue.charAt(0).toUpperCase() + groupValue.substring(1);

        url  = baseUrl + '?model='+modelValue + '&group='+groupValue + '&language='+languageValue + '&skill='+name;

        console.log("Url:"+url);



        // url = 'http://192.168.43.187:4000/cms/getSkillMetadata.json?group=general&model=entertainment&language=en&skill=cat';
        console.log(url)
        let self = this;
        $.ajax({
            url: url,
            jsonpCallback: 'pc',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                self.updateData(data.skill_metadata)
            }
        });
    };

    updateData = (skillData) => {

        defaultNullSkillList.forEach((data) => {
            this.setState({
                [data]: skillData[data]
            })
        });

        if (skillData['descriptions'] === null) {

            this.setState({
                descriptions: 'No Description Provided'
            });

            console.log("From Description");
        }
        else {
            this.setState({
                descriptions: skillData['descriptions']
            })
        }

        if (skillData['skill_name'] === null) {

            let skill_name = this.props.location.state.name;
            skill_name = skill_name.charAt(0).toUpperCase() + skill_name.substring(1);

            this.setState({
                skill_name: skill_name
            });

            console.log(this.props.location.state.name.replace(".txt", "").charAt(0));
        }
        else {
            this.setState({
                skill_name: skillData['skill_name']
            })
        }

        this.setState({
            dataReceived: true
        });
    };

    render() {

        const exampleStyle = {
            height: 'auto',
            width: 200,
            marginRight: 20,
            textAlign: 'left',
            display: 'inline-block',
            boxShadow: 'none',
            backgroundColor: 'whitesmoke',
            padding: '20px',
            color: '#555'
        }

        const styles = {
            home: {
                width: '100%',
                fontSize: '14px'
            },
            right: {
                display: 'flex',
                alignItems: "center",
                flexDirection: 'row',
                padding: "10px",
            },
            paper_full_width: {
                width: "100%",
                marginBottom: 10,
                display: 'inline-block',
            }
        };

        let renderElement = null;
        if (!this.state.dataReceived) {
            renderElement = <div><StaticAppBar {...this.props}/><h1 className="skill_loading_container">Loading...</h1></div>
        }
        else {
            renderElement = <div><StaticAppBar {...this.props}/><div className="skill_listing_container" style={styles.home}>
                <div className="avatar-meta margin-b-md">
                    <div className="avatar">
                        {this.state.image == null?<CircleImage name={this.state.skill_name.toUpperCase()} size="250"/>:<Avatar src={this.state.image} size={250}/>}
                        {/*<Avatar src={this.state.image} size={250}/>*/}
                    </div>
                    <div className="meta">
                        <h1 className="name">
                            {/*{this.state.skill_name}*/}
                            {this.state.skill_name.split(' ').map((data) => {
                                return data.charAt(0).toUpperCase() + data.substring(1);
                            }).join(' ')}
                        </h1>
                        <Link to={{
                            pathname: '/skillEditor',
                            state: { url: urlCode, name:name, }
                        }}>
                            <div className="skill_edit_btn">
                                <FloatingActionButton   backgroundColor={"#4285f4"} >
                                    <EditBtn />
                                </FloatingActionButton>
                            </div>
                        </Link>
                        <h4>
                            <a href={this.state.authorUrl} target="_blank" rel="noopener noreferrer">{this.state.author}</a>
                        </h4>
                        <div className="examples">
                            {/*{console.log(this.state.skill_data)}*/}
                            {/*{this.state.skill_data.examples}*/}
                            {console.log(this.state)}

                            {typeof this.state.examples === 'undefined' || this.state.examples === null || typeof this.state.examples[Object.keys(this.state.examples)[0]] === 'undefined'? '' : this.state.examples.map((data) => {
                                return <Paper style={exampleStyle} zDepth={1}>{data}</Paper>
                            })}
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="desc margin-b-md margin-t-md">
                    <h1 className="title">
                        Description
                    </h1>
                    <p>{this.state.descriptions}</p>
                </div>
                <div className="margin-b-md margin-t-md skill">
                    <h1 className="title">
                        Skills Details
                    </h1>
                    <ul>
                        {this.state.dynamic_content ?
                            <li>The Skill Contains content Dynamic Content that is updated real-time based on inputs from the
                                User.</li> : ''}

                        {this.state.terms_of_use == null?'':<li><a href={this.state.terms_of_use} target="_blank" rel="noopener noreferrer">Term & Condition</a></li>}

                        {this.state.terms_of_use == null?'':<li><a href={this.state.developer_privacy_policy} target="_blank" rel="noopener noreferrer">Developer Privacy Policy</a></li>}

                    </ul>
                </div>
            </div>
            </div>
        }

        return (
            renderElement
        );
    }
}