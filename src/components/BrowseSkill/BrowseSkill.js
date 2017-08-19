import React from 'react';
import styles from './SkillStyle';
import isoConv from 'iso-language-converter';
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { FloatingActionButton, Paper } from "material-ui";
import Add from 'material-ui/svg-icons/content/add';
import ContentAdd from "material-ui/svg-icons/navigation/arrow-forward";
import { Card } from 'material-ui/Card';
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
            skillURL: null,
            groupValue: "Knowledge",
            languageValue: "en",
            expertValue: null,
            skills: [],
            groups: [],
            languages: [],
            first_open: true,
            groupSelect: true,
            languageSelect: true
        };
    }

    componentDidMount() {
        this.loadInitialCards();
        this.handleModelChange();
        this.handleGroupChange();
        this.setState({ groupValue: "Knowledge" });
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
                    let skill_name, examples, image, description;
                    if (skill.skill_name) {
                        skill_name = skill.skill_name;
                        skill_name = skill_name.charAt(0).toUpperCase() + skill_name.slice(1);
                    }
                    else {
                        skill_name = 'Name not available';
                    }
                    if (skill.image) {
                        image = 'https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/' + self.state.modelValue + '/' +
                            self.state.groupValue + '/' + self.state.languageValue + '/' + skill.image;
                    }
                    else {
                        image = ''
                    }
                    if (skill.examples) {
                        examples = skill.examples;
                        examples = examples[0];
                    }
                    else {
                        examples = null
                    }
                    if (skill.descriptions) {
                        if (skill.descriptions.length > 120) {
                            description = skill.descriptions.substring(0, 119) + "...";
                        }
                        else {
                            description = skill.descriptions;
                        }
                    }
                    else {
                        description = 'No description available'
                    }

                    return (
                        <Link key={el}
                            to={{
                                pathname: '/' + self.state.groupValue + '/' + el + '/' + self.state.languageValue,
                                state: {
                                    url: url,
                                    element: el,
                                    name: el,
                                    modelValue: self.state.modelValue,
                                    groupValue: self.state.groupValue,
                                    languageValue: self.state.languageValue,
                                }
                            }}>
                            <Card style={styles.row} key={el}>
                                <div style={styles.right} key={el}>
                                    {image ? <div style={styles.imageContainer}>
                                        <img alt={skill_name} src={image} style={styles.image} />
                                    </div> :
                                        <CircleImage name={el} size="48" />}
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
                    skills: skills,
                    skillURL: url
                })

            }
        });
    };


    handleModelChange = (event, index) => {
        this.setState({ groupSelect: false, languageSelect: true });
        if (groups.length === 0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getGroups.json",
                jsonpCallback: 'pb',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    data = data.groups;
                    this.setState({ groups: data });
                    for (let i = 0; i < data.length; i++) {
                        groups.push(<MenuItem value={data[i]} key={data[i]} primaryText={`${data[i]}`} />);
                    }
                }.bind(this)
            });
        }
    };

    handleGroupChange = (event, index, value) => {
        this.setState({ groupValue: value, groupSelect: false, languageSelect: false });
        if (languages.length === 0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getAllLanguages.json",
                jsonpCallback: 'pc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {

                    data = data.languagesArray
                    this.setState({ languages: data });
                    for (let i = 0; i < data.length; i++) {
                        if (isoConv(data[i])) {
                            languages.push(<MenuItem value={data[i]} key={data[i]} primaryText={isoConv(data[i])} />);
                        }
                        else {
                            languages.push(<MenuItem value={data[i]} key={data[i]} primaryText={'Universal'} />);
                        }
                    }
                }.bind(this)
            });
        }
    };

    handleLanguageChange = (event, index, value) => this.setState({ languageValue: value });

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    buttonClick = () => {
        let url;
        if (languages.length > 0 && groups.length > 0) {
            url = "http://api.susi.ai/cms/getSkillList.json?model=" + this.state.modelValue + "&group=" + this.state.groupValue + "&language=" + this.state.languageValue;
        }
        else {
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
                    let skill_name, examples, image, description;
                    if (skill.skill_name) {
                        skill_name = skill.skill_name;
                        skill_name = skill_name.charAt(0).toUpperCase() + skill_name.slice(1);
                    }
                    else {
                        skill_name = 'Name not available';
                    }
                    if (skill.image) {
                        image = 'https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/' + self.state.modelValue + '/' +
                            self.state.groupValue + '/' + self.state.languageValue + '/' + skill.image;
                    }
                    else {
                        image = ''
                    }
                    if (skill.examples) {
                        examples = skill.examples;
                        examples = examples[0];
                    }
                    else {
                        examples = null
                    }
                    if (skill.descriptions) {
                        description = skill.descriptions;
                    }
                    else {
                        description = 'No description available'
                    }
                    return (
                        <Link key={el}
                            to={{
                                pathname: '/' + self.state.groupValue + '/' + el + '/' + self.state.languageValue,
                                state: {
                                    url: url,
                                    element: el,
                                    name: el,
                                    modelValue: self.state.modelValue,
                                    groupValue: self.state.groupValue,
                                    languageValue: self.state.languageValue,
                                }
                            }}>
                            <Card style={styles.row} key={el}>
                                <div style={styles.right} key={el}>
                                    {image ? <div style={styles.imageContainer}>
                                        <img alt={skill_name} src={image} style={styles.image} />
                                    </div> :
                                        <CircleImage name={el} size="48" />}
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
                    skills: skills,
                    skillURL: url
                });
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

                    <div style={{
                        marginTop: "20px", marginBottom: "40px",
                        textAlign: "justify",
                        fontSize: "0.1px", width: "100%"
                    }}>
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
