import React from 'react';
import styles from './SkillStyle';
import ISO6391 from 'iso-639-1';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { FloatingActionButton, Paper } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';
import Like from 'material-ui/svg-icons/action/thumb-up';
import Dislike from 'material-ui/svg-icons/action/thumb-down';
import { Card } from 'material-ui/Card';
import * as $ from 'jquery';
import ReactTooltip from 'react-tooltip';
import Link from 'react-router-dom/es/Link';
import colors from '../../Utils/colors';
import CircleImage from '../CircleImage/CircleImage';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import urls from '../../Utils/urls';
import Footer from '../Footer/Footer.react';
import SearchBar from 'material-ui-search-bar'
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
            filter:'&applyFilter=true&filter_name=ascending&filter_type=lexicographical',
            searchQuery:''
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

    handleGroupChange = (event, index, value) => {
        this.setState({groupValue: value}, function () {
        // console.log(this.state);
        this.loadCards();
        });
    };

    handleLanguageChange = (event, index, value) => {
      this.setState({languageValue: value}, function () {
        // console.log(this.state);
        this.loadCards();
        });
    };

    handleSearch = (value) => {
        console.log(value);
      this.setState({searchQuery: value}, function () {
        // console.log(this.state);
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
                    groups.push(<MenuItem
                                    value="All"
                                    key="All"
                                    primaryText="All" />);

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

    loadLanguages = () => {
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
                            let languageName = ISO6391.getNativeName(data[i]);
                            if (ISO6391.getName(data[i])) {
                                languageName = languageName + ' (' + ISO6391.getName(data[i]) + ')';
                            }
                            languages.push( <MenuItem
                                                value={data[i]}
                                                key={data[i]}
                                                primaryText={languageName}
                                            />);

                        }
                        else {
                            languages.push(<MenuItem
                                                value={data[i]}
                                                key={data[i]}
                                                primaryText={'Universal'}
                                            />);
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
                  // console.log(url);
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
              // console.log(data)

                if (self.state.searchQuery.length > 0) {
                  data.filteredData = data.filteredData.filter(function(i) {
                    let result=false;
                    if (i.skill_name) {
                        result =  i.skill_name.toLowerCase()
                            .match( self.state.searchQuery.toLowerCase() );
                        if (result) {
                            return result;
                        }
                    }
                    if (i.descriptions) {
                        result =  i.descriptions.toLowerCase()
                            .match( self.state.searchQuery.toLowerCase() );
                        if (result) {
                            return result;
                        }
                    }
                    if (i.author) {
                        result =  i.author.toLowerCase()
                            .match( self.state.searchQuery.toLowerCase() );
                        if (result) {
                            return result;
                        }
                    }
                    if (i.examples && i.examples.length>0) {
                        i.examples.map((el,j)=>{
                          result =  el.toLowerCase()
                            .match( self.state.searchQuery.toLowerCase() );
                          if (result) {
                              return result;
                          }
                          return null;
                        })
                    }
                    return result;
                  });
                }

                let skills = Object.keys(data.filteredData);
                // eslint-disable-next-line
                skills = skills.map((el, i) => {
                    let skill = data.filteredData[el];
                    let skill_name, examples, image, description;
                    let positive_rating = 0, negative_rating = 0;
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
                        + '/' +skill.group
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
                    if (skill.skill_rating) {
                        positive_rating = skill.skill_rating.positive;
                        negative_rating = skill.skill_rating.negative;
                    }

                    cards.push(
                            <Card style={styles.row} key={el}>
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
                                </Link>
                                <div style={styles.rating}>
                                    <span style={styles.positive}>
                                        <Like style={styles.like} />
                                        {positive_rating}
                                    </span>
                                    <span style={styles.negative}>
                                        <Dislike style={styles.dislike} />
                                        {negative_rating}
                                    </span>
                                </div>
                            </Card>
                    );
                });

                self.setState({
                    skills: skills,
                    cards: cards,
                    skillURL: url,
                    skillsLoaded: true,
                });
                // console.log(self.state)
            }
        });
    };

    render() {

        const style = {
            width: '100%',
            padding: '10px'
        };
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
                    <Paper style={style} zDepth={1}>
                        <div style={styles.center}>
                            <SelectField
                                disabled={this.state.groupSelect}
                                floatingLabelText='Category'
                                value={this.state.groupValue}
                                floatingLabelFixed={false}
                                onChange={this.handleGroupChange}
                                style={styles.selection}
                                listStyle={{
                                    top: '100px'
                                }}
                                selectedMenuItemStyle={{
                                    color: colors.header
                                }}
                                underlineFocusStyle={{
                                    color: colors.header
                                }}
                            >
                                {groups}
                            </SelectField>
                            <SelectField
                                disabled={this.state.languageSelect}
                                floatingLabelText='Language'
                                value={this.state.languageValue}
                                floatingLabelFixed={false}
                                onChange={this.handleLanguageChange}
                                style={styles.selection}
                                listStyle={{
                                    top: '100px'
                                }}
                                selectedMenuItemStyle={{
                                    color: colors.header
                                }}
                                underlineFocusStyle={{
                                    color: colors.header
                                }}
                            >
                            {languages}
                            </SelectField>
                            <SelectField
                                floatingLabelText='Sort by'
                                value={this.state.filter}
                                floatingLabelFixed={false}
                                onChange={this.handleFilterChange}
                                style={styles.selection}
                                className='select'
                                listStyle={{
                                    top: '100px'
                                }}
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
                                primaryText={'A-Z'} label={'Name (A-Z)'} />
                                <MenuItem
                                value={'&applyFilter=true&filter_name=descending&filter_type=lexicographical'}
                                key={'&applyFilter=true&filter_name=descending&filter_type=lexicographical'}
                                primaryText={'Z-A'} label={'Name (Z-A)'} />
                            </SelectField>

                            <div style={styles.newSkillBtn}>
                                <Link to='/skillCreator'>
                                    <FloatingActionButton data-tip='Create Skill'
                                        backgroundColor={colors.fabButton}
                                        style={styles.select}>
                                        <Add />
                                    </FloatingActionButton>
                                    <ReactTooltip  effect='solid' place='bottom'/>
                                </Link>
                            </div>

                        </div>

                    </Paper>

                   <SearchBar
                        onChange={this.handleSearch}
                        style={{
                          marginTop:'25px',
                          width: '50%'
                        }}
                        value={this.state.searchQuery}
                      />

                    <div style={{
                        marginTop: '20px',
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
                <Footer />
                </div>
        <a href = "#top"><center>Back to top</center></a>
    </div>
        );
    }
}
