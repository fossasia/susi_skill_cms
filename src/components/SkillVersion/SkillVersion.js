import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
import {
  RaisedButton,
  Checkbox
} from "material-ui";
import $ from "jquery";

class SkillVersion extends Component {
  constructor(props) {
      super(props);
      this.state = {
          commits: [],
          commitsChecked: [],
          dataReceived: false,
          skillMeta: {
            modelValue: "general",
            groupValue: "",
            languageValue: "",
            skillName: ""
          },
          checkBoxChecks:[],
      };
      console.log(this.props);
  }

  componentDidMount(){
    if(this.props.location.state.skillMeta){
      let skillMetaData = this.props.location.state.skillMeta;
      let commitHistoryBaseURL = 'http://api.susi.ai/cms/getSkillHistory.json';
      let commitHistoryURL = commitHistoryBaseURL +
                            '?model=' + skillMetaData.modelValue +
                            '&group=' + skillMetaData.groupValue +
                            '&language=' + skillMetaData.languageValue +
                            '&skill=' + skillMetaData.skillName;
      this.getCommitHistory(commitHistoryURL);
    }
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
      var initChecked = [];
      var initCheckBoxStates = [];
      commits.forEach((commit,index) => {
        if(index === 0){
          commit.latest = true;
          initCheckBoxStates.push(true);
          initChecked.push(0);
        }
        else if(index === 1){
          initCheckBoxStates.push(true);
          initChecked.push(1);
        }
        else {
          initCheckBoxStates.push(false);
        }
      });
      this.setState({
        commits:commits,
        dataReceived: true,
        skillMeta: this.props.location.state.skillMeta,
        commitsChecked: initChecked,
        checkBoxChecks: initCheckBoxStates,
      });
      console.log(this.state);
    }
  }

  onCheck = (event,isInputChecked) => {
    console.log(event.target.name);
    var checkBoxID = parseInt(event.target.name,10);
    let commitsChecked = this.state.commitsChecked;
    let checkBoxStates = this.state.checkBoxChecks;
    if(isInputChecked){
      if(commitsChecked.length < 2){
        checkBoxStates[checkBoxID] = true;
        commitsChecked.push(event.target.name);
        this.setState({
          commitsChecked: commitsChecked,
          checkBoxChecks: checkBoxStates
        });
      }
      else {
        var checkedID1 = parseInt(commitsChecked[0],10);
        var checkedID2 = parseInt(commitsChecked[1],10);
        var initCheckMin = Math.min(checkedID1, checkedID2);
        var initCheckMax = Math.max(checkedID1, checkedID2);
        checkBoxStates.fill(false);
        if(checkBoxID > initCheckMax){
          checkBoxStates[initCheckMin] = true;
          checkBoxStates[checkBoxID] = true;
          commitsChecked[0] = initCheckMin;
          commitsChecked[1] = checkBoxID;
        }
        else{
          checkBoxStates[checkBoxID] = true;
          checkBoxStates[initCheckMax] = true;
          commitsChecked[0] = checkBoxID;
          commitsChecked[1] = initCheckMax;
        }
        this.setState({
          commitsChecked: commitsChecked,
          checkBoxChecks: checkBoxStates
        });
      }
    }
    else{
      var delIndex = commitsChecked.indexOf(checkBoxID);
      commitsChecked.splice(delIndex,1);
      checkBoxStates[checkBoxID] = false;
      this.setState({
        commitsChecked: commitsChecked,
        checkBoxChecks: checkBoxStates,
      });
    }
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
    return;
  }

  getSkillAtCommitIDUrl = () => {
    let baseUrl = ' http://api.susi.ai/cms/getFileAtCommitID.json';
    let skillMetaData = this.state.skillMeta;
    let skillAtCommitIDUrl = baseUrl +
                            '?model=' + skillMetaData.modelValue +
                            '&group=' + skillMetaData.groupValue +
                            '&language=' + skillMetaData.languageValue +
                            '&skill=' + skillMetaData.skillName +
                            '&commitID=';
    console.log(skillAtCommitIDUrl);
    return skillAtCommitIDUrl;
  }

  render(){

    const styles = {
        home: {
            width: '100%',
            fontSize: '14px',
        },
    };

    const compareBtnStyle = {
      marginTop: '20px',
    }

    let commitHistoryTableHeader =
      <TableRow>
        <TableHeaderColumn style={{width:'20px'}}></TableHeaderColumn>
        <TableHeaderColumn>Commit Date</TableHeaderColumn>
        <TableHeaderColumn>Commit ID</TableHeaderColumn>
        <TableHeaderColumn>Commit Message</TableHeaderColumn>
      </TableRow>;

    let commits = this.state.commits;
    let commitHistoryTableRows = commits.map((commit,index)=>{
      let checkBoxStates = this.state.checkBoxChecks;
      let checkBox = null;
      if(checkBoxStates){
        checkBox =  <Checkbox
                      name={index.toString()}
                      checked={checkBoxStates[index]}
                      onCheck={this.onCheck}/>;
      }
      else{
        let defaultChecked = index < 2 ? true : false;
        checkBox = <Checkbox
          name={index.toString()}
          checked={defaultChecked}
          onCheck={this.onCheck}/>;
      }

      return(
        <TableRow key={index}>
          <TableRowColumn style={{width:'20px'}}>
            {checkBox}
          </TableRowColumn>
          <TableRowColumn>
          <Link to={{
              pathname: '/skillHistory',
              state: {
                url: this.getSkillAtCommitIDUrl(),
                skillMeta: this.state.skillMeta,
                commits: [commit],
                latestCommit: this.state.commits[0]
              }
          }}>
            <abbr title={commit.commitDate}>{commit.commitDate}</abbr>
          </Link>
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

    return(
      <div>
        <StaticAppBar {...this.props} />
        {!this.state.dataReceived ?
          (
            <h1 className="skill_loading_container">Loading...</h1>
          )
          :
          (
            <div className="skill_listing_container" style={styles.home}>
            <div className="margin-b-md margin-t-md skill">
                <h1 className="title">
                    {this.state.skillMeta.skillName + ' : '}Revision History
                </h1>
                <p><span>For any version listed below, click on its date to view it.</span></p>
                <div style={compareBtnStyle}>
                  {commitHistoryTable}
                </div>
                {(this.state.commitsChecked.length === 2) &&
                <Link to={{
                    pathname: '/skillHistory',
                    state: {
                      url: this.getSkillAtCommitIDUrl(),
                      skillMeta: this.state.skillMeta,
                      commits: this.getCheckedCommits(),
                      latestCommit: this.state.commits[0]
                    }
                }}>
                  <RaisedButton
                    label="Compare Selected Versions"
                    backgroundColor="#4285f4"
                    labelColor="#fff"
                    style={compareBtnStyle}
                  />
                </Link>
              }
            </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default SkillVersion;
