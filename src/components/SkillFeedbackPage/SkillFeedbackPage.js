import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper } from 'material-ui';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import $ from 'jquery';

import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import Footer from '../Footer/Footer.react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import CircleImage from '../CircleImage/CircleImage';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import AuthorSkills from '../AuthorSkills/AuthorSkills';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';
import EditBtn from 'material-ui/svg-icons/editor/mode-edit';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import md5 from 'md5';

import '../SkillFeedbackCard/SkillFeedbackCard.css';
import './SkillFeedbackPage.css';
import { urls, parseDate } from '../../utils';

const cookies = new Cookies();

const defaultNullSkillList = ['image', 'author', 'author_url'];
// eslint-disable-next-line
let name;

const iconButtonElement = (
  <IconButton touch={true} tooltip="More" tooltipPosition="bottom-left">
    <MoreVertIcon />
  </IconButton>
);

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const pageLimit = 6;

const range = (from, to, step = 1) => {
  let i = from;
  const rangeArr = [];

  while (i <= to) {
    rangeArr.push(i);
    i += step;
  }

  return rangeArr;
};

class SkillFeedbackPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openEditDialog: false,
      openDeleteDialog: false,
      errorText: '',
      skill_feedback: [],
      imgUrl: null,
      dataReceived: false,
      showAuthorSkills: false,
      currentPage: 1,
      currentRecords: [],
    };
    this.totalPages = 1;
    this.pageNeighbours =
      typeof this.pageNeighbours === 'number'
        ? Math.max(0, Math.min(this.pageNeighbours, 2))
        : 0;
    let clickedSkill = this.props.location.pathname.split('/')[2];
    this.name = clickedSkill;
    this.url = urls.API_URL + '/cms/getSkillList.json?group=Knowledge';
  }

  fetchPageNumbers = () => {
    const totalPages = Math.ceil(this.state.skill_feedback.length / pageLimit);
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;
    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);
      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }
        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  componentDidMount() {
    if (this.url !== undefined) {
      let baseUrl = urls.API_URL + '/cms/getSkillMetadata.json';
      let url = this.url;
      let modelValue = 'general';
      this.groupValue = this.props.location.pathname.split('/')[1];
      this.languageValue = this.props.location.pathname.split('/')[3];
      url =
        baseUrl +
        '?model=' +
        modelValue +
        '&group=' +
        this.groupValue +
        '&language=' +
        this.languageValue +
        '&skill=' +
        this.name;
      let self = this;
      $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          self.updateData(data.skill_metadata);
        },
      });
      this.getFeedback();
    }
    this.gotoPage(1);
  }

  onPageChanged = data => {
    const currentPage = this.state.currentPage;
    const offset = (currentPage - 1) * pageLimit;
    const currentRecords = this.state.skill_feedback.slice(
      offset,
      offset + pageLimit,
    );
    this.setState({ currentPage, currentRecords });
  };

  gotoPage = page => {
    const currentPage = Math.max(0, page);
    const paginationData = {
      currentPage,
      totalPages: Math.ceil(this.state.skill_feedback.length / pageLimit),
      pageLimit,
      totalRecords: this.state.skill_feedback,
    };
    this.setState({ currentPage }, () => this.onPageChanged(paginationData));
    if (this.feedbackRef) {
      this.feedbackRef.scrollIntoView({ behaviour: 'smooth' });
    }
  };

  handleClick = page => evt => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    if (this.state.currentPage !== 1) {
      this.gotoPage(this.state.currentPage - 1);
    }
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    if (
      this.state.currentPage !==
      Math.ceil(this.state.skill_feedback.length / pageLimit)
    ) {
      this.gotoPage(this.state.currentPage + 1);
    }
  };

  formatDate = timestamp => {
    timestamp = timestamp.split(' ').slice(1, 4);
    timestamp[1] = `${timestamp[1]},`;
    return timestamp.join(' ');
  };

  handleEditOpen = () => {
    this.setState({ openEditDialog: true });
  };

  handleDeleteOpen = () => {
    this.setState({ openDeleteDialog: true });
  };

  handleEditClose = () => {
    this.setState({
      openEditDialog: false,
      errorText: '',
    });
  };

  handleDeleteClose = () => {
    this.setState({
      openDeleteDialog: false,
    });
  };

  editFeedback = () => {
    let feedbackText = document.getElementById('edit-feedback').value;
    if (!feedbackText) {
      this.setState({ errorText: 'Feedback cannot be empty' });
    } else {
      this.postFeedbackApi(feedbackText);
      this.handleEditClose();
      this.forceUpdate();
    }
  };

  postFeedback = () => {
    let feedbackText = document.getElementById('post-feedback').value;
    if (!feedbackText) {
      this.setState({ errorText: 'Feedback cannot be empty' });
    } else {
      this.postFeedbackApi(feedbackText);
      this.handleEditClose();
    }
  };

  updateData = skillData => {
    let imgUrl = `${urls.API_URL}/cms/getImage.png?model=general&language=${
      this.languageValue
    }&group=${this.groupValue}&image=${skillData.image}`;
    if (!skillData.image) {
      imgUrl = '/favicon-512x512.jpg';
    }
    this.setState({
      imgUrl,
    });

    defaultNullSkillList.forEach(data => {
      this.setState({
        [data]: skillData[data],
      });
    });
    let skill_name =
      skillData.skill_name === null ? 'No Name Given' : skillData.skill_name;
    this.setState({
      skill_name,
    });
    name = skill_name;
    this.setState({
      dataReceived: true,
    });
  };

  saveSkillFeedback = (skill_feedback = []) => {
    this.setState({
      skill_feedback,
    });
  };

  getFeedback = () => {
    let getFeedbackUrl = `${urls.API_URL}/cms/getSkillFeedback.json`;
    let modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    getFeedbackUrl =
      getFeedbackUrl +
      '?model=' +
      modelValue +
      '&group=' +
      this.groupValue +
      '&language=' +
      this.languageValue +
      '&skill=' +
      this.name;

    let self = this;
    // Get skill feedback of the visited skill
    $.ajax({
      url: getFeedbackUrl,
      dataType: 'jsonp',
      crossDomain: true,
      jsonp: 'callback',
      success: function(data) {
        self.saveSkillFeedback(data.feedback);
      },
      error: function(e) {
        console.log(e);
      },
    });
  };

  postFeedbackApi = newFeedback => {
    let baseUrl = urls.API_URL + '/cms/feedbackSkill.json';
    let modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    let postFeedbackUrl =
      baseUrl +
      '?model=' +
      modelValue +
      '&group=' +
      this.groupValue +
      '&language=' +
      this.languageValue +
      '&skill=' +
      this.name +
      '&feedback=' +
      newFeedback +
      '&access_token=' +
      cookies.get('loggedIn');
    let self = this;
    $.ajax({
      url: postFeedbackUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.getFeedback();
      },
      error: function(e) {
        console.log(e);
      },
    });
    this.forceUpdate();
  };

  deleteFeedbackApi = () => {
    let baseUrl = urls.API_URL + '/cms/removeFeedback.json';
    let modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    let deleteFeedbackUrl =
      baseUrl +
      '?model=' +
      modelValue +
      '&group=' +
      this.groupValue +
      '&language=' +
      this.languageValue +
      '&skill=' +
      this.name +
      '&access_token=' +
      cookies.get('loggedIn');
    let self = this;
    $.ajax({
      url: deleteFeedbackUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.getFeedback();
        self.setState({ data });
        //
      },
      error: function(e) {
        console.log(e);
      },
    });
  };

  deleteFeedback = () => {
    this.deleteFeedbackApi();
    this.handleDeleteClose();
    this.getFeedback();
  };

  handleEditOpen = () => {
    this.setState({ openEditDialog: true });
  };

  handleDeleteOpen = () => {
    this.setState({ openDeleteDialog: true });
  };

  handleEditClose = () => {
    this.setState({
      openEditDialog: false,
      errorText: '',
    });
  };

  handleDeleteClose = () => {
    this.setState({
      openDeleteDialog: false,
    });
  };

  openAuthorSkills = () => {
    if (this.author) {
      this.author.loadSkillCards(this.state.author);
      this.setState({ showAuthorSkills: true });
    }
  };

  closeAuthorSkills = () => {
    this.setState({ showAuthorSkills: false });
  };

  getAvatarProps = emailId => {
    const emailHash = md5(emailId);
    const GRAVATAR_IMAGE_URL = `${urls.GRAVATAR_URL}/${emailHash}.jpg`;
    const avatarProps = {
      name: emailId.toUpperCase(),
      src: GRAVATAR_IMAGE_URL,
    };
    return avatarProps;
  };

  render() {
    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    const editActions = [
      <FlatButton
        key={0}
        label="Cancel"
        labelStyle={{ color: '#4285f4' }}
        onClick={this.handleEditClose}
      />,
      <FlatButton
        key={1}
        label="Edit"
        primary={true}
        keyboardFocused={true}
        labelStyle={{ color: '#4285f4' }}
        onClick={this.editFeedback}
      />,
    ];

    const deleteActions = [
      <FlatButton
        key={1}
        label="Yes"
        primary={true}
        keyboardFocused={true}
        labelStyle={{ color: '#4285f4' }}
        onClick={this.deleteFeedback}
      />,
      <FlatButton
        key={0}
        label="No"
        labelStyle={{ color: '#4285f4' }}
        onClick={this.handleDeleteClose}
      />,
    ];

    const styles = {
      home: {
        marginTop: '50px',
        width: '100%',
        fontSize: '14px',
      },
    };
    let emailId = cookies.get('emailId');
    let loggedIn = cookies.get('loggedIn');

    let feedbackCards = [];
    let userFeedbackCard;
    let userFeedback;

    if (this.state.skill_feedback) {
      userFeedback = this.state.skill_feedback[
        this.state.skill_feedback.findIndex(x => x.email === emailId)
      ];
      if (userFeedback && this.state.currentPage === 1) {
        const avatarProps = this.getAvatarProps(userFeedback.email);
        userFeedbackCard = (
          <div>
            <ListItem
              leftAvatar={<CircleImage {...avatarProps} size="40" />}
              primaryText={
                <div>
                  <div>{userFeedback.email}</div>
                  <div className="feedback-timestamp">
                    {this.formatDate(parseDate(userFeedback.timestamp))}
                  </div>
                </div>
              }
              rightIconButton={
                <IconMenu iconButtonElement={iconButtonElement}>
                  <MenuItem
                    onClick={this.handleEditOpen}
                    leftIcon={<EditBtn />}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={this.handleDeleteOpen}
                    leftIcon={<Delete />}
                  >
                    Delete
                  </MenuItem>
                </IconMenu>
              }
              secondaryText={<p>{userFeedback.feedback}</p>}
            />
            <Divider inset={true} />
          </div>
        );
      }
    }
    if (this.state.skill_feedback) {
      feedbackCards = this.state.skill_feedback
        .slice(
          (this.state.currentPage - 1) * pageLimit,
          this.state.currentPage * pageLimit,
        )
        .map((data, index) => {
          if (data.email !== emailId) {
            const avatarProps = this.getAvatarProps(data.email);
            return (
              <ListItem
                key={index}
                leftAvatar={<CircleImage {...avatarProps} size="40" />}
                primaryText={
                  <div>
                    <div>{data.email}</div>
                    <div className="feedback-timestamp">
                      {this.formatDate(parseDate(data.timestamp))}
                    </div>
                  </div>
                }
                secondaryText={<p>{data.feedback}</p>}
              />
            );
          }
          return null;
        });
    }
    let feedbackCardsElement = null;
    feedbackCardsElement = (
      <div>
        {loggedIn && !userFeedback ? (
          <div>
            <div className="subTitle">
              {`Write your invaluable feedback with
            ${this.state.skill_name} on SUSI.AI`}
            </div>
            <div>
              <div className="feedback-textbox">
                <TextField
                  id="post-feedback"
                  hintText="Skill Feedback"
                  defaultValue=""
                  errorText={this.state.errorText}
                  multiLine={true}
                  fullWidth={true}
                />
                <RaisedButton
                  label="Post"
                  labelStyle={{ color: 'white' }}
                  backgroundColor={'#4285f4'}
                  style={{ margin: 10 }}
                  onClick={this.postFeedback}
                />
              </div>
            </div>
          </div>
        ) : null}
        <div ref={el => (this.feedbackRef = el)}>
          {userFeedbackCard}
          {feedbackCards}
        </div>
      </div>
    );
    let renderElement = null;
    if (this.state.dataReceived) {
      renderElement = (
        <div>
          <StaticAppBar {...this.props} />
          <div className="skill_listing_container" style={styles.home}>
            <Paper className="margin-b-md margin-t-md">
              <p style={{ marginLeft: 10 }}>
                <Link
                  to={`/${this.groupValue}/${this.name}/${this.languageValue}`}
                  style={{ color: '#000000' }}
                >
                  {this.state.skill_name}
                </Link>
                <NavigationChevronRight style={{ paddingTop: 10 }} />
                Feedback
              </p>
              <div className="feedback-skill-detail">
                <div className="feedback-avatar">
                  <Link
                    to={`/${this.groupValue}/${this.name}/${
                      this.languageValue
                    }`}
                  >
                    {this.state.image == null ? (
                      <CircleImage
                        name={this.state.skill_name.toUpperCase()}
                        size="60"
                      />
                    ) : (
                      <img
                        className="feedback-avatar-img"
                        alt="Thumbnail"
                        src={this.state.imgUrl}
                      />
                    )}
                  </Link>
                </div>
                <div className="feedback-skill-name-author">
                  <h1 className="feedback-name">
                    <Link
                      to={`/${this.groupValue}/${this.name}/${
                        this.languageValue
                      }`}
                    >
                      {this.name &&
                        this.name
                          .split(' ')
                          .map(data => {
                            var s =
                              data.charAt(0).toUpperCase() + data.substring(1);
                            return s;
                          })
                          .join(' ')}
                    </Link>
                  </h1>
                  <div>
                    by{' '}
                    <span
                      className="feedback-author"
                      onClick={this.openAuthorSkills}
                    >
                      {this.state.author}
                    </span>
                  </div>
                </div>
              </div>
              <h1 className="title">Feedback</h1>
              {feedbackCardsElement}
              {this.state.skill_feedback &&
                (this.state.skill_feedback.length > 0 ? (
                  <div className="pagination-container">
                    <ul className="pagination">
                      <div
                        className={`navigation-pagination${
                          this.state.currentPage === 1 ? '-disabled' : ''
                        } `}
                      >
                        <a
                          onClick={this.handleMoveLeft}
                          className={`navigation-pagination-text${
                            this.state.currentPage === 1 ? '-disabled' : ''
                          }`}
                        >
                          ← Previous
                        </a>
                      </div>
                      {pages.map((page, index) => {
                        if (page === LEFT_PAGE) {
                          return (
                            <li key={index} className="page-item navigation">
                              <span className="page-link">...</span>
                            </li>
                          );
                        }
                        if (page === RIGHT_PAGE) {
                          return (
                            <li key={index} className="page-item navigation">
                              <span className="page-link">...</span>
                            </li>
                          );
                        }
                        return (
                          <li
                            key={index}
                            className={`page-item${
                              currentPage === page ? ' active' : ''
                            }`}
                          >
                            <a
                              className="page-link"
                              onClick={this.handleClick(page)}
                            >
                              {page}
                            </a>
                          </li>
                        );
                      })}
                      <div
                        className={`navigation-pagination${
                          this.state.currentPage ===
                          Math.ceil(
                            this.state.skill_feedback.length / pageLimit,
                          )
                            ? '-disabled'
                            : ''
                        }`}
                      >
                        <a
                          onClick={this.handleMoveRight}
                          className={`navigation-pagination-text${
                            this.state.currentPage ===
                            Math.ceil(
                              this.state.skill_feedback.length / pageLimit,
                            )
                              ? '-disabled'
                              : ''
                          }`}
                        >
                          Next →
                        </a>
                      </div>
                    </ul>
                  </div>
                ) : (
                  <div className="feedback-default-message">
                    No feedback present for this skill!
                  </div>
                ))}
              <div className="feedback-footer-skill">
                <Link
                  to={`/${this.groupValue}/${this.name}/${this.languageValue}`}
                  style={{ color: '#417DDE' }}
                >
                  <b>
                    {`‹ See all details for ${this.name &&
                      this.name
                        .split(' ')
                        .map(data => {
                          var s =
                            data.charAt(0).toUpperCase() + data.substring(1);
                          return s;
                        })
                        .join(' ')}`}
                  </b>
                </Link>
              </div>
            </Paper>
          </div>
          <Footer />
        </div>
      );
    } else {
      renderElement = (
        <div>
          <StaticAppBar {...this.props} />
          <h1 className="skill_loading_container">
            <div className="center">
              <CircularProgress size={62} color="#4285f5" />
              <h4>Loading</h4>
            </div>
          </h1>
        </div>
      );
    }
    return (
      <div>
        {renderElement}
        <Dialog
          title="Edit Feedback"
          actions={editActions}
          modal={false}
          open={this.state.openEditDialog}
          onRequestClose={this.handleEditClose}
        >
          <TextField
            id="edit-feedback"
            hintText="Skill Feedback"
            defaultValue={userFeedback ? userFeedback.feedback : ''}
            errorText={this.state.errorText}
            multiLine={true}
            fullWidth={true}
          />
        </Dialog>
        <Dialog
          title="Delete Feedback"
          actions={deleteActions}
          modal={true}
          open={this.state.openDeleteDialog}
          onRequestClose={this.handleEditClose}
        >
          Are you sure, you want to delete your feedback ?
        </Dialog>
        <div>
          <AuthorSkills
            ref={c => {
              this.author = c;
            }}
            open={this.state.showAuthorSkills}
            requestClose={this.closeAuthorSkills}
            author={this.state.author}
            authorUrl={this.state.author_url}
          />
        </div>
      </div>
    );
  }
}

SkillFeedbackPage.propTypes = {
  location: PropTypes.object,
};

export default SkillFeedbackPage;
