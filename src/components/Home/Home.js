import React from 'react';
import { Icon } from 'antd';
import CodeMirror from 'react-codemirror';
import Chatbox from "../Chatbox/Chatbox";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import request from "../../Utils/request";
import SelectField from 'material-ui/SelectField';
import {TextField} from "material-ui";
import RaisedButton from 'material-ui/RaisedButton';
const models = [];
const groups = [];
const experts = [];
// for (let i = 0; i < 100; i++ ) {
//     items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
// }

request('http://cors-anywhere.herokuapp.com/api.susi.ai/cms/getModel.json').then((data) => {
    console.log(data.data);
    data = data.data;
    for(let i=0;i<data.length;i++){
        models.push(<MenuItem value={i} key={data[i]} primaryText={`${data[i]}`}/>);
    }

    console.log(models);
});

request('http://cors-anywhere.herokuapp.com/api.susi.ai/cms/getGroups.json').then((data) => {
    console.log(data.data);
    data = data.data;
    for(let i=0;i<data.length;i++){
        groups.push(<MenuItem value={i} key={data[i]} primaryText={`${data[i]}`}/>);
    }

    console.log(groups);
});

request('http://cors-anywhere.herokuapp.com/api.susi.ai/cms/getAllLanguages.json?group=entertainment').then((data) => {
    console.log(data.data);
    data = data.data;
    for(let i=0;i<data.length;i++){
        experts.push(<MenuItem value={i} key={data[i]} primaryText={`${data[i]}`}/>);
    }

    console.log(groups);
});




export default class Container extends React.Component {
    state = {
        code: "//code"
    };


    constructor(props) {
        super(props);
        this.state = {value: 1};
    }

    updateCode = (newCode) => {
        this.setState({
            code: newCode,
        });
    }

    handleChange = (event, index, value) => this.setState({value});
    render() {
        const options = {
            lineNumbers: true
        };
        return (

            <div>
                {/*<DropDownMenu maxHeight={300}   value={0} onChange={this.handleChange}>*/}
                {/*{models}*/}
                {/*</DropDownMenu>*/}
                <div style={styles.dropdownDiv}>
                <SelectField
                    floatingLabelText="Model"
                    style={{width:'130px'}}
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    {models}
                </SelectField>
                <SelectField
                    floatingLabelText="Group"
                    style={{width:'160px'}}
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    {groups}
                </SelectField>
                <SelectField
                    floatingLabelText="Expert"
                    style={{width:'50px'}}
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
                    <RaisedButton label="Create" style={{height:52}} backgroundColor="#607D8B" labelColor="#ffffff"/>
                </div>
                <div style={styles.home}>

                    <div style={styles.toolbar}>

                        <span style={styles.button}><Icon type="caret-right" style={styles.icon} />Run</span>
                        <span style={styles.button}><Icon type="cloud-download" style={styles.icon}/>Save</span>
                        <span style={styles.button}><Icon type="menu-unfold" style={styles.icon} />Indent</span>
                    </div>
                    < CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
                    <Chatbox />

                </div>
            </div>

        );
    }
}

const styles = {
    home: {
        width: '1040px',
        marginTop: "100px",
        padding: "30px",
        position: "absolute",
        right: 0,
        top: 0,
    },
    dropdownDiv:{
        width: '1040px',
        marginTop: "50px",
        position: "absolute",
        right: 0,
        paddingLeft: "30px",

        top: 0,
        display: "flex",
        alignItems: "center"
    },
    toolbar: {
        width: "100%",
        height: "50px",
        background: "#fff",
        borderBottom: "2px solid #eee",
        display: "flex",
        alignItems: "stretch",
        padding: "0 25px",
        fontSize: "14px"
    },
    button: {
        display: "flex",
        marginRight: "30px",
        alignItems: "center",
        cursor: "pointer"
    },
    icon: {
        marginRight: "5px"
    },
    customWidth: {
        width: 50,
    },
}