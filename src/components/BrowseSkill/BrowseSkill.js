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
import Divider from 'material-ui/Divider';
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
import _ from 'lodash';
// eslint-disable-next-line
import Ratings from 'react-ratings-declarative';

import './custom.css';

let groups = [];
let languages = [];

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
      topUsedSkills: [],
      rating_refine: null,
    };
  }

  componentDidMount() {
    this.loadLanguages();
    this.loadGroups();
    if (
      this.props.routeType ||
      ['category', 'language'].includes(window.location.href.split('/')[3])
    ) {
      this.loadCards();
    } else {
      this.loadTopRated();
      this.loadTopUsed();
    }
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
      // Clear any group data already present
      groups = [];
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
              containerElement={<Link to="/category/All" />}
              style={{ minHeight: '32px', lineHeight: '32px' }}
            />,
          );
          for (let i = 0; i < data.length; i++) {
            groups.push(
              <MenuItem
                value={data[i]}
                key={data[i]}
                primaryText={`${data[i]}`}
                style={{ minHeight: '32px', lineHeight: '32px' }}
                containerElement={<Link to={'/category/' + data[i]} />}
              />,
            );
          }
        }.bind(this),
        error: function(e) {
          console.log('Error while fetching groups', e);
        },
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
            languages = [];
            for (let i = 0; i < data.length; i++) {
              if (ISO6391.getNativeName(data[i])) {
                let languageName = ISO6391.getNativeName(data[i]);
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
        error: function(e) {
          console.log('Error while fetching languages', e);
        },
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
        '&language=' +
        this.state.languageValue +
        this.state.filter;
    } else if (this.props.routeType === 'language') {
      this.setState({
        languageValue: this.props.routeValue,
        text: this.props.routeTitle,
      });
      url =
        urls.API_URL +
        '/cms/getSkillList.json?group=' +
        this.state.groupValue +
        '&applyFilter=true&language=' +
        this.props.routeValue +
        this.state.filter;
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

    if (this.state.searchQuery.length > 0) {
      url = url + '&q=' + this.state.searchQuery;
    }

    let self = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        if (self.state.rating_refine) {
          data.filteredData = data.filteredData.filter(
            skill =>
              skill.skill_rating.stars.avg_star >= self.state.rating_refine,
          );
        }
        self.setState({
          skills: data.filteredData,
          // cards: cards,
          skillURL: url,
          skillsLoaded: true,
        });
        // console.log(self.state)
      },
      error: function(e) {
        console.log('Error while fetching skills', e);
        return self.loadCards();
      },
    });
  };

  loadTopRated = () => {
    let url;
    url =
      urls.API_URL +
      '/cms/getSkillList.json?group=All&applyFilter=true&filter_name=descending&filter_type=rating&count=10';
    let self = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.setState({
          skillsLoaded: true,
          topRatedSkills: data.filteredData,
        });
      },
      error: function(e) {
        console.log('Error while fetching top rated skills', e);
        return self.loadTopRated();
      },
    });
  };

  loadTopUsed = () => {
    let url;
    url =
      urls.API_URL +
      '/cms/getSkillList.json?group=All&applyFilter=true&filter_name=descending&filter_type=usage&count=10';
    let self = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.setState({
          skillsLoaded: true,
          topUsedSkills: data.filteredData,
        });
      },
      error: function(e) {
        console.log('Error while fetching top used skills', e);
        return self.loadTopUsed();
      },
    });
  };

  handleRatingRefine = rating => {
    this.setState(
      {
        rating_refine: rating,
      },
      this.loadCards(),
    );
  };

  render() {
    let sidebarStyle = styles.sidebar;
    let topBarStyle = styles.topBar;
    let groupsMobile = null;
    let backToHome = null;
    if (window.innerWidth < 430) {
      sidebarStyle.display = 'none';
      topBarStyle.flexDirection = 'column';
      groupsMobile = groups;
      backToHome = (
        <MenuItem
          value="Back to SUSI Skills"
          key="Back to SUSI Skills"
          primaryText="Back to SUSI Skills"
          containerElement={<Link to="/" />}
          style={{ minHeight: '48px', textAlign: 'center', lineHeight: '48px' }}
        />
      );
    }

    return (
      <div>
        <StaticAppBar
          {...this.props}
          zDepth={1}
          toggleDrawer={this.handleDrawerToggle}
        />

        <div style={styles.main}>
          <div style={styles.sidebar}>
            <div style={styles.newSkillBtn}>
              <IconMenu
                style={{ width: '60%' }}
                animated={false}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'middle',
                }}
                iconButtonElement={
                  <RaisedButton
                    className="create-button"
                    style={{ width: '100%' }}
                    buttonStyle={{
                      height: '48px',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
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
              {this.props.routeType === 'category' ? (
                <div className="category-sidebar-section">
                  <Link to="/">
                    <div className="index-link-sidebar">{'< SUSI Skills'}</div>
                  </Link>
                  <div style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                    {this.props.routeValue}
                  </div>
                </div>
              ) : (
                <div>
                  <Subheader style={{ fontWeight: 'bold' }}>
                    SUSI Skills
                  </Subheader>
                  {groups}
                </div>
              )}
            </Menu>

            {this.state.skillsLoaded ? (
              <div className="refine-section">
                <Menu desktop={true} disableAutoFocus={true}>
                  <Subheader style={{ fontWeight: 'bold' }}>
                    Refine by
                  </Subheader>
                  <h4 style={{ marginLeft: '12px', marginBottom: '4px' }}>
                    Avg. Customer Review
                  </h4>
                  {this.state.rating_refine ? (
                    <div
                      className="clear-button"
                      style={styles.clearButton}
                      onClick={() => this.handleRatingRefine(null)}
                    >
                      Clear
                    </div>
                  ) : (
                    ''
                  )}
                  <div style={styles.starRefine}>
                    <div
                      style={styles.singleRating}
                      onClick={() => this.handleRatingRefine(4)}
                    >
                      <Ratings
                        rating={4}
                        widgetRatedColors="#ffbb28"
                        widgetDimensions="20px"
                        widgetSpacings="0px"
                      >
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                      </Ratings>
                      <div
                        style={styles.ratingLabel}
                        className={this.state.rating_refine === 4 ? 'bold' : ''}
                      >
                        & Up
                      </div>
                    </div>
                    <div
                      style={styles.singleRating}
                      onClick={() => this.handleRatingRefine(3)}
                    >
                      <Ratings
                        rating={3}
                        widgetRatedColors="#ffbb28"
                        widgetDimensions="20px"
                        widgetSpacings="0px"
                      >
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                      </Ratings>
                      <div
                        style={styles.ratingLabel}
                        className={this.state.rating_refine === 3 ? 'bold' : ''}
                      >
                        & Up
                      </div>
                    </div>
                    <div
                      style={styles.singleRating}
                      onClick={() => this.handleRatingRefine(2)}
                    >
                      <Ratings
                        rating={2}
                        widgetRatedColors="#ffbb28"
                        widgetDimensions="20px"
                        widgetSpacings="0px"
                      >
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                      </Ratings>
                      <div
                        style={styles.ratingLabel}
                        className={this.state.rating_refine === 2 ? 'bold' : ''}
                      >
                        & Up
                      </div>
                    </div>
                    <div
                      style={styles.singleRating}
                      onClick={() => this.handleRatingRefine(1)}
                    >
                      <Ratings
                        rating={1}
                        widgetRatedColors="#ffbb28"
                        widgetDimensions="20px"
                        widgetSpacings="0px"
                      >
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                      </Ratings>
                      <div
                        style={styles.ratingLabel}
                        className={this.state.rating_refine === 1 ? 'bold' : ''}
                      >
                        & Up
                      </div>
                    </div>
                  </div>
                </Menu>
              </div>
            ) : (
              ''
            )}
          </div>
          <div style={styles.home}>
            <div style={styles.topBar} className="top-bar">
              <div style={styles.searchBar} className="search-bar">
                <SearchBar
                  onChange={_.debounce(this.handleSearch, 500)}
                  onRequestSearch={this.loadCards}
                  style={{
                    marginTop: '17px',
                  }}
                  value={this.state.searchQuery}
                />
              </div>
              {this.props.routeType && (
                <SelectField
                  floatingLabelText="Sort by"
                  value={this.state.filter}
                  floatingLabelFixed={false}
                  onChange={this.handleFilterChange}
                  style={styles.selection}
                  className="select"
                  autoWidth
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
              )}
              <SelectField
                autoWidth
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
                {this.state.topRatedSkills.length ? (
                  <div style={styles.topSkills}>
                    <h2 style={{ paddingLeft: 16 }}>Top Rated Skills</h2>
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
                ) : null}

                {this.state.topUsedSkills.length ? (
                  <div style={styles.topSkills}>
                    <h2 style={{ paddingLeft: 16 }}>Top Used Skills</h2>
                    {/* Scroll Id must be unique for all instances of SkillCardList*/}
                    {!this.props.routeType && (
                      <SkillCardScrollList
                        scrollId="topUsed"
                        skills={this.state.topUsedSkills}
                        modalValue={this.state.modalValue}
                        languageValue={this.state.languageValue}
                        skillUrl={this.state.skillUrl}
                      />
                    )}
                  </div>
                ) : null}

                {this.state.skills.length && this.props.routeType ? (
                  <div>
                    <SkillCardList
                      skills={this.state.skills}
                      modalValue={this.state.modalValue}
                      languageValue={this.state.languageValue}
                      skillUrl={this.state.skillUrl}
                    />
                  </div>
                ) : (
                  <div>
                    {this.props.routeType ? (
                      <div style={{ fontSize: 30 }}>
                        No Skills found. Be the first one to
                        <Link to="/skillCreator"> create</Link> a skill in this
                        category
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                )}
                <Divider />
                {this.props.routeType === 'category'
                  ? backToHome
                  : groupsMobile}
              </div>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

BrowseSkill.propTypes = {
  routeType: PropTypes.string,
  routeValue: PropTypes.string,
  routeTitle: PropTypes.string,
};
