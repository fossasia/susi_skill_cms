import React from 'react';
import PropTypes from 'prop-types';
import styles from './SkillStyle';
import ISO6391 from 'iso-639-1';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
// eslint-disable-next-line
import { Card } from 'material-ui/Card';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import Add from 'material-ui/svg-icons/content/add';
import Person from 'material-ui/svg-icons/social/person';
import ActionViewModule from 'material-ui/svg-icons/action/view-module';
import ActionViewStream from 'material-ui/svg-icons/action/view-stream';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
// eslint-disable-next-line
import CircleImage from '../CircleImage/CircleImage';
import CircularProgress from 'material-ui/CircularProgress';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import SkillCardList from '../SkillCardList/SkillCardList';
import SkillCardGrid from '../SkillCardGrid/SkillCardGrid';
import SkillCardScrollList from '../SkillCardScrollList/SkillCardScrollList';
import { urls, colors } from '../../utils';
import Footer from '../Footer/Footer.react';
import SearchBar from 'material-ui-search-bar';
import _ from 'lodash';

// eslint-disable-next-line
import Ratings from 'react-ratings-declarative';

import './custom.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

let groups = [];
let languages = [];

function createCategoryMenuItem(categoryName) {
  const mobileView = window.innerWidth < 430;
  const linkValue = '/category/' + categoryName;
  if (mobileView) {
    return (
      <MenuItem
        value={categoryName}
        key={categoryName}
        primaryText={categoryName}
        containerElement={<Link to={linkValue} />}
        style={styles.mobileMenuItem}
        rightIcon={<ChevronRight style={{ top: -8 }} />}
      />
    );
  }
  return (
    <MenuItem
      value={categoryName}
      key={categoryName}
      primaryText={categoryName}
      containerElement={<Link to={linkValue} />}
      style={styles.categorySidebarMenuItem}
    />
  );
}

export default class BrowseSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      modelValue: 'general',
      skillURL: null,
      groupValue: 'All',
      languageValue: cookies.get('languages') || ['en'],
      showSkills: '',
      showReviewedSkills: false,
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
      topFeedbackSkills: [],
      newestSkills: [],
      latestUpdatedSkills: [],
      topGames: [],
      ratingRefine: null,
      timeFilter: null,
      viewType: 'list',
    };
  }

  componentDidMount() {
    document.title = 'SUSI.AI - Browse Skills';
    this.loadLanguages();
    this.loadGroups();

    if (
      this.props.routeType ||
      ['category', 'language'].includes(window.location.href.split('/')[3])
    ) {
      this.loadCards();
    } else {
      this.loadMetricsSkills();
    }
  }

  handleFilterChange = (event, index, value) => {
    this.setState({ filter: value, skillsLoaded: false }, function() {
      this.loadCards();
    });
  };

  handleModelChange = (event, index) => {
    this.setState({ groupSelect: false, skillsLoaded: false }, function() {
      this.loadCards();
    });
  };

  handleGroupChange = (event, value) => {
    this.setState({ groupValue: value, skillsLoaded: false }, function() {
      // console.log(this.state);
      this.loadCards();
    });
  };

  handleLanguageChange = (event, index, values) => {
    cookies.set('languages', values);
    this.setState({ languageValue: values }, function() {
      if (
        this.props.routeType ||
        ['category', 'language'].includes(window.location.href.split('/')[3])
      ) {
        this.loadCards();
      } else {
        this.loadMetricsSkills();
      }
    });
  };

  handleShowSkills = () => {
    $('.select')
      .find('svg')
      .css({ fill: '#4285f4' });
    let value = !this.state.showReviewedSkills;
    let showSkills = value ? '&reviewed=true' : '';
    this.setState(
      {
        showReviewedSkills: value,
        showSkills: showSkills,
        skillsLoaded: false,
      },
      function() {
        this.loadCards();
      },
    );
  };

  handleViewChange = (event, value) => {
    this.setState({ viewType: value });
  };

  handleArrivalTimeChange = value => {
    if (value) {
      this.setState(
        {
          filter: `&applyFilter=true&filter_name=descending
            &filter_type=creation_date&duration=${value}`,
          timeFilter: value,
          skillsLoaded: false,
        },
        function() {
          this.loadCards();
        },
      );
    } else {
      this.setState(
        {
          filter: '&applyFilter=true&filter_name=descending&filter_type=rating',
          timeFilter: null,
          skillsLoaded: false,
        },
        function() {
          this.loadCards();
        },
      );
    }
  };

  handleSearch = value => {
    this.setState({ searchQuery: value, skillsLoaded: false }, function() {
      // console.log(this.state);
      this.loadCards();
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
          data.sort();
          groups.push(createCategoryMenuItem('All'));
          for (let i = 0; i < data.length; i++) {
            groups.push(createCategoryMenuItem(data[i]));
          }
          this.setState({ groups });
        }.bind(this),
        error: function(e) {
          console.log('Error while fetching groups', e);
        },
      });
    }
  };

  loadLanguages = () => {
    let url = urls.API_URL + '/cms/getAllLanguages.json?';
    if (this.state.groupValue != null) {
      url += 'group=' + this.state.groupValue;
    }
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        data = data.languagesArray;
        if (data) {
          data.sort();
          languages = [];
          for (let i = 0; i < data.length; i++) {
            languages.push(data[i]);
          }
          this.setState({ languages: data });
        }
      }.bind(this),
      error: function(e) {
        console.log('Error while fetching languages', e);
      },
    });
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
        this.state.filter +
        this.state.showSkills;
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
        this.state.filter +
        this.state.showSkills;
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
        this.state.filter +
        this.state.showSkills;
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
        if (self.state.ratingRefine) {
          data.filteredData = self.refineByRating(
            data.filteredData,
            self.state.ratingRefine,
          );
        }
        self.setState(
          {
            skills: data.filteredData,
            // cards: cards,
            skillURL: url,
            skillsLoaded: true,
          },
          function() {
            this.loadLanguages();
          },
        );
        // console.log(self.state)
      },
      error: function(e) {
        console.log('Error while fetching skills', e);
        return self.loadCards();
      },
    });
  };

  loadMetricsSkills = () => {
    let url;
    url =
      urls.API_URL +
      '/cms/getSkillMetricsData.json?language=' +
      this.state.languageValue;
    let self = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.setState({
          skillsLoaded: true,
          topRatedSkills: data.metrics.rating,
          topUsedSkills: data.metrics.usage,
          latestUpdatedSkills: data.metrics.latest,
          newestSkills: data.metrics.newest,
          topFeedbackSkills: data.metrics.feedback,
          topGames: data.metrics['Games, Trivia and Accessories'],
        });
      },
      error: function(e) {
        console.log('Error while fetching skills based on top metrics', e);
        return self.loadMetricsSkills();
      },
    });
  };

  handleRatingRefine = ratingRefine => {
    let prevRatingRefine = this.state.ratingRefine;
    this.setState({ ratingRefine, skillsLoaded: false });
    if (
      (!prevRatingRefine || ratingRefine > prevRatingRefine) &&
      this.state.skills.length > 0
    ) {
      let refinedSkills = this.refineByRating(this.state.skills, ratingRefine);
      this.setState({
        skills: refinedSkills,
        skillsLoaded: true,
      });
    } else {
      this.loadCards();
    }
  };

  refineByRating = (skills, ratingRefine) => {
    return skills.filter(
      skill =>
        skill.skill_rating && skill.skill_rating.stars.avg_star >= ratingRefine,
    );
  };

  languageMenuItems(values) {
    return languages.map(name => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={
          ISO6391.getNativeName(name)
            ? ISO6391.getNativeName(name)
            : 'Universal'
        }
      />
    ));
  }

  render() {
    let { languageValue } = this.state;
    let sidebarStyle = styles.sidebar;
    let topBarStyle = styles.topBar;
    let groupsMobile = null;
    let backToHome = null;

    let metricsContainerStyle = {
      width: '1090px',
      margin: window.innerWidth >= 430 ? '10px' : '10px 0px 10px 0px',
    };

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
          style={{ minHeight: '32px', textAlign: 'center', lineHeight: '32px' }}
        />
      );
    }

    let metricsHidden =
      this.props.routeType ||
      this.state.searchQuery.length > 0 ||
      this.state.ratingRefine ||
      this.state.timeFilter;

    return (
      <div style={styles.browseSkillRoot}>
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
                    style={{ width: '100%', height: 48 }}
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
              {this.state.timeFilter ? (
                <div className="category-sidebar-section">
                  <div
                    className="index-link-sidebar"
                    onClick={() => this.handleArrivalTimeChange(null)}
                  >
                    {'< Any release'}
                  </div>
                  <div
                    style={{
                      marginLeft: '10px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    {`Last ${this.state.timeFilter} Days`}
                  </div>
                </div>
              ) : (
                <Subheader style={styles.sidebarSubheader}>
                  New Arrivals
                </Subheader>
              )}
              {!this.state.timeFilter && (
                <MenuItem
                  value="&applyFilter=true&filter_name=descending&filter_type=creation_date&duration=7"
                  key="Last 7 Days"
                  primaryText="Last 7 Days"
                  onClick={() => this.handleArrivalTimeChange(7)}
                  style={styles.sidebarMenuItem}
                />
              )}
              {!this.state.timeFilter && (
                <MenuItem
                  value="&applyFilter=true&filter_name=descending&filter_type=creation_date&duration=30"
                  key="Last 30 Days"
                  primaryText="Last 30 Days"
                  onClick={() => this.handleArrivalTimeChange(30)}
                  style={styles.sidebarMenuItem}
                />
              )}
              {!this.state.timeFilter && (
                <MenuItem
                  value="&applyFilter=true&filter_name=descending&filter_type=creation_date&duration=90"
                  key="Last 90 Days"
                  primaryText="Last 90 Days"
                  onClick={() => this.handleArrivalTimeChange(90)}
                  style={styles.sidebarMenuItem}
                />
              )}
              <Divider style={{ marginLeft: '16px', marginRight: '16px' }} />

              {this.props.routeType === 'category' ? (
                <div className="category-sidebar-section">
                  <Link to="/">
                    <div className="index-link-sidebar">{'< SUSI Skills'}</div>
                  </Link>
                  <div
                    style={{
                      marginLeft: '10px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    {this.props.routeValue}
                  </div>
                </div>
              ) : (
                <div>
                  <Subheader style={styles.sidebarSubheader}>
                    SUSI Skills
                  </Subheader>
                  <div>{this.state.groups}</div>
                </div>
              )}

              <Divider style={{ marginLeft: '16px', marginRight: '16px' }} />
              {/* Refine by rating section*/}
              <Subheader style={styles.sidebarSubheader}>Refine by</Subheader>

              {metricsHidden && (
                <div
                  style={{
                    marginBottom: '12px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Checkbox
                    label="Show Only Reviewed Skills"
                    labelPosition="right"
                    className="select"
                    checked={this.state.showReviewedSkills}
                    labelStyle={{ fontSize: '14px' }}
                    iconStyle={{ left: '4px' }}
                    style={{
                      width: '256px',
                      paddingLeft: '8px',
                      top: '3px',
                    }}
                    onCheck={this.handleShowSkills}
                  />
                </div>
              )}

              <h4
                style={{
                  marginLeft: '24px',
                  marginBottom: '4px',
                  fontSize: 14,
                }}
              >
                Avg. Customer Review
              </h4>
              {this.state.ratingRefine ? (
                <div
                  className="clear-button"
                  style={styles.clearButton}
                  onClick={() => this.handleRatingRefine(null)}
                >
                  {'< Clear'}
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
                    className={this.state.ratingRefine === 4 ? 'bold' : ''}
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
                    className={this.state.ratingRefine === 3 ? 'bold' : ''}
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
                    className={this.state.ratingRefine === 2 ? 'bold' : ''}
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
                    className={this.state.ratingRefine === 1 ? 'bold' : ''}
                  >
                    & Up
                  </div>
                </div>
              </div>
            </Menu>
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
              {metricsHidden && (
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
                      '&applyFilter=true&filter_name=descending&filter_type=creation_date'
                    }
                    key={
                      '&applyFilter=true&filter_name=descending&filter_type=creation_date'
                    }
                    primaryText={'Newly created'}
                    label={'Newly Created'}
                  />
                  <MenuItem
                    value={
                      '&applyFilter=true&filter_name=descending&filter_type=modified_date'
                    }
                    key={
                      '&applyFilter=true&filter_name=descending&filter_type=modified_date'
                    }
                    primaryText={'Recently updated'}
                    label={'Recently updated'}
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
                floatingLabelText="Languages"
                floatingLabelFixed={false}
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
                multiple={true}
                hintText="Languages"
                value={languageValue}
                onChange={this.handleLanguageChange}
              >
                {this.languageMenuItems(languageValue)}
              </SelectField>
              {metricsHidden && (
                <RadioButtonGroup
                  name="view_type"
                  defaultSelected="list"
                  style={
                    window.innerWidth < 430
                      ? {
                          right: 12,
                          position: 'absolute',
                          top: 216,
                          display: 'flex',
                        }
                      : { display: 'flex', marginTop: 34 }
                  }
                  valueSelected={this.state.viewType}
                  onChange={this.handleViewChange}
                >
                  <RadioButton
                    value="list"
                    label="List view"
                    labelStyle={{ display: 'none' }}
                    style={{ width: 'fit-content' }}
                    checkedIcon={
                      <ActionViewStream style={{ fill: '#4285f4' }} />
                    }
                    uncheckedIcon={<ActionViewStream />}
                  />
                  <RadioButton
                    value="grid"
                    label="Grid view"
                    labelStyle={{ display: 'none' }}
                    style={{ width: 'fit-content' }}
                    checkedIcon={
                      <ActionViewModule style={{ fill: '#4285f4' }} />
                    }
                    uncheckedIcon={<ActionViewModule />}
                  />
                </RadioButtonGroup>
              )}
            </div>
            {!this.state.skillsLoaded && (
              <div>
                <h1 style={styles.loader}>
                  <div className="center">
                    <CircularProgress size={62} color="#4285f5" />
                    <h4>Loading</h4>
                  </div>
                </h1>
              </div>
            )}

            {this.state.skillsLoaded ? (
              <div style={styles.container}>
                {this.state.topRatedSkills.length &&
                !this.state.searchQuery.length &&
                !this.state.ratingRefine &&
                !this.state.timeFilter ? (
                  <div style={metricsContainerStyle}>
                    <div
                      style={styles.metricsHeader}
                      className="metrics-header"
                    >
                      <h4>{'"SUSI, what are your highest rated skills?"'}</h4>
                    </div>
                    {/* Scroll Id must be unique for all instances of SkillCardList*/}
                    {!this.props.routeType && (
                      <SkillCardScrollList
                        scrollId="topRated"
                        skills={this.state.topRatedSkills}
                        modelValue={this.state.modelValue}
                        languageValue={this.state.languageValue}
                        skillUrl={this.state.skillUrl}
                      />
                    )}
                  </div>
                ) : null}

                {this.state.topUsedSkills.length &&
                !this.state.searchQuery.length &&
                !this.state.ratingRefine &&
                !this.state.timeFilter ? (
                  <div style={metricsContainerStyle}>
                    <div
                      style={styles.metricsHeader}
                      className="metrics-header"
                    >
                      <h4>{'"SUSI, what are your most used skills?"'}</h4>
                    </div>
                    {/* Scroll Id must be unique for all instances of SkillCardList*/}
                    {!this.props.routeType && (
                      <SkillCardScrollList
                        scrollId="topUsed"
                        skills={this.state.topUsedSkills}
                        modelValue={this.state.modelValue}
                        languageValue={this.state.languageValue}
                        skillUrl={this.state.skillUrl}
                      />
                    )}
                  </div>
                ) : null}

                {this.state.newestSkills.length &&
                !this.state.searchQuery.length &&
                !this.state.ratingRefine &&
                !this.state.timeFilter ? (
                  <div style={metricsContainerStyle}>
                    <div
                      style={styles.metricsHeader}
                      className="metrics-header"
                    >
                      <h4>{'"SUSI, what are the newest skills?"'}</h4>
                    </div>
                    {/* Scroll Id must be unique for all instances of SkillCardList*/}
                    {!this.props.routeType && (
                      <SkillCardScrollList
                        scrollId="newestSkills"
                        skills={this.state.newestSkills}
                        modelValue={this.state.modelValue}
                        languageValue={this.state.languageValue}
                        skillUrl={this.state.skillUrl}
                      />
                    )}
                  </div>
                ) : null}

                {this.state.latestUpdatedSkills.length &&
                !this.state.searchQuery.length &&
                !this.state.ratingRefine &&
                !this.state.timeFilter ? (
                  <div style={metricsContainerStyle}>
                    <div
                      style={styles.metricsHeader}
                      className="metrics-header"
                    >
                      <h4>{'"SUSI, what are the recently updated skills?"'}</h4>
                    </div>
                    {/* Scroll Id must be unique for all instances of SkillCardList*/}
                    {!this.props.routeType && (
                      <SkillCardScrollList
                        scrollId="latestUpdatedSkills"
                        skills={this.state.latestUpdatedSkills}
                        modelValue={this.state.modelValue}
                        languageValue={this.state.languageValue}
                        skillUrl={this.state.skillUrl}
                      />
                    )}
                  </div>
                ) : null}

                {this.state.topFeedbackSkills.length &&
                !this.state.searchQuery.length &&
                !this.state.ratingRefine &&
                !this.state.timeFilter ? (
                  <div style={metricsContainerStyle}>
                    <div
                      style={styles.metricsHeader}
                      className="metrics-header"
                    >
                      <h4>
                        {'"SUSI, what are the skills with most feedback?"'}
                      </h4>
                    </div>
                    {/* Scroll Id must be unique for all instances of SkillCardList*/}
                    {!this.props.routeType && (
                      <SkillCardScrollList
                        scrollId="topFeedback"
                        skills={this.state.topFeedbackSkills}
                        modelValue={this.state.modelValue}
                        languageValue={this.state.languageValue}
                        skillUrl={this.state.skillUrl}
                      />
                    )}
                  </div>
                ) : null}

                {this.state.topGames.length &&
                !this.state.searchQuery.length &&
                !this.state.ratingRefine &&
                !this.state.timeFilter ? (
                  <div style={metricsContainerStyle}>
                    <div
                      style={styles.metricsHeader}
                      className="metrics-header"
                    >
                      <h4>{'"SUSI, what are your top games?"'}</h4>
                    </div>
                    {/* Scroll Id must be unique for all instances of SkillCardList*/}
                    {!this.props.routeType && (
                      <SkillCardScrollList
                        scrollId="topGames"
                        skills={this.state.topGames}
                        modelValue={this.state.modelValue}
                        languageValue={this.state.languageValue}
                        skillUrl={this.state.skillUrl}
                      />
                    )}
                  </div>
                ) : null}

                {(this.state.skills.length && this.props.routeType) ||
                (this.state.searchQuery.length && this.state.skills.length) ||
                this.state.ratingRefine ||
                (this.state.timeFilter && this.state.skills.length) ? (
                  <div>
                    {this.state.searchQuery.length || this.props.routeType ? (
                      <div
                        style={{
                          display: 'flex',
                          margin: '0 0 10px 10px',
                          fontSize: '16px',
                        }}
                      >
                        {this.state.skills.length} result(s) for&nbsp;<b>
                          SUSI Skills
                        </b>
                        {this.props.routeValue && (
                          <div style={{ display: 'flex' }}>
                            &nbsp;:&nbsp;<div
                              style={{ color: '#4286f4', fontWeight: 'bold' }}
                            >
                              {this.props.routeValue}
                            </div>
                          </div>
                        )}
                        {this.state.searchQuery.length > 0 && (
                          <div style={{ display: 'flex' }}>
                            &nbsp;:&nbsp;<div
                              style={{ color: '#4286f4', fontWeight: 'bold' }}
                            >
                              &quot;{this.state.searchQuery}&quot;
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      ''
                    )}
                    <div>
                      {this.state.viewType === 'list' ? (
                        <SkillCardList
                          skills={this.state.skills}
                          modelValue={this.state.modelValue}
                          languageValue={this.state.languageValue}
                          skillUrl={this.state.skillUrl}
                        />
                      ) : (
                        <SkillCardGrid
                          skills={this.state.skills}
                          modelValue={this.state.modelValue}
                          languageValue={this.state.languageValue}
                          skillUrl={this.state.skillUrl}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    {this.props.routeType ||
                    this.state.searchQuery.length ||
                    this.state.timeFilter ? (
                      <div style={styles.noSkill}>
                        No Skills found. Be the first one to
                        <Link to="/skillCreator"> create</Link> a skill in this
                        category
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                )}
                {/* Check if mobile view is currently active*/}
                <div className="category-mobile-section">
                  {this.props.routeType === 'category'
                    ? backToHome
                    : groupsMobile}
                </div>
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
