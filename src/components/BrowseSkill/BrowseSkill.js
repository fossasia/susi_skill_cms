import React from 'react';
import PropTypes from 'prop-types';
import styles from './SkillStyle';
import ISO6391 from 'iso-639-1';
import SelectField from 'material-ui/SelectField';
// eslint-disable-next-line
import { Card } from 'material-ui/Card';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Add from 'material-ui/svg-icons/content/add';
import Person from 'material-ui/svg-icons/social/person';
import colors from '../../Utils/colors';
// eslint-disable-next-line
import CircleImage from '../CircleImage/CircleImage';
import CircularProgress from 'material-ui/CircularProgress';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import SkillCardList from '../SkillCardList/SkillCardList';
import SkillCardScrollList from '../SkillCardScrollList/SkillCardScrollList';
import urls from '../../Utils/urls';
import Footer from '../Footer/Footer.react';
import SearchBar from 'material-ui-search-bar';
// eslint-disable-next-line
import Ratings from 'react-ratings-declarative';

import './custom.css';

const groups = [];
const languages = [];

export default class BrowseSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Top skills',
      cards: [],
      modelValue: 'general',
      skillURL: null,
      groupValue: 'All',
      languageValue: 'en',
      expertValue: null,
      skills: [],
      groups: [],
      languages: [],
      groupSelect: false,
      languageSelect: false,
      skillsLoaded: false,
      filter: '&applyFilter=true&filter_name=descending&filter_type=rating',
      searchQuery: '',
      topRatedSkills: [],
    };
  }

  componentDidMount() {
    this.loadLanguages();
    this.loadGroups();
    this.loadCards();
    this.loadTopRated();
  }

  handleFilterChange = (event, index, value) => {
    this.setState({ filter: value }, function() {
      this.loadCards();
    });
  };

  handleModelChange = (event, index) => {
    this.setState({ groupSelect: false }, function() {
      this.loadCards();
    });
  };

  handleGroupChange = (event, value) => {
    this.setState({ groupValue: value }, function() {
      // console.log(this.state);
      this.loadCards();
    });
  };

  handleLanguageChange = (event, index, value) => {
    this.setState({ languageValue: value }, function() {
      // console.log(this.state);
      this.loadCards();
    });
  };

  handleArrivalTimeChange = (event, value) => {
    this.setState({ filter: value }, function() {
      // console.log(this.state);
      this.loadCards();
    });
  };

  handleSearch = value => {
    this.setState({ searchQuery: value }, function() {
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
    if (this.state.groups.length === 0) {
      $.ajax({
        url: urls.API_URL + '/cms/getGroups.json',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          data = data.groups;
          this.setState({ groups: data });
          data.sort();
          groups.push(
            <MenuItem
              value="All"
              key="All"
              primaryText="All"
              onClick={event => this.handleGroupChange(event, 'All')}
            />,
          );

          for (let i = 0; i < data.length; i++) {
            groups.push(
              <MenuItem
                value={data[i]}
                key={data[i]}
                primaryText={`${data[i]}`}
                onClick={event => this.handleGroupChange(event, data[i])}
              />,
            );
          }
        }.bind(this),
      });
    }
  };

  loadLanguages = () => {
    if (this.state.languages.length === 0) {
      $.ajax({
        url: urls.API_URL + '/cms/getAllLanguages.json',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          data = data.languagesArray;
          if (data) {
            data.sort();
            this.setState({ languages: data });
            for (let i = 0; i < data.length; i++) {
              if (ISO6391.getNativeName(data[i])) {
                let languageName = ISO6391.getNativeName(data[i]);
                if (ISO6391.getName(data[i])) {
                  languageName =
                    languageName + ' (' + ISO6391.getName(data[i]) + ')';
                }
                languages.push(
                  <MenuItem
                    value={data[i]}
                    key={data[i]}
                    primaryText={languageName}
                  />,
                );
              } else {
                languages.push(
                  <MenuItem
                    value={data[i]}
                    key={data[i]}
                    primaryText={'Universal'}
                  />,
                );
              }
            }
          }
        }.bind(this),
      });
    }
  };

  loadCards = () => {
    let url;
    if (this.props.routeType === 'category') {
      this.setState({
        groupValue: this.props.routeValue,
        text: this.props.routeTitle,
      });
      url =
        urls.API_URL +
        '/cms/getSkillList.json?group=' +
        this.props.routeValue +
        '&applyFilter=true&filter_name=ascending&filter_type=lexicographical';
    } else if (this.props.routeType === 'language') {
      this.setState({
        languageValue: this.props.routeValue,
        text: this.props.routeTitle,
      });
      url =
        urls.API_URL +
        '/cms/getSkillList.json?group=All&applyFilter=true&language=' +
        this.props.routeValue +
        '&filter_name=ascending&filter_type=lexicographical';
    } else if (
      this.state.languages.length > 0 &&
      this.state.groups.length > 0
    ) {
      url =
        urls.API_URL +
        '/cms/getSkillList.json?model=' +
        this.state.modelValue +
        '&group=' +
        this.state.groupValue +
        '&language=' +
        this.state.languageValue +
        this.state.filter;
      // console.log(url);
    } else {
      url =
        urls.API_URL +
        '/cms/getSkillList.json?group=All&applyFilter=true&filter_name=descending&filter_type=rating';
    }

    let self = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        if (self.state.searchQuery.length > 0) {
          data.filteredData = data.filteredData.filter(function(i) {
            let result = false;
            if (i.skill_name) {
              result = i.skill_name
                .toLowerCase()
                .match(self.state.searchQuery.toLowerCase());
              if (result) {
                return result;
              }
            }
            if (i.descriptions) {
              result = i.descriptions
                .toLowerCase()
                .match(self.state.searchQuery.toLowerCase());
              if (result) {
                return result;
              }
            }
            if (i.author) {
              result = i.author
                .toLowerCase()
                .match(self.state.searchQuery.toLowerCase());
              if (result) {
                return result;
              }
            }
            if (i.examples && i.examples.length > 0) {
              i.examples.map((el, j) => {
                result = el
                  .toLowerCase()
                  .match(self.state.searchQuery.toLowerCase());
                if (result) {
                  return result;
                }
                return null;
              });
            }
            return result;
          });
        }

        self.setState({
          skills: data.filteredData,
          // cards: cards,
          skillURL: url,
          skillsLoaded: true,
        });
        // console.log(self.state)
      },
    });
  };

  loadTopRated = () => {
    let url;
    url =
      urls.API_URL +
      '/cms/getSkillList.json?group=All&applyFilter=true&filter_name=descending&filter_type=rating';
    let self = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        if (self.state.searchQuery.length > 0) {
          data.filteredData = data.filteredData.filter(function(i) {
            let result = false;
            if (i.skill_name) {
              result = i.skill_name
                .toLowerCase()
                .match(self.state.searchQuery.toLowerCase());
              if (result) {
                return result;
              }
            }
            if (i.descriptions) {
              result = i.descriptions
                .toLowerCase()
                .match(self.state.searchQuery.toLowerCase());
              if (result) {
                return result;
              }
            }
            if (i.author) {
              result = i.author
                .toLowerCase()
                .match(self.state.searchQuery.toLowerCase());
              if (result) {
                return result;
              }
            }
            if (i.examples && i.examples.length > 0) {
              i.examples.map((el, j) => {
                result = el
                  .toLowerCase()
                  .match(self.state.searchQuery.toLowerCase());
                if (result) {
                  return result;
                }
                return null;
              });
            }
            return result;
          });
        }
        let cardsToDisplay = data.filteredData.length;
        cardsToDisplay = cardsToDisplay < 10 ? cardsToDisplay : 10;
        self.setState({
          topRatedSkills: data.filteredData.slice(0, cardsToDisplay),
        });
      },
    });
  };

  render() {
    return (
      <div>
        <StaticAppBar
          {...this.props}
          zDepth={1}
          toggleDrawer={this.handleDrawerToggle}
        />

        <div style={styles.main}>
          <div style={styles.sidebar}>
            <div style={styles.center}>
              <div style={styles.newSkillBtn}>
                <IconMenu
                  animated={false}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'middle',
                  }}
                  iconButtonElement={
                    <RaisedButton
                      label="Create"
                      icon={<Add />}
                      backgroundColor="#4285f4"
                      labelStyle={{ color: '#fff' }}
                    />
                  }
                >
                  <Link to="/skillCreator">
                    <MenuItem leftIcon={<Add />} primaryText="Create a Skill" />
                  </Link>
                  <Link to="/botbuilder">
                    <MenuItem
                      leftIcon={<Person />}
                      primaryText="Create Skill bot"
                    />
                  </Link>
                </IconMenu>
              </div>
            </div>
            <Menu desktop={true} disableAutoFocus={true}>
              <Subheader>New Arrivals</Subheader>
              <MenuItem
                value="&applyFilter=true&filter_name=descending&filter_type=date&duration=7"
                key="Last 7 Days"
                primaryText="Last 7 Days"
                onClick={event =>
                  this.handleArrivalTimeChange(
                    event,
                    '&applyFilter=true&filter_name=descending&filter_type=date&duration=7',
                  )
                }
              />
              <MenuItem
                value="&applyFilter=true&filter_name=descending&filter_type=date&duration=30"
                key="Last 30 Days"
                primaryText="Last 30 Days"
                onClick={event =>
                  this.handleArrivalTimeChange(
                    event,
                    '&applyFilter=true&filter_name=descending&filter_type=date&duration=30',
                  )
                }
              />
              <MenuItem
                value="&applyFilter=true&filter_name=descending&filter_type=date&duration=90"
                key="Last 90 Days"
                primaryText="Last 90 Days"
                onClick={event =>
                  this.handleArrivalTimeChange(
                    event,
                    '&applyFilter=true&filter_name=descending&filter_type=date&duration=90',
                  )
                }
              />
              <Subheader style={{ fontWeight: 'bold' }}>
                Skill Categories
              </Subheader>
              {groups}
            </Menu>
          </div>
          <div style={styles.home}>
            <div style={styles.topBar} className="top-bar">
              <div style={styles.searchBar} className="search-bar">
                <SearchBar
                  onChange={this.handleSearch}
                  onRequestSearch={() => console.log('Nothing to search')}
                  style={{
                    marginTop: '25px',
                  }}
                  value={this.state.searchQuery}
                />
              </div>
              <SelectField
                floatingLabelText="Sort by"
                value={this.state.filter}
                floatingLabelFixed={false}
                onChange={this.handleFilterChange}
                style={styles.selection}
                className="select"
                listStyle={{
                  top: '100px',
                }}
                selectedMenuItemStyle={{
                  color: colors.header,
                }}
                underlineFocusStyle={{
                  color: colors.header,
                }}
              >
                <MenuItem
                  value={
                    '&applyFilter=true&filter_name=ascending&filter_type=lexicographical'
                  }
                  key={
                    '&applyFilter=true&filter_name=ascending&filter_type=lexicographical'
                  }
                  primaryText={'A-Z'}
                  label={'Name (A-Z)'}
                />
                <MenuItem
                  value={
                    '&applyFilter=true&filter_name=descending&filter_type=lexicographical'
                  }
                  key={
                    '&applyFilter=true&filter_name=descending&filter_type=lexicographical'
                  }
                  primaryText={'Z-A'}
                  label={'Name (Z-A)'}
                />
                <MenuItem
                  value={
                    '&applyFilter=true&filter_name=descending&filter_type=rating'
                  }
                  key={
                    '&applyFilter=true&filter_name=descending&filter_type=rating'
                  }
                  primaryText={'Top Rated'}
                  label={'Top Rated'}
                />
                <MenuItem
                  value={
                    '&applyFilter=true&filter_name=descending&filter_type=feedback'
                  }
                  key={
                    '&applyFilter=true&filter_name=descending&filter_type=feedback'
                  }
                  primaryText={'Feedback Count'}
                  label={'Feedback Count'}
                />
                <MenuItem
                  value={
                    '&applyFilter=true&filter_name=descending&filter_type=usage&duration=7'
                  }
                  key={
                    '&applyFilter=true&filter_name=descending&filter_type=usage&duration=7'
                  }
                  primaryText={'This Week Usage'}
                  label={'This Week Usage'}
                />
                <MenuItem
                  value={
                    '&applyFilter=true&filter_name=descending&filter_type=usage&duration=30'
                  }
                  key={
                    '&applyFilter=true&filter_name=descending&filter_type=usage&duration=30'
                  }
                  primaryText={'This Month Usage'}
                  label={'This Month Usage'}
                />
              </SelectField>
              <SelectField
                disabled={this.state.languageSelect}
                floatingLabelText="Language"
                value={this.state.languageValue}
                floatingLabelFixed={false}
                onChange={this.handleLanguageChange}
                style={styles.selection}
                listStyle={{
                  top: '100px',
                }}
                selectedMenuItemStyle={{
                  color: colors.header,
                }}
                underlineFocusStyle={{
                  color: colors.header,
                }}
              >
                {languages}
              </SelectField>
            </div>
            {this.state.skills.length === 0 &&
              !this.state.skillsLoaded && (
                <div>
                  <h1 style={styles.loader}>
                    <div>
                      <CircularProgress size={62} color="#4285f5" />
                      <h4>Loading</h4>
                    </div>
                  </h1>
                </div>
              )}

            {this.state.skillsLoaded ? (
              <div style={styles.container}>
                <div style={styles.topRated}>
                  <h2 style={{ paddingLeft: 16 }}>{this.state.text}</h2>
                  {/* Scroll Id must be unique for all instances of SkillCardList*/}
                  {!this.props.routeType && (
                    <SkillCardScrollList
                      scrollId="topRated"
                      skills={this.state.topRatedSkills}
                      modalValue={this.state.modalValue}
                      languageValue={this.state.languageValue}
                      skillUrl={this.state.skillUrl}
                    />
                  )}
                </div>
                {this.state.skills.length ? (
                  <div>
                    <SkillCardList
                      skills={this.state.skills}
                      modalValue={this.state.modalValue}
                      languageValue={this.state.languageValue}
                      skillUrl={this.state.skillUrl}
                    />
                  </div>
                ) : (
                  <div style={{ fontSize: 30 }}>
                    No Skills found. Be the first one to
                    <Link to="/skillCreator"> create</Link> a skill in this
                    category
                  </div>
                )}
                <Footer />
                <a href="#top">
                  <center>Back to top</center>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

BrowseSkill.propTypes = {
  routeType: PropTypes.string,
  routeValue: PropTypes.string,
  routeTitle: PropTypes.string,
};
