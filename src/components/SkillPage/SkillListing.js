import React from 'react';
import {Link} from 'react-router-dom'
import AuthorSkills from '../AuthorSkills/AuthorSkills'
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
import $ from "jquery";
import Divider from 'material-ui/Divider';
import './SkillListing.css';
import {
  FloatingActionButton,
  Paper,
  RaisedButton,
} from "material-ui";
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
            showAuthorSkills: false,
            dataReceived: false,
            imgUrl: null,
            commits: [],
            commitsChecked:[],
        };
        console.log(this.props.location.state)

        if(this.props.location.state.url!== undefined) {
            let url = this.props.location.state.url;
            name = this.props.location.state.name;
            if (url.indexOf("model") < 0) {
                urlCode = this.props.location.state.url + "?skill=" + name;
            }
            else {
                urlCode = this.props.location.state.url + "&skill=" + name;
            }

            urlCode = urlCode.toString()
            urlCode = urlCode.replace("getSkillList", "getSkill");
            console.log(urlCode);
        }

    }


    componentDidMount() {

        if(this.props.location.state.url!== undefined) {
            let baseUrl = 'http://api.susi.ai/cms/getSkillMetadata.json';
            let url = this.props.location.state.url;

            let modelValue = "general";
            let groupValue = this.props.location.state.groupValue;
            let languageValue = this.props.location.state.languageValue;

            url = baseUrl + '?model=' + modelValue + '&group=' + groupValue + '&language=' + languageValue + '&skill=' + name;

            console.log("Url:" + url);
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
        }
        if(this.props.location.state.from_upload!== undefined){
            let baseUrl = 'http://api.susi.ai/cms/getSkillMetadata.json';
            let url;

            let modelValue = "general";
            let groupValue = this.props.location.state.groupValue;
            let languageValue = this.props.location.state.languageValue;
            let expertValue = this.props.location.state.expertValue;
            url = baseUrl + '?model=' + modelValue + '&group=' + groupValue + '&language=' + languageValue + '&skill=' + expertValue;

            console.log("Url meta:" + url);

            urlCode = url.toString()
            urlCode = url.replace("getSkillMetadata", "getSkill");
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
        }
    };

    updateData = (skillData) => {

        this.setState({
            imgUrl:'https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/general/'+this.props.location.state.groupValue+'/'+this.props.location.state.languageValue+'/'+skillData.image
        });

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
            this.setState({
                skill_name: "No Name Given"
            });
        }
        else {
            this.setState({
                skill_name: skillData['skill_name']
            })
            name = skillData['skill_name']
        }

        this.setState({
            dataReceived: true
        });
    };

    getSkillMetadata = () => {
      let metaData = {
        modelValue: "general",
        groupValue: "",
        languageValue: "",
        skillName: ""
      }
      if(this.props.location.state.url!== undefined) {
        metaData.groupValue = this.props.location.state.groupValue;
        metaData.languageValue = this.props.location.state.languageValue;
        metaData.skillName = this.props.location.state.name;
      }
      if(this.props.location.state.from_upload!== undefined){
          metaData.groupValue = this.props.location.state.groupValue;
          metaData.languageValue = this.props.location.state.languageValue;
          metaData.skillName = this.props.location.state.expertValue;
      }
      return metaData;
    }

    openAuthorSkills = () => {
        this.refs.author.loadSkillCards(this.state.author);
        this.setState({showAuthorSkills: true});
    }

    closeAuthorSkills = () => {
        this.setState({showAuthorSkills: false});
  }

    render() {

        const authorStyle = {
            cursor: 'pointer'
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
        let oldModelValue = "general";
        let oldGroupValue = this.props.location.state.groupValue;
        let oldLanguageValue = this.props.location.state.languageValue;
        let oldImageValue = this.state.imgUrl;
        let imageValue = this.state.image;
        if (!this.state.dataReceived) {
            renderElement = <div><StaticAppBar {...this.props}/><h1 className="skill_loading_container">Loading...</h1></div>
        }
        else {
            renderElement = <div><StaticAppBar {...this.props}/><div className="skill_listing_container" style={styles.home}>
                    <div className="avatar">
                        {this.state.image== null?
                            <CircleImage name={this.state.skill_name.toUpperCase()} size="250"/>:
                            <img className="avatar-img" alt="Thumbnail" src={this.state.imgUrl}/>
                        }
                        {/*<Avatar src={this.state.image} size={250}/>*/}
                    </div>
                    <div className='linkButtons'>
                      <Link to={{
                          pathname: '/skillEditor',
                          state: { url: urlCode, name:name,oldExpertValue:this.props.location.state.name,oldModelValue:oldModelValue,oldGroupValue:oldGroupValue,oldLanguageValue:oldLanguageValue, 
                            oldImageUrl:oldImageValue, oldImageValue:imageValue}
                      }}>
                          <div className="skillEditBtn">
                              <FloatingActionButton   backgroundColor={"#4285f4"} >
                                  <EditBtn />
                              </FloatingActionButton>
                          </div>
                      </Link>
                      <Link to={{
                          pathname: '/versions',
                          state: {
                            skillMeta: this.getSkillMetadata(),
                          }
                      }}>
                        <div className="skillVersionBtn">
                          <RaisedButton
                            label="Versions"
                            backgroundColor="#4285f4"
                            labelColor="#fff"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="meta">
                        <h1 className="name">
                            {/*{this.state.skill_name}*/}
                            {
                                name&&name.split(' ').map((data) => {
                                    return data.charAt(0).toUpperCase() + data.substring(1);
                                }).join(' ')}
                        </h1>
                        <h4>
                            author: <span style={authorStyle} onClick={this.openAuthorSkills}>{this.state.author}</span>
                        </h4>
                      <div className="avatar-meta margin-b-md">
                        <div className="examples">
                            {console.log(this.state)}

                            { typeof this.state.examples === 'undefined' ||
                              this.state.examples === null ||
                              typeof this.state.examples[Object.keys(this.state.examples)[0]] === 'undefined'? '' :
                              this.state.examples.map((data) => {
                                return (
                                  <Paper
                                    className='exampleTile'
                                    style={{backgroundColor: '#f5f5f5'}}
                                    zDepth={1}
                                  >
                                    {data}
                                  </Paper>
                                )
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
                        Skill Details
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
            <div>
                <div>{renderElement}</div>
                <div>
                    <AuthorSkills
                        ref="author"
                        open={this.state.showAuthorSkills}
                        close={this.closeAuthorSkills}
                        author={this.state.author}
                        author_url={this.state.author_url}
                        groups={this.props.location.state.groups}
                        languages={this.props.location.state.languages}/>
                </div>
            </div>
        );
    }
}
