import React from "react";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import {FloatingActionButton, Paper, TextField} from "material-ui";
import ContentAdd from "material-ui/svg-icons/navigation/arrow-forward";
import {Icon, notification} from 'antd';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import * as $ from "jquery";
const models = [];
const groups = [];
const languages = [];

export default class BrowseHistory extends React.Component {
    componentDidMount(){
        this.buttonClick()
    }
    constructor(props) {
        super(props);

        this.state = {
            modelValue: null, groupValue:null, languageValue:null, expertValue:null, tableData:[],
    };

    }
    loadmodels()
    {
        if(models.length===0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getModel.json",
                jsonpCallback: 'pa',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (d) {
                    console.log(d);
                    for (let i = 0; i < d.length; i++) {
                        models.push(<MenuItem value={i} key={d[i]} primaryText={`${d[i]}`}/>);
                    }
                }
            });
        }
    }

    updateCode = (newCode) => {
        this.setState({
            code: newCode,
        });
    }

    handleModelChange = (event, index, value) => {
        this.setState({modelValue: value});
        if(groups.length===0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getGroups.json",
                jsonpCallback: 'pb',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        groups.push(<MenuItem value={i} key={data[i]} primaryText={`${data[i]}`}/>);
                    }
                }
            });
        }
    }
    handleExpertChange = (event) => {
        console.log(event.target.value);
        this.setState({
            expertValue: event.target.value,
        });

    };
    handleGroupChange = (event, index, value) => {
        this.setState({groupValue: value});
        if(languages.length===0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getAllLanguages.json",
                jsonpCallback: 'pc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        languages.push(<MenuItem value={i} key={data[i]} primaryText={`${data[i]}`}/>);
                    }
                    console.log("languages ", languages)
                }
            });
        }
    }

    handleLanguageChange = (event, index, value) => this.setState({languageValue: value});

    state = {
        fixedHeader: false,
        fixedFooter: false,
        stripedRows: false,
        showRowHover: true,
        selectable: false,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: false,
        height: '300px',
        visible: false
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({height: event.target.value});
    };

    buttonClick = () => {
        let url;
        console.log(url);
        if(models.length) {
            url = "http://api.susi.ai/cms/getSkillHistory.json?model="+models[this.state.modelValue].key+"&group="+groups[this.state.groupValue].key+"&language="+languages[this.state.languageValue].key+"&skill="+this.state.expertValue;
        }
        else{
            this.setState({
                msg: "Select a Model, Group and language from the Dropdown"
            }
        )}

        let self = this;
        $.ajax({
            url: url,
            jsonpCallback: 'pccd',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function(data) {
                data = data.commits;
                let array = [];
                for(let i=0;i<data.length;i++){
                    array.push(data[i]);
                }
                if(data.length===0){
                    notification.open({
                        message: 'Error Processing your Request',
                        description: 'Error in processing the request. Please try with some other skill',
                        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
                    });
                }
                self.setState({tableData:array,msg:""})
                console.log(self.state.tableData)
            },
            error: function(e) {
                console.log(e);
                notification.open({
                    message: 'Error Processing your Request',
                    description: 'Error in processing the request. Please try with some other skill',
                    icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
                });
            }
        });

    }

    // handleChange = (event, index, value) => this.setState({value});
    render() {

        const style = {
            width: "100%",
            padding: "10px"
        };


        return (
            <div style={styles.container}>
                <Paper style={style} zDepth={1}>
                    <div style={styles.center}>
                        <SelectField
                            floatingLabelText="Model"
                            style={{width:'130px'}}
                            value={this.state.modelValue}
                            onChange={this.handleModelChange}
                            onMouseEnter={this.loadmodels}
                        >
                            {models}
                        </SelectField>
                        <SelectField
                            floatingLabelText="Group"
                            style={{width:'160px'}}
                            value={this.state.groupValue}
                            onChange={this.handleGroupChange}
                        >
                            {groups}
                        </SelectField>
                        <SelectField
                            floatingLabelText="Expert"
                            style={{width:'50px'}}
                            value={this.state.languageValue}
                            onChange={this.handleLanguageChange}
                        >
                            {languages}
                        </SelectField>
                        <TextField
                            hintText="Hint Text"
                            floatingLabelText="Fixed Floating Label Text"
                            floatingLabelFixed={true}
                            onChange={this.handleExpertChange}
                        />
                        <FloatingActionButton style={{marginLeft: 25}} onClick={this.buttonClick}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>

                </Paper>


                <Table
                    height={this.state.height}
                    fixedHeader={false}
                    fixedFooter={false}
                    selectable={false}
                    multiSelectable={false}
                    style={{marginTop: 10}}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >

                        <TableRow>
                            <TableHeaderColumn tooltip="Commit ID">Commit ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Commit Message">Commit Message</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Author Name">Author Name</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.state.tableData.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>{row.commitID}</TableRowColumn>
                                <TableRowColumn>{row.commit_message}</TableRowColumn>
                                <TableRowColumn>{row.author}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                <p>{this.state.msg}</p>
            </div>
        );
    }
}

const styles = {

    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%"
    },
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },

}
