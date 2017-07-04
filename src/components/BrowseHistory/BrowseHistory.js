import React from "react";
import MenuItem from "material-ui/MenuItem";
import request from "../../Utils/request";
import SelectField from "material-ui/SelectField";
import {TextField} from "material-ui";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/navigation/arrow-forward";
import Paper from "material-ui/Paper";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
const models = [];
const groups = [];
const experts = [];


request('http://cors-anywhere.herokuapp.com/api.susi.ai/cms/getModel.json').then((data) => {
    console.log(data.data);
    data = data.data;
    for (let i = 0; i < data.length; i++) {
        models.push(<MenuItem value={i} key={data[i]} primaryText={`${data[i]}`}/>);
    }

    console.log(models);
});

request('http://cors-anywhere.herokuapp.com/api.susi.ai/cms/getGroups.json').then((data) => {
    console.log(data.data);
    data = data.data;
    for (let i = 0; i < data.length; i++) {
        groups.push(<MenuItem value={i} key={data[i]} primaryText={`${data[i]}`}/>);
    }

    console.log(groups);
});

request('http://cors-anywhere.herokuapp.com/api.susi.ai/cms/getAllLanguages.json?group=entertainment').then((data) => {
    console.log(data.data);
    data = data.data;
    for (let i = 0; i < data.length; i++) {
        experts.push(<MenuItem value={i} key={data[i]} primaryText={`${data[i]}`}/>);
    }

    console.log(groups);
});


// const styles = {
//
// };

const tableData = [
    {
        author: 'Chetan Kaushik',
        commitID: '2b8dc576ec5f19c',
        commit_message: 'Changed Bitcoin to Etherium'
    },
    {
        author: 'Saurabh Jain',
        commitID: '12165982fdb',
        commit_message: 'Changed Etherium back to Bitcoin'
    }

];


export default class BrowseHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 1};
    }

    updateCode = (newCode) => {
        this.setState({
            code: newCode,
        });
    }
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
                            style={{width: '130px'}}
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            {models}
                        </SelectField>
                        <SelectField
                            floatingLabelText="Group"
                            style={{width: '160px'}}
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            {groups}
                        </SelectField>
                        <SelectField
                            floatingLabelText="Expert"
                            style={{width: '50px'}}
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            {experts}
                        </SelectField>
                        <TextField
                            hintText="Hint Text"
                            floatingLabelText="Fixed Floating Label Text"
                            floatingLabelFixed={true}
                        />
                        <FloatingActionButton style={{marginLeft: 25}} onClick={this.showModal}>
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
                        {tableData.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>{row.commitID}</TableRowColumn>
                                <TableRowColumn>{row.commit_message}</TableRowColumn>
                                <TableRowColumn>{row.author}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
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
