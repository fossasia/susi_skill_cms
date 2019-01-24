import React from 'react';
import PropTypes from 'prop-types';
import styles from './SkillStyle';
import ISO6391 from 'iso-639-1';
import Cookies from 'universal-cookie';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import skillActions from '../../redux/actions/skills';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
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
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import IconButton from 'material-ui/IconButton';
import SearchBar from 'material-ui-search-bar';
import { scrollAnimation } from '../../utils';
import CircularProgress from 'material-ui/CircularProgress';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import SkillCardList from '../SkillCardList/SkillCardList';
import SkillCardGrid from '../SkillCardGrid/SkillCardGrid';
import SkillCardScrollList from '../SkillCardScrollList/SkillCardScrollList';
import SkillRating from '../SkillRating/SkillRating.js';
import { colors } from '../../utils';
import Footer from '../Footer/Footer.react';
import './custom.css';

const cookies = new Cookies();

class BrowseSkill extends React.Component {
  static propTypes = {
    routeType: PropTypes.string,
    routeValue: PropTypes.string,
    actions: PropTypes.object,
    listPage: PropTypes.number,
    groups: PropTypes.array,
    languageValue: PropTypes.array,
    filterType: PropTypes.string,
    reviewed: PropTypes.bool,
    staffPicks: PropTypes.bool,
    groupValue: PropTypes.string,
    searchQuery: PropTypes.string,
    languages: PropTypes.array,
    orderBy: PropTypes.string,
    skills: PropTypes.array,
    entriesPerPage: PropTypes.number,
    ratingRefine: PropTypes.number,
    timeFilter: PropTypes.number,
    listOffset: PropTypes.number,
    viewType: PropTypes.string,
    metricSkills: PropTypes.object,
    loadingSkills: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      innerWidth: window.innerWidth,
    };
    this.groups = [];
  }

  componentDidMount() {
    document.title = 'SUSI.AI - Browse Skills';
    const { actions, routeType } = this.props;
    actions.initializeSkillData().then(() => {
      this.loadLanguages('All');
      this.loadGroups();
    });

    if (
      routeType ||
      ['category', 'language'].includes(window.location.href.split('/')[3])
    ) {
      this.loadCards();
    } else {
      this.loadMetricsSkills();
    }
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      innerWidth: window.innerWidth,
    });
  };

  // FilterChange
  handleFilterChange = (event, index, value) => {
    this.props.actions
      .setFilterType({ filterType: value })
      .then(() => this.loadCards());
  };

  handleLanguageChange = (event, index, values) => {
    cookies.set('languages', values);
    this.props.actions.setLanguageFilter({ languageValue: values }).then(() => {
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

  handleEntriesPerPageChange = (event, index, values) => {
    this.props.actions.setSkillsPerPage({ entriesPerPage: values });
  };

  handlePageChange = (event, index, value) => {
    if (value !== undefined) {
      this.props.actions.setSkillsPageNumber({ listPage: value });
    }
  };

  handleNavigationForward = () => {
    scrollAnimation(document.documentElement, 0, 200, 'vertical');
    const { listPage } = this.props;
    const newListPage = listPage + 1;
    this.props.actions.setSkillsPageNumber({ listPage: newListPage });
  };

  handleNavigationBackward = () => {
    scrollAnimation(document.documentElement, 0, 200, 'vertical');
    const { listPage } = this.props;
    const newListPage = listPage - 1;
    this.props.actions.setSkillsPageNumber({ listPage: newListPage });
  };

  handleViewChange = (event, value) => {
    this.props.actions.setSkillsViewType({ viewType: value });
  };

  handleArrivalTimeChange = value => {
    if (value) {
      this.props.actions
        .setTimeFilter({
          filterType: `creation_date&duration=${value}`,
          timeFilter: value,
        })
        .then(() => this.loadCards());
    } else {
      this.props.actions
        .setTimeFilter({ filterType: 'rating', timeFilter: null })
        .then(() => this.loadCards());
    }
  };

  handleSearch = value => {
    this.props.actions
      .setSearchFilter({ searchQuery: value })
      .then(() => this.loadCards());
  };

  loadGroups = () => {
    const { groups } = this.props;
    if (groups.length === 0) {
      this.props.actions.getGroupOptions();
    }
  };

  loadLanguages = value => {
    this.props.actions.getLanguageOptions({ groupValue: value });
  };

  loadCards = () => {
    const { routeType, routeValue } = this.props;
    const {
      languageValue,
      filterType,
      reviewed,
      staffPicks,
      groupValue,
      searchQuery,
      orderBy,
    } = this.props;
    let payload = {
      groupValue: groupValue,
      language: languageValue,
      applyFilter: true,
      filterName: orderBy,
      filterType: filterType,
      showReviewedSkills: reviewed,
      showStaffPicks: staffPicks,
      searchQuery: searchQuery,
    };
    if (routeType === 'category') {
      this.props.actions.setCategoryFilter({ groupValue: routeValue });
      this.loadLanguages(routeValue);
      payload = { ...payload, groupValue: routeValue };
    } else if (routeType === 'language') {
      this.setState({
        languageValue: routeValue,
      });
      payload = { ...payload, languageValue: routeValue };
    }
    if (searchQuery.length > 0) {
      payload = {
        ...payload,
        searchQuery: searchQuery,
      };
    }
    this.props.actions.getSkills(payload);
  };

  loadMetricsSkills = () => {
    this.props.actions.getMetricsSkills({
      languageValue: this.props.languageValue,
    });
  };

  handleRatingRefine = ratingRefine => {
    if (this.props.skills.length === 0) {
      this.props.actions.setSkillsLoading().then(() => this.loadCards());
    }
    if (ratingRefine) {
      this.props.actions.setStarRatingFilter({ ratingRefine });
    } else {
      this.props.actions
        .setStarRatingFilter({ ratingRefine })
        .then(this.loadCards());
    }
  };

  languageMenuItems = values => {
    return this.props.languages.map(name => (
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
  };

  pageMenuItems = values => {
    const { skills, entriesPerPage } = this.props;
    let menuItems = [];
    for (let i = 1; i <= Math.ceil(skills.length / entriesPerPage); i += 1) {
      menuItems.push(i);
    }
    return menuItems.map(menuItem => (
      <MenuItem
        key={menuItem}
        value={menuItem}
        primaryText={menuItem.toString()}
        label={menuItem.toString()}
      />
    ));
  };

  handleOrderByChange = () => {
    const value =
      this.props.orderBy === 'ascending' ? 'descending' : 'ascending';
    this.props.actions
      .setOrderByFilter({ orderBy: value })
      .then(() => this.loadCards());
  };

  render() {
    const { innerWidth } = this.state;

    const {
      languageValue,
      searchQuery,
      ratingRefine,
      timeFilter,
      skills,
      entriesPerPage,
      listPage,
      listOffset,
      staffPicks,
      reviewed,
      viewType,
    } = this.props;
    const { routeType, routeValue } = this.props;

    let sidebarStyle = styles.sidebar;
    let topBarStyle = styles.topBar;
    let backToHome = null;
    let renderMenu = null;
    let renderMobileMenu = null;
    if (window.innerWidth < 430) {
      sidebarStyle.display = 'none';
      topBarStyle.flexDirection = 'column';
      backToHome = (
        <MenuItem
          value="Back to SUSI Skills"
          key="Back to SUSI Skills"
          primaryText="Back to SUSI Skills"
          containerElement={<Link to="/" />}
          style={{ minHeight: '32px', textAlign: 'center', lineHeight: '32px' }}
        />
      );
      renderMobileMenu = this.props.groups.map(categoryName => {
        const linkValue = '/category/' + categoryName;
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
      });
    }
    if (innerWidth >= 430) {
      sidebarStyle.display = 'block';
      topBarStyle.flexDirection = 'row';
      renderMenu = this.props.groups.map(categoryName => {
        const linkValue = '/category/' + categoryName;
        return (
          <MenuItem
            value={categoryName}
            key={categoryName}
            primaryText={categoryName}
            containerElement={<Link to={linkValue} />}
            style={styles.categorySidebarMenuItem}
          />
        );
      });
    }

    let metricsHidden =
      routeType || searchQuery.length > 0 || ratingRefine || timeFilter;

    let renderSkillCount = '';
    if (skills.length > 0) {
      renderSkillCount = (
        <div
          style={{
            display: 'flex',
          }}
        >
          {listOffset + 1}-{listOffset + entriesPerPage > skills.length
            ? skills.length
            : listOffset + entriesPerPage}{' '}
          out of {skills.length} result(s) for&nbsp;<b>
            <Link to="/">
              <div className="susi-skills">SUSI Skills</div>
            </Link>
          </b>
          {routeValue && (
            <div style={{ display: 'flex' }}>
              :&nbsp;<div style={{ color: '#4286f4', fontWeight: 'bold' }}>
                {routeValue}
              </div>
            </div>
          )}
          {searchQuery.length > 0 && (
            <div style={{ display: 'flex' }}>
              :&nbsp;<div style={{ color: '#4286f4', fontWeight: 'bold' }}>
                &quot;{searchQuery}&quot;
              </div>
            </div>
          )}
          {ratingRefine > 0 && (
            <div style={{ display: 'flex' }}>
              :&nbsp;<div style={{ color: '#4286f4', fontWeight: 'bold' }}>
                {ratingRefine} Stars & Up
              </div>
            </div>
          )}
          {timeFilter > 0 && (
            <div style={{ display: 'flex' }}>
              :&nbsp;<div style={{ fontWeight: 'bold' }}>
                Last {timeFilter} days
              </div>
            </div>
          )}
        </div>
      );
    } else if (searchQuery.length > 0) {
      renderSkillCount = (
        <div style={{ padding: '10px' }}>
          <h2 style={{ fontWeight: '400' }}>
            Your search <b>&quot;{searchQuery}&quot;</b> did not match any
            skills.
          </h2>
          <h3 style={{ margin: '15px 0 10px 0' }}>Try something like</h3>
          <ul style={{ listStyle: 'inside' }}>
            <li>Using more general terms</li>
            <li>Checking your spelling</li>
          </ul>
        </div>
      );
    } else {
      renderSkillCount = (
        <div>
          No result found for{' '}
          <b>
            <Link to="/">
              <span className="susi-skills">SUSI Skills: </span>
            </Link>
          </b>
          {routeValue && (
            <span style={{ color: '#4286f4', fontWeight: 'bold' }}>
              {routeValue}
            </span>
          )}
        </div>
      );
    }

    let renderCardScrollList = '';
    renderCardScrollList = !metricsHidden &&
      !routeType && <SkillCardScrollList />;

    let renderOrderBy = '';

    renderOrderBy =
      this.props.orderBy === 'ascending' ? (
        <NavigationArrowUpward />
      ) : (
        <NavigationArrowDownward />
      );

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
              {timeFilter ? (
                <div className="category-sidebar-section">
                  <div
                    className="index-link-sidebar"
                    onClick={() => this.handleArrivalTimeChange(null)}
                  >
                    {'< Any release'}
                  </div>
                  <div style={styles.selectedFilterStyle}>
                    {`Last ${timeFilter} Days`}
                  </div>
                </div>
              ) : (
                <Subheader style={styles.sidebarSubheader}>
                  New Arrivals
                </Subheader>
              )}
              {!timeFilter && (
                <MenuItem
                  value="creation_date&duration=7"
                  key="Last 7 Days"
                  primaryText="Last 7 Days"
                  onClick={() => this.handleArrivalTimeChange(7)}
                  style={styles.sidebarMenuItem}
                />
              )}
              {!timeFilter && (
                <MenuItem
                  value="creation_date&duration=30"
                  key="Last 30 Days"
                  primaryText="Last 30 Days"
                  onClick={() => this.handleArrivalTimeChange(30)}
                  style={styles.sidebarMenuItem}
                />
              )}
              {!timeFilter && (
                <MenuItem
                  value="creation_date&duration=90"
                  key="Last 90 Days"
                  primaryText="Last 90 Days"
                  onClick={() => this.handleArrivalTimeChange(90)}
                  style={styles.sidebarMenuItem}
                />
              )}
              <Divider style={{ marginLeft: '16px', marginRight: '16px' }} />

              {routeType === 'category' ? (
                <div className="category-sidebar-section">
                  <Link to="/">
                    <div
                      onClick={() =>
                        this.props.actions.setCategoryFilter({
                          groupValue: 'All',
                        })
                      }
                      className="index-link-sidebar"
                    >
                      {'< SUSI Skills'}
                    </div>
                  </Link>
                  <div style={styles.selectedFilterStyle}>{routeValue}</div>
                </div>
              ) : (
                <div>
                  <Subheader style={styles.sidebarSubheader}>
                    SUSI Skills
                  </Subheader>
                  {renderMenu}
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
                    label="Staff Picks"
                    labelPosition="right"
                    className="select"
                    checked={staffPicks}
                    labelStyle={{ fontSize: '14px' }}
                    iconStyle={{ left: '4px' }}
                    style={styles.checkboxStyle}
                    name="showStaffPicks"
                    onCheck={event => {
                      this.props.actions
                        .setStaffpickFilter({
                          staffPicks: event.target.checked,
                        })
                        .then(() => this.loadCards());
                    }}
                  />
                  <Checkbox
                    label="Show Only Reviewed Skills"
                    labelPosition="right"
                    className="select"
                    checked={reviewed}
                    labelStyle={{ fontSize: '14px' }}
                    iconStyle={{ left: '4px' }}
                    style={styles.checkboxStyle}
                    name="showReviewedSkills"
                    onCheck={event => {
                      this.props.actions
                        .setReviewedFilter({ reviewed: event.target.checked })
                        .then(() => this.loadCards());
                    }}
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
              {ratingRefine ? (
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
                <SkillRating
                  handleRatingRefine={this.handleRatingRefine}
                  rating={4}
                  ratingRefine={ratingRefine}
                />
                <SkillRating
                  handleRatingRefine={this.handleRatingRefine}
                  rating={3}
                  ratingRefine={ratingRefine}
                />
                <SkillRating
                  handleRatingRefine={this.handleRatingRefine}
                  rating={2}
                  ratingRefine={ratingRefine}
                />
                <SkillRating
                  handleRatingRefine={this.handleRatingRefine}
                  rating={1}
                  ratingRefine={ratingRefine}
                />
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
                  value={searchQuery}
                />
              </div>
              {metricsHidden && (
                <div style={styles.sortBy}>
                  {this.props.filterType !== '' && (
                    <IconButton
                      iconStyle={{ fill: '#4285F4' }}
                      onClick={this.handleOrderByChange}
                      tooltip={this.props.orderBy}
                    >
                      {renderOrderBy}
                    </IconButton>
                  )}
                  <SelectField
                    floatingLabelText="Sort by"
                    value={this.props.filterType}
                    floatingLabelFixed={false}
                    onChange={this.handleFilterChange}
                    style={styles.selection}
                    className="select"
                    // autoWidth
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
                      value={'lexicographical'}
                      key={'lexicographical'}
                      primaryText={'A-Z'}
                      label={'Name (A-Z)'}
                    />
                    <MenuItem
                      value={'rating'}
                      key={'rating'}
                      primaryText={'Top Rated'}
                      label={'Top Rated'}
                    />
                    <MenuItem
                      value={'creation_date'}
                      key={'creation_date'}
                      primaryText={'Newly created'}
                      label={'Newly Created'}
                    />
                    <MenuItem
                      value={'modified_date'}
                      key={'modified_date'}
                      primaryText={'Recently updated'}
                      label={'Recently updated'}
                    />
                    <MenuItem
                      value={'feedback'}
                      key={'feedback'}
                      primaryText={'Feedback Count'}
                      label={'Feedback Count'}
                    />
                    <MenuItem
                      value={'usage&duration=7'}
                      key={'usage&duration=7'}
                      primaryText={'This Week Usage'}
                      label={'This Week Usage'}
                    />
                    <MenuItem
                      value={'usage&duration=30'}
                      key={'usage&duration=30'}
                      primaryText={'This Month Usage'}
                      label={'This Month Usage'}
                    />
                  </SelectField>
                </div>
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
                    innerWidth < 430
                      ? {
                          right: 12,
                          position: 'absolute',
                          top: 216,
                          display: 'flex',
                        }
                      : { display: 'flex', marginTop: 34 }
                  }
                  valueSelected={viewType}
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
                    uncheckedIcon={
                      <ActionViewStream style={{ fill: '#e0e0e0' }} />
                    }
                  />
                  <RadioButton
                    value="grid"
                    label="Grid view"
                    labelStyle={{ display: 'none' }}
                    style={{ width: 'fit-content' }}
                    checkedIcon={
                      <ActionViewModule style={{ fill: '#4285f4' }} />
                    }
                    uncheckedIcon={
                      <ActionViewModule style={{ fill: '#e0e0e0' }} />
                    }
                  />
                </RadioButtonGroup>
              )}
            </div>
            {this.props.loadingSkills && (
              <div>
                <h1 style={styles.loader}>
                  <div className="center">
                    <CircularProgress size={62} color="#4285f5" />
                    <h4>Loading</h4>
                  </div>
                </h1>
              </div>
            )}

            {!this.props.loadingSkills ? (
              <div style={styles.container}>
                <div>{renderCardScrollList}</div>
                {metricsHidden ? (
                  <div>
                    <div id={'page-filter'}>
                      {renderSkillCount}
                      {skills.length > 10 && (
                        <div id={'pagination'}>
                          <SelectField
                            floatingLabelText="Skills per page"
                            floatingLabelFixed={false}
                            hintText="Entries per page"
                            style={{ width: '150px' }}
                            value={this.props.entriesPerPage}
                            onChange={this.handleEntriesPerPageChange}
                          >
                            <MenuItem
                              value={10}
                              key={10}
                              primaryText={'10'}
                              label={'10'}
                            />
                            <MenuItem
                              value={20}
                              key={20}
                              primaryText={'20'}
                              label={'20'}
                            />
                            <MenuItem
                              value={50}
                              key={50}
                              primaryText={'50'}
                              label={'50'}
                            />
                            <MenuItem
                              value={100}
                              key={100}
                              primaryText={'100'}
                              label={'100'}
                            />
                          </SelectField>
                          <SelectField
                            floatingLabelText="Page"
                            floatingLabelFixed={false}
                            hintText="Page"
                            style={{ width: '150px' }}
                            value={this.props.listPage}
                            onChange={this.handlePageChange}
                          >
                            {this.pageMenuItems()}
                          </SelectField>
                        </div>
                      )}
                    </div>
                    <div>
                      {viewType === 'list' ? (
                        <SkillCardList />
                      ) : (
                        <SkillCardGrid />
                      )}
                    </div>
                    {skills.length > 10 && (
                      <div className="pageNavigation">
                        <div className="pagination-test">
                          Page: {listPage} out of{' '}
                          {Math.ceil(skills.length / entriesPerPage)}
                        </div>
                        <FloatingActionButton
                          disabled={listPage === 1}
                          style={{ marginRight: '15px' }}
                          backgroundColor={colors.header}
                          onClick={this.handleNavigationBackward}
                        >
                          <NavigationArrowBack />
                        </FloatingActionButton>
                        <FloatingActionButton
                          disabled={
                            listPage ===
                            Math.ceil(skills.length / entriesPerPage)
                          }
                          backgroundColor={colors.header}
                          onClick={this.handleNavigationForward}
                        >
                          <NavigationArrowForward />
                        </FloatingActionButton>
                      </div>
                    )}
                  </div>
                ) : (
                  ''
                )}
                {/* Check if mobile view is currently active*/}
                <div className="category-mobile-section">
                  {routeType === 'category' ? backToHome : renderMobileMenu}
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

function mapStateToProps(store) {
  return {
    ...store.skills,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(skillActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BrowseSkill);
