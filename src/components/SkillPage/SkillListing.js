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
import * as $ from "jquery";
import Divider from 'material-ui/Divider';
import './SkillListing.css';
import {
  FloatingActionButton,
  Paper,
  RaisedButton,
  Checkbox
} from "material-ui";
import CircleImage from "../CircleImage/CircleImage";
import EditBtn from 'material-ui/svg-icons/editor/mode-edit';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
            dataReceived: false,
            imgUrl: null,
            commits: [],
            commitsChecked:[],
        };
        console.log(this.props.location.state.groups)

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

    getSkillAtCommitIDUrl = () => {
      let skillAtCommitIDUrl = null;
      let baseUrl = ' http://api.susi.ai/cms/getFileAtCommitID.json';
      let modelValue = "general";
      if(this.props.location.state.url!== undefined) {
        let groupValue = this.props.location.state.groupValue;
        let languageValue = this.props.location.state.languageValue;
        let skillName = this.props.location.state.name;
        skillAtCommitIDUrl = baseUrl + '?model=' + modelValue
                                + '&group=' + groupValue + '&language=' + languageValue
                                + '&skill=' + skillName + '&commitID=';
      }
      if(this.props.location.state.from_upload!== undefined){
          let baseUrl = 'http://api.susi.ai/cms/getSkillMetadata.json';
          let groupValue = this.props.location.state.groupValue;
          let languageValue = this.props.location.state.languageValue;
          let skillName = this.props.location.state.expertValue;
          skillAtCommitIDUrl = baseUrl + '?model=' + modelValue
                                  + '&group=' + groupValue + '&language=' + languageValue
                                  + '&skill=' + skillName + '&commitID=';
      }
      console.log(skillAtCommitIDUrl);
      return skillAtCommitIDUrl;
    }

    getCommitHistory = (commitHistoryURL) => {
      console.log(commitHistoryURL);
      let self = this;
      $.ajax({
          url: commitHistoryURL,
          jsonpCallback: 'pv',
          dataType: 'jsonp',
          jsonp: 'callback',
          crossDomain: true,
          success: function (commitsData) {
              self.setCommitHistory(commitsData);
          }
      });
    }

    setCommitHistory = (commitsData) => {
      console.log(commitsData);
      if(commitsData.accepted){
        let commits = commitsData.commits ? commitsData.commits : [];
        if(commits.length > 0){
          commits[0].latest = true;
        }
        this.setState({
          commits:commits
        });
        console.log(this.state);
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

            let commitHistoryBaseURL = 'http://api.susi.ai/cms/getSkillHistory.json';
            let commitHistoryURL = commitHistoryBaseURL + '?model=' + modelValue + '&group=' + groupValue + '&language=' + languageValue + '&skill=' + name;

            console.log("Url:" + url);
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
            this.getCommitHistory(commitHistoryURL);
        }
        if(this.props.location.state.from_upload!== undefined){
            let baseUrl = 'http://api.susi.ai/cms/getSkillMetadata.json';
            let url;

            let modelValue = "general";
            let groupValue = this.props.location.state.groupValue;
            let languageValue = this.props.location.state.languageValue;
            let expertValue = this.props.location.state.expertValue;


            url = baseUrl + '?model=' + modelValue + '&group=' + groupValue + '&language=' + languageValue + '&skill=' + expertValue;

            let commitHistoryBaseURL = 'http://api.susi.ai/cms/getSkillHistory.json';
            let commitHistoryURL = commitHistoryBaseURL + '?model=' + modelValue + '&group=' + groupValue + '&language=' + languageValue + '&skill=' + expertValue;

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
            this.getCommitHistory(commitHistoryURL);
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

    onCheck = (event,isInputChecked) => {
      console.log(event.target.name);
      let commitsChecked = this.state.commitsChecked;
      if(isInputChecked){
        commitsChecked.push(event.target.name);
      }
      else{
        var index = commitsChecked.indexOf(event.target.name);
        if(index > -1){
          commitsChecked.splice(index,1);
        }
      }
      console.log(commitsChecked);
      this.setState({
        commitsChecked: commitsChecked,
      });
    }

    getCheckedCommits = () => {
      let commitsChecked = this.state.commitsChecked;
      let commits = this.state.commits;
      if(commitsChecked.length === 2){
        var commitIndex1 = parseInt(commitsChecked[0],10);
        var commitIndex2 = parseInt(commitsChecked[1],10);
        let commit1 = commits[commitIndex1];
        let commit2 = commits[commitIndex2];
        let orderedCommits = [commit1];
        if(commitIndex2 > commitIndex1){
          orderedCommits.unshift(commit2);
        }
        else{
          orderedCommits.push(commit2);
        }
        console.log(orderedCommits);
        return orderedCommits;
      }
      else if (commitsChecked.length === 1) {
        let commit = commits[parseInt(commitsChecked[0],10)];
        return [commit];
      }
      return;
    }

    getSkillMetadata = () => {
      let metaData = {
        modelValue: "general",
        groupValue: "",
        languageValue: "",
        skillName: ""
      }
      if(this.props.location.state.url!== undefined) {
        metaData.modelValue = "general";
        metaData.groupValue = this.props.location.state.groupValue;
        metaData.languageValue = this.props.location.state.languageValue;
        metaData.skillName = this.props.location.state.name;
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

        const exampleStyle = {
            height: 'auto',
            width: 200,
            marginRight: 20,
            boxShadow: 'none',
            backgroundColor: 'whitesmoke',
            padding: '20px',
            color: '#555',
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

        let compareBtnLabel;
        if(this.state.commitsChecked.length === 1){
          compareBtnLabel = "View Selected Version"
        }
        else if(this.state.commitsChecked.length === 2){
          compareBtnLabel = "Compare Selected Versions"
        }

        const compareBtnStyle = {
          marginTop: '20px',
        }

        let renderElement = null;
        if (!this.state.dataReceived) {
            renderElement = <div><StaticAppBar {...this.props}/><h1 className="skill_loading_container">Loading...</h1></div>
        }
        else {
          let commitHistoryTableHeader =
            <TableRow>
              <TableHeaderColumn style={{width:'20px'}}></TableHeaderColumn>
              <TableHeaderColumn>Commit Date</TableHeaderColumn>
              <TableHeaderColumn>Commit ID</TableHeaderColumn>
              <TableHeaderColumn>Commit Message</TableHeaderColumn>
            </TableRow>;

          let commits = this.state.commits;

          let commitHistoryTableRows = commits.map((commit,index)=>{
            let commitsChecked = this.state.commitsChecked;
            let checkBox = <Checkbox
              name={index.toString()}
              onCheck={this.onCheck}/>;
            if(commitsChecked.length === 2 && commitsChecked.indexOf(index.toString()) === -1){
              checkBox = <Checkbox
                name={index.toString()}
                onCheck={this.onCheck}
                disabled={true}/>
            }
            return(
              <TableRow>
                <TableRowColumn style={{width:'20px'}}>
                  {checkBox}
                </TableRowColumn>
                <TableRowColumn>
                  <abbr title={commit.commitDate}>{commit.commitDate}</abbr>
                </TableRowColumn>
                <TableRowColumn>
                  <abbr title={commit.commitID}>{commit.commitID}</abbr>
                </TableRowColumn>
                <TableRowColumn>
                  <abbr title={commit.commit_message}>{commit.commit_message}</abbr>
                </TableRowColumn>
              </TableRow>
            );
          });

          const commitHistoryTable =
          <MuiThemeProvider>
            <Table selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                {commitHistoryTableHeader}
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {commitHistoryTableRows}
              </TableBody>
            </Table>
          </MuiThemeProvider>;

            renderElement = <div><StaticAppBar {...this.props}/><div className="skill_listing_container" style={styles.home}>
                <div className="avatar-meta margin-b-md">
                    <div className="avatar">
                        {this.state.image== null?
                            <CircleImage name={this.state.skill_name.toUpperCase()} size="250"/>:
                            <img className="avatar-img" alt="Thumbnail" src={this.state.imgUrl}/>
                        }
                        {/*<Avatar src={this.state.image} size={250}/>*/}
                    </div>
                    <div className="meta">
                        <h1 className="name">
                            {/*{this.state.skill_name}*/}
                            {
                                name&&name.split(' ').map((data) => {
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
                            author: <span style={authorStyle} onClick={this.openAuthorSkills}>{this.state.author}</span>
                        </h4>
                        <div className="examples" style={{display: "flex",
                            flexWrap: 'wrap'}}>
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
                <div className="margin-b-md margin-t-md skill">
                    <h1 className="title">
                        Skill History
                    </h1>
                    {commitHistoryTable}
                    {(this.state.commitsChecked.length === 1 || this.state.commitsChecked.length === 2) &&
                    <Link to={{
                        pathname: '/skillHistory',
                        state: {
                          url: this.getSkillAtCommitIDUrl(),
                          skillMeta: this.getSkillMetadata(),
                          name:name,
                          commits: this.getCheckedCommits(),
                          latestCommit: this.state.commits[0]
                        }
                    }}>
                      <RaisedButton
                        label={compareBtnLabel}
                        backgroundColor="#4285f4"
                        labelColor="#fff"
                        style={compareBtnStyle}
                      />
                    </Link>
                  }
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
