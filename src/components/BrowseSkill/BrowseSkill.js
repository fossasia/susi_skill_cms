import React from "react";
import isoConv from 'iso-language-converter';
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { FloatingActionButton, Paper} from "material-ui";
import Add from 'material-ui/svg-icons/content/add';
import ContentAdd from "material-ui/svg-icons/navigation/arrow-forward";
import {Card} from 'material-ui/Card';
import * as $ from "jquery";
import Link from "react-router-dom/es/Link";
import colors from "../../Utils/colors";
import CircleImage from "../CircleImage/CircleImage";
import './BrowseSkill.css';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
const groups = [];
const languages = [];

export default class BrowseSkill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modelValue: "general",
            skillURL:null,
            groupValue:"Knowledge",
            languageValue:"en",
            expertValue:null,
            skills: [],
            first_open:true,
            groupSelect:true,
            languageSelect:true
        };
    }

    componentDidMount(){
        this.loadInitialCards();
        this.handleModelChange();
    }

    loadInitialCards = () => {
        let url;
        url = "http://api.susi.ai/cms/getSkillList.json";
        let self = this;
        $.ajax({
            url: url,
            jsonpCallback: 'pxcd',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                let skills = Object.keys(data.skills);
                skills = skills.map((el, i) => {
                    let skill = data.skills[el];
                    let skill_name, examples, image,description;
                    if(skill.skill_name){
                        skill_name = skill.skill_name;
                        skill_name = skill_name.charAt(0).toUpperCase() + skill_name.slice(1);
                    }
                    else{
                        skill_name = 'Name not available';
                    }
                    if(skill.image){
                        image = 'https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/'+self.state.modelValue+'/'+
                            self.state.groupValue+'/'+self.state.languageValue+'/'+skill.image;
                    }
                    else{
                        image = ''
                    }
                    if(skill.examples){
                        examples = skill.examples;
                        examples = examples[0];
                    }
                    else{
                        examples = null
                    }
                    if(skill.descriptions){
                        description = skill.descriptions;
                    }
                    else{
                        description = 'No description available'
                    }

                    return (
                        <Link key={el}
                              to={{
                                  pathname: '/skillPage',
                                  state: { url: url, element: el, name: el, modelValue: self.state.modelValue, groupValue:self.state.groupValue, languageValue:self.state.languageValue}
                              }}>
                            <Card style={styles.row} key={el}>
                                <div style={styles.right} key={el}>
                                    {image ? <div style={styles.imageContainer}>
                                        <img alt={skill_name} src={image} style={styles.image}/>
                                    </div>:
                                        <CircleImage name={el} size="48"/>}
                                    <div style={styles.titleStyle}>"{examples}"</div>
                                </div>
                                <div style={styles.details}>
                                    <h3 style={styles.name}>{skill_name}</h3>
                                    <p style={styles.description}>{description}</p>
                                </div>
                            </Card>
                        </Link>
                    )
                });

                self.setState({
                    skills : skills,
                    skillURL: url
                })

            }
        });
    };


    handleModelChange = (event, index) => {
        this.setState({groupSelect:false,languageSelect:true});
        if(groups.length===0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getGroups.json",
                jsonpCallback: 'pb',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    data = data.groups;
                    for (let i = 0; i < data.length; i++) {
                        groups.push(<MenuItem value={data[i]} key={data[i]} primaryText={`${data[i]}`}/>);
                    }
                }
            });
        }
    }

    handleGroupChange = (event, index, value) => {
        this.setState({groupValue: value,groupSelect:false,languageSelect:false});
        if(languages.length===0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getAllLanguages.json",
                jsonpCallback: 'pc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    data=data.languagesArray
                    for (let i = 0; i < data.length; i++) {
                        if(isoConv(data[i])){
                            languages.push(<MenuItem value={data[i]} key={data[i]} primaryText={isoConv(data[i])}/>);
                        }
                        else {
                            languages.push(<MenuItem value={data[i]} key={data[i]} primaryText={'Universal'}/>);
                        }
                    }
                    console.log("languages ", languages)
                }
            });
        }
    }

    handleLanguageChange = (event, index, value) => this.setState({languageValue: value});

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    buttonClick = () => {
        let url;
        if(languages.length>0&&groups.length>0) {
            url  = "http://api.susi.ai/cms/getSkillList.json?model=" + this.state.modelValue + "&group=" + this.state.groupValue + "&language=" + this.state.languageValue;
        }
        else{
            url = "http://api.susi.ai/cms/getSkillList.json"
        }

        console.log(url);

        let self = this;
        $.ajax({
            url: url,
            jsonpCallback: 'pxcd',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                let skills = Object.keys(data.skills);
                skills = skills.map((el, i) => {
                    let skill = data.skills[el];
                    let skill_name, examples, image,description;
                    if(skill.skill_name){
                        skill_name = skill.skill_name;
                        skill_name = skill_name.charAt(0).toUpperCase() + skill_name.slice(1);
                    }
                    else{
                        skill_name = 'Name not available';
                    }
                    if(skill.image){
                        image = 'https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/'+self.state.modelValue+'/'+
                            self.state.groupValue+'/'+self.state.languageValue+'/'+skill.image;
                    }
                    else{
                        image = ''
                    }
                    if(skill.examples){
                        examples = skill.examples;
                        examples= examples[0];
                    }
                    else{
                        examples = null
                    }
                    if(skill.descriptions){
                        description = skill.descriptions;
                    }
                    else{
                        description = 'No description available'
                    }
                    return (
                        <Link key={el}
                              to={{
                                  pathname: '/skillPage',
                                  state: { url: url, element: el, name: el, modelValue: self.state.modelValue, groupValue:self.state.groupValue, languageValue:self.state.languageValue}
                              }}>
                            <Card style={styles.row} key={el}>
                                <div style={styles.right} key={el}>
                                    {image ? <div style={styles.imageContainer}>
                                        <img alt={skill_name} src={image} style={styles.image}/>
                                    </div>:
                                        <CircleImage name={el} size="48"/>}
                                    <div style={styles.titleStyle}>"{examples}"</div>
                                </div>
                                <div style={styles.details}>
                                    <h3 style={styles.name}>{skill_name}</h3>
                                    <p style={styles.description}>{description}</p>
                                </div>
                            </Card>
                        </Link>
                    )
                });

                self.setState({
                    skills : skills,
                    skillURL: url
                })
                console.log(self.state)
            }
        });
    };

    render() {

        const style = {
            width: "100%",
            padding: "10px"
        };

        return (
            <div>
                <StaticAppBar {...this.props} />
                <div style={styles.container}>
                    <Paper style={style} zDepth={1}>
                        <div style={styles.center}>
                            <SelectField
                                disabled={this.state.groupSelect}
                                floatingLabelText="Category"
                                value={this.state.groupValue}
                                floatingLabelFixed={false}
                                onChange={this.handleGroupChange}
                                className='select'
                                listStyle={{
                                    top: '100px'
                                }}
                                selectedMenuItemStyle={{
                                    color: '#4285f4'
                                }}
                                underlineFocusStyle={{
                                    color: '#4285f4'

                                }}
                            >
                                {groups}
                            </SelectField>
                            <SelectField
                                disabled={this.state.languageSelect}
                                floatingLabelText="Language"
                                value={this.state.languageValue}
                                floatingLabelFixed={false}
                                onChange={this.handleLanguageChange}
                                className='select'
                                listStyle={{
                                    top: '100px'
                                }}
                                selectedMenuItemStyle={{
                                    color: '#4285f4'
                                }}
                                underlineFocusStyle={{
                                    color: '#4285f4'

                                }}
                            >
                                {languages}
                            </SelectField>
                            <div>
                                <FloatingActionButton backgroundColor={colors.fabButton} className='select' onClick={this.buttonClick}>
                                    <ContentAdd />
                                </FloatingActionButton>
                                <Link to="/skillCreator">
                                    <FloatingActionButton
                                        backgroundColor={colors.fabButton} className='select'>
                                        <Add />
                                    </FloatingActionButton>
                                </Link>
                            </div>
                        </div>

                    </Paper>

                    <div style={{marginTop:"20px",   marginBottom: "40px",
                        textAlign: "justify",
                        fontSize: "0.1px", width: "100%"}}>
                        <div className="row" style={styles.scroll}  >
                            <div style={styles.gridList}>
                                {this.state.skills}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {

    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    imageContainer:{
        position: 'relative',
        height: '80px',
        width: '80px',
        verticalAlign: 'top'
    },
    name:{
        textAlign: 'left',
        fontSize: '15px',
        color: '#4285f4',
        margin: '4px 0'
    },
    details:{
        paddingLeft:'10px'
    },
    image:{
        maxWidth: '100%',
        border: 0
    },
    feedback:{
        color:'#4285f4',
        fill:'#4285f4',
        display: "flex",
    },
    description:{
        textAlign:'left',
        fontSize: '14px'
    },
    listStyle: {
        width: "100%",
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        padding: "80px 30px 30px",
    },
    propContainer: {
        width: 100,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
    row: {
        width: 280,
        minHeight:'200px',
        margin:"10px",
        overflow:'hidden',
        justifyContent: "center",
        fontSize: '10px',
        textAlign: 'center',
        display: 'inline-block',
        background: '#f2f2f2',
        borderRadius: '5px',
        backgroundColor: '#f4f6f6',
        border: '1px solid #eaeded',
        padding: '4px',
    },
    scroll: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: "100%"
    },
    gridList: {
        flexWrap: 'wrap',
        flexDirection: "row",
        margin:"10px",
        textAlign:"center"
    },
    right: {
        display: 'flex',
        alignItems:"center",
        flexDirection: 'row',
        padding: "8px",
        background: '#fff',
        height: '130px'
    },
    titleStyle:{
        textAlign: 'left',
        fontStyle: 'italic',
        fontSize: '16px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: '138px',
        marginLeft: '15px',
        verticalAlign: 'middle',
        display: 'block'
    }
}