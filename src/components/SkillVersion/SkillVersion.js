import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { RaisedButton } from 'material-ui';
import { RadioButton } from 'material-ui/RadioButton';
import notification from 'antd/lib/notification';
import Icon from 'antd/lib/icon';
import $ from 'jquery';

import colors from '../../Utils/colors';
import urls from '../../Utils/urls';
class SkillVersion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commits: [],
            dataReceived: false,
            skillMeta: {
                modelValue: 'general',
                groupValue: this.props.location.pathname.split('/')[1],
                languageValue: this.props.location.pathname.split('/')[4],
                skillName: this.props.location.pathname.split('/')[2]
            },
            leftChecks:[],
            rightChecks:[],
            currLeftChecked:null,
            currRightChecked:null,
        };
        // console.log(this.props);
    }

    componentDidMount(){
        let commitHistoryBaseURL = urls.API_URL + '/cms/getSkillHistory.json';
        let commitHistoryURL = commitHistoryBaseURL +
            '?model=' + this.state.skillMeta.modelValue +
            '&group=' + this.state.skillMeta.groupValue +
            '&language=' + this.state.skillMeta.languageValue +
            '&skill=' + this.state.skillMeta.skillName;
        this.getCommitHistory(commitHistoryURL);
    }

  getCommitHistory = (commitHistoryURL) => {
    // console.log(commitHistoryURL);
    let self = this;
    $.ajax({
        url: commitHistoryURL,
        dataType: 'json',
        success: function (commitsData) {
            self.setCommitHistory(commitsData);
        },
        error: function(xhr, status, error) {
          notification.open({
            message: 'Error Processing your Request',
            description: 'Failed to fetch data. Please Try Again',
            icon: <Icon type='close-circle' style={{ color: '#f44336' }} />,
          });
          return 0;
        }
    });
  };

    setCommitHistory = (commitsData) => {
        // console.log(commitsData);
        if(commitsData.accepted){
            let commits = commitsData.commits ? commitsData.commits : [];
            var initLeftChecked = null;
            var initRightChecked = null;
            var initLeftCheckBoxStates = [];
            var initRightCheckBoxStates = [];
            commits.forEach((commit,index) => {
                if(index === 0){
                    commit.latest = true;
                    initRightCheckBoxStates.push(true);
                    initLeftCheckBoxStates.push(false);
                    initRightChecked = 0;
                }
                else if(index === 1){
                    initRightCheckBoxStates.push(false);
                    initLeftCheckBoxStates.push(true);
                    initLeftChecked = 1;
                }
                else {
                    initRightCheckBoxStates.push(false);
                    initLeftCheckBoxStates.push(false);
                }
            });
            this.setState({
                commits:commits,
                dataReceived: true,
                leftChecks:initLeftCheckBoxStates,
                rightChecks:initRightCheckBoxStates,
                currLeftChecked:initLeftChecked,
                currRightChecked:initRightChecked,
            });
        }
    };

    onCheck = (event) => {
        let side = event.target.name.split('-')[1];
        let index = parseInt(event.target.name.split('-')[0],10);
        var currLeft = this.state.currLeftChecked;
        var currRight = this.state.currRightChecked;
        var leftChecks = this.state.leftChecks;
        var rightChecks = this.state.rightChecks;
        if(side === 'right'){
            if(!(index >= currLeft)){
                rightChecks.fill(false);
                rightChecks[index] = true;
                currRight = index;
            }
        }
        else if(side === 'left'){
            if(!(index <= currRight)){
                leftChecks.fill(false);
                leftChecks[index] = true;
                currLeft = index;
            }
        }
        this.setState({
            currLeftChecked: currLeft,
            currRightChecked: currRight,
            leftChecks: leftChecks,
            rightChecks: rightChecks,
        });
    }

    getCheckedCommits = () => {
        let commits = this.state.commits;
        var currLeft = this.state.currLeftChecked;
        var currRight = this.state.currRightChecked;
        let commitOld = commits[currLeft];
        let commitRecent = commits[currRight];
        return [commitOld,commitRecent]
    };

    render(){

        const styles = {
            home: {
                width: '100%',
                fontSize: '14px',
            },
        };

        const compareBtnStyle = {
            margin: '20px',
        };

        var showCompareBtn = false;
        if(this.state.currLeftChecked != null &&
            this.state.currRightChecked != null){
            showCompareBtn = true;
        }

        let commitHistoryTableHeader =
            <TableRow>
                <TableHeaderColumn style={{width:'20px'}}></TableHeaderColumn>
                <TableHeaderColumn style={{width:'20px'}}></TableHeaderColumn>
                <TableHeaderColumn>Commit Date</TableHeaderColumn>
                <TableHeaderColumn>Commit ID</TableHeaderColumn>
                <TableHeaderColumn>Commit Author</TableHeaderColumn>
                <TableHeaderColumn>Commit Message</TableHeaderColumn>
            </TableRow>;

        let commits = this.state.commits;
        let commitHistoryTableRows = commits.map((commit,index)=>{
            let leftChecks = this.state.leftChecks;
            let rightChecks = this.state.rightChecks;
            let leftRadioBtn = null;
            let rightRadioBtn = null;
            if(leftChecks && rightChecks){
                leftRadioBtn =  <RadioButton
                    name={index.toString()+'-left'}
                    checked={leftChecks[index]}
                    onCheck={this.onCheck}/>;
                rightRadioBtn =  <RadioButton
                    name={index.toString()+'-right'}
                    checked={rightChecks[index]}
                    onCheck={this.onCheck}/>;
            }
            else{
                leftRadioBtn =  <RadioButton
                    name={index.toString()+'-left'}
                    checked={index===1}
                    onCheck={this.onCheck}/>;
                rightRadioBtn =  <RadioButton
                    name={index.toString()+'-right'}
                    checked={index===0}
                    onCheck={this.onCheck}/>;
            }
            if(showCompareBtn){
                var currLeft = this.state.currLeftChecked;
                var currRight = this.state.currRightChecked;
                if(index <= currRight){
                    leftRadioBtn=null;
                }
                if(index >= currLeft){
                    rightRadioBtn=null;
                }
            }

            return(
                <TableRow key={index}>
                    <TableRowColumn style={{width:'20px'}}>
                        {leftRadioBtn}
                    </TableRowColumn>
                    <TableRowColumn style={{width:'20px'}}>
                        {rightRadioBtn}
                    </TableRowColumn>
                    <TableRowColumn>
                        <Link to={{
                            pathname: '/'+this.state.skillMeta.groupValue+
                            '/'+this.state.skillMeta.skillName+
                            '/edit/'+this.state.skillMeta.languageValue+
                            '/'+commit.commitID
                        }}>
                            <abbr title={commit.commitDate}>{commit.commitDate}</abbr>
                        </Link>
                    </TableRowColumn>
                    <TableRowColumn>
                        <abbr title={commit.commitID}>{commit.commitID}</abbr>
                    </TableRowColumn>
                    <TableRowColumn>
                        <abbr title={commit.author}>{commit.author}</abbr>
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

        let checkedCommits = this.getCheckedCommits();

        return(
            <div>
                <StaticAppBar {...this.props} />
                {!this.state.dataReceived ?
                    (
                        <h1 className='skill_loading_container'>Loading...</h1>
                    )
                    :
                    (
                        <div className='skill_listing_container' style={styles.home}>
                            <div className='margin-b-md margin-t-md skill'>
                                <h1 className='title'>
                                    {this.state.skillMeta.skillName + ' : '}Revision History
                                </h1>
                                <p>
                  <span>
                    For any version listed below, click on its date to view it.
                  </span>
                                </p>
                                <div style={compareBtnStyle}>
                                    {commitHistoryTable}
                                </div>
                                {(showCompareBtn) &&
                                <Link to={{
                                    pathname: '/'+this.state.skillMeta.groupValue+
                                    '/'+this.state.skillMeta.skillName+
                                    '/compare/'+this.state.skillMeta.languageValue+
                                    '/'+checkedCommits[0].commitID+
                                    '/'+checkedCommits[1].commitID,
                                }}>
                                    <RaisedButton
                                        label='Compare Selected Versions'
                                        backgroundColor={colors.header}
                                        labelColor='#fff'
                                        style={compareBtnStyle}
                                    />
                                </Link>
                                }<a href="../en"><RaisedButton
					label='Back'
                                        backgroundColor={colors.header}
                                        labelColor='#fff'
                                        style={compareBtnStyle}
                                    /></a>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

SkillVersion.propTypes = {
    location: PropTypes.object
};

export default SkillVersion;
