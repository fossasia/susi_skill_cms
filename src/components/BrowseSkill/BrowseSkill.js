import React from 'react';
import styles from './SkillStyle';
import ISO6391 from 'iso-639-1';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { RaisedButton, Drawer, List, ListItem } from 'material-ui';
import { Card } from 'material-ui/Card';
import * as $ from 'jquery';
import Link from 'react-router-dom/es/Link';
import colors from '../../Utils/colors';
import CircleImage from '../CircleImage/CircleImage';
import './BrowseSkill.css';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import urls from '../../Utils/urls';
const groups = [];
const languages = [];

export default class BrowseSkill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            modelValue: 'general',
            skillURL: null,
            groupValue: 'Knowledge',
            languageValue: 'en',
            expertValue: null,
            skills: [],
            groups: [],
            languages: [],
            groupSelect: false,
            languageSelect: false,
            skillsLoaded: false,
            filter:'&applyFilter=true&filter_name=ascending&filter_type=lexicographical'
        };
    }

    componentDidMount() {
        this.loadLanguages();
        this.loadGroups();
        this.loadCards();
    }

    handleFilterChange = (event, index, value) => {
        this.setState({ filter: value}, function() {
        this.loadCards();
        });
    };

    handleModelChange = (event, index) => {
        this.setState({ groupSelect: false}, function() {
        this.loadCards();
        });
    };

    handleGroupChange = (value) => {
        this.setState({groupValue: value}, function () {
            console.log(this.state);
            this.loadCards();
        });
    };

    handleLanguageChange = (event, index, value) => {
      this.setState({languageValue: value}, function () {
        console.log(this.state);
        this.loadCards();
        });
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    loadGroups = () => {
        if (groups.length === 0) {
            $.ajax({
                url: urls.API_URL + '/cms/getGroups.json',
                jsonpCallback: 'pb',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    data = data.groups;
                    this.setState({ groups: data });
                    data.sort();
                    for (let i = 0; i < data.length; i++) {
                        groups.push(<MenuItem
                                        value={data[i]}
                                        key={data[i]}
                                        primaryText={`${data[i]}`} />);
                    }
                }.bind(this)
            });
        }

    };

    loadLanguages = () =>{
        if (languages.length === 0) {
            $.ajax({
                url: urls.API_URL + '/cms/getAllLanguages.json',
                jsonpCallback: 'pc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    data = data.languagesArray;
                    data.sort();
                    this.setState({ languages: data });
                    for (let i = 0; i < data.length; i++) {
                        if (ISO6391.getNativeName(data[i])) {
                            languages.push(<MenuItem
                                value={data[i]}
                                key={data[i]}
                                primaryText={ISO6391.getNativeName(data[i])} />);
                        }
                        else {
                            languages.push(<MenuItem value={data[i]}
                                                    key={data[i]}
                                                    primaryText={'Universal'} />);
                        }
                    }

                }.bind(this)
            });
        }

    };

    loadCards = () => {
        let url;
        if (this.state.languages.length > 0 && this.state.groups.length > 0) {
            url = urls.API_URL + '/cms/getSkillList.json?model='
                  + this.state.modelValue + '&group=' + this.state.groupValue
                  + '&language=' + this.state.languageValue+ this.state.filter;
                  console.log(url);
        }
        else {
            url = urls.API_URL + '/cms/getSkillList.json?applyFilter=true&filter_name=ascending&filter_type=lexicographical'
        }

        let self = this;
        let cards=[];
        $.ajax({
            url: url,
            jsonpCallback: 'pxcd',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
              console.log(data)
                let skills = Object.keys(data.filteredData);
                skills = skills.map((el, i) => {
                    let skill = data.filteredData[el];
                    let skill_name, examples, image, description;
                    if (skill.skill_name) {
                        skill_name = skill.skill_name;
                        skill_name = skill_name.charAt(0).toUpperCase()
                                    + skill_name.slice(1);
                    }
                    else {
                        skill_name = 'Name not available';
                    }
                    if (skill.image) {
                        image = 'https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/'
                        + self.state.modelValue
                        + '/' +self.state.groupValue
                        + '/' + self.state.languageValue
                        + '/' + skill.image;
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
                            description = skill.descriptions.substring(0, 119) + '...';
                        }
                        else {
                            description = skill.descriptions;
                        }
                    }
                    else {
                        description = 'No description available'
                    }
                    cards.push(
                        <Link key={el}
                            to={{
                                pathname: '/' + self.state.groupValue
                                          + '/' + skill_name.toLowerCase().replace(/ /g, '_')
                                          + '/' + self.state.languageValue,
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
                                        <img alt={skill_name}
                                             src={image}
                                             style={styles.image} />
                                    </div> :
                                        <CircleImage name={el} size='48'/>}
                                    <div style={styles.titleStyle}>{examples}</div>
                                </div>
                                <div style={styles.details}>
                                    <h3 style={styles.name}>{skill_name}</h3>
                                    <p style={styles.description}>{description}</p>
                                </div>
                            </Card>
                        </Link>
                    );
                });

                self.setState({
                    skills: skills,
                    cards: cards,
                    skillURL: url,
                    skillsLoaded: true,
                });
                console.log(self.state)
            }
        });
    };

    render() {
        let skillDisplay;

        if( !this.state.skills.length && this.state.skillsLoaded ) {
            skillDisplay =
            <div
                style={{fontSize: 30}}>
                No Skills found. Be the first one to
                <Link to='/skillCreator'> create</Link> a skill in this category
            </div>
        }
        else {
            skillDisplay = this.state.cards
        }
        return (
            <div>
                <StaticAppBar {...this.props} />
                <div style={styles.container}>
                    <Drawer zDepth={1} containerStyle={styles.sideBar}>
                        <RaisedButton
                            backgroundColor={colors.fabButton}
                            fullWidth={true}
                            href={'/skillCreator'}
                            label={'Create Skill'}
                            labelStyle={styles.createSkillButton}
                            style={{ marginBottom: '24px' }}
                        />
                        <h2 style={styles.sideBarHeading}>Preferences</h2>
                        <SelectField
                            disabled={this.state.languageSelect}
                            floatingLabelText='Language'
                            value={this.state.languageValue}
                            floatingLabelFixed={false}
                            onChange={this.handleLanguageChange}
                            listStyle={{
                                top: '100px'
                            }}
                            selectedMenuItemStyle={{
                                color: colors.header
                            }}
                            style={styles.sideBarItem}
                            underlineFocusStyle={{
                                color: colors.header

                            }}
                        >
                        {languages}
                        </SelectField>
                        <SelectField
                            floatingLabelText='Filter'
                            value={this.state.filter}
                            floatingLabelFixed={false}
                            onChange={this.handleFilterChange}
                            listStyle={{
                                top: '100px'
                            }}
                            style={styles.sideBarItem}
                            selectedMenuItemStyle={{
                                color: colors.header
                            }}
                            underlineFocusStyle={{
                                color: colors.header

                            }}
                        >
                            <MenuItem
                                value={'&applyFilter=true&filter_name=ascending&filter_type=lexicographical'}
                                key={'&applyFilter=true&filter_name=ascending&filter_type=lexicographical'}
                                primaryText={'A-Z'} />
                            <MenuItem
                                value={'&applyFilter=true&filter_name=descending&filter_type=lexicographical'}
                                key={'&applyFilter=true&filter_name=descending&filter_type=lexicographical'}
                                primaryText={'Z-A'} />
                        </SelectField>
                        <h2 style={styles.sideBarHeading}>Show results for</h2>
                        <List>
                            {groups.map(({ key }) => {
                                let liStyle = { padding: '12px 6px' };
                                const selected = key === this.state.groupValue;
                                if (selected) {
                                    liStyle.color = colors.header;
                                }
                                return (
                                    <ListItem
                                        disabled={this.state.groupSelect || selected}
                                        key={key}
                                        value={key}
                                        primaryText={key}
                                        onClick={() => {
                                            !selected && this.handleGroupChange(key)
                                        }}
                                        innerDivStyle={liStyle}
                                    />
                                );
                            })}
                        </List>
                    </Drawer>

                    <div style={{
                        marginBottom: '40px',
                        textAlign: 'justify',
                        fontSize: '0.1px',
                        width: '100%'
                    }}>
                        <div className='row' style={styles.scroll}  >
                            <div style={styles.gridList}>
                                {skillDisplay}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
