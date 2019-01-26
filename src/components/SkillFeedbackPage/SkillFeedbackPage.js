import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import skillActions from '../../redux/actions/skill';
import { Paper } from 'material-ui';
import PropTypes from 'prop-types';

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
import Emoji from 'react-emoji-render';

import '../SkillFeedbackCard/SkillFeedbackCard.css';
import './SkillFeedbackPage.css';
import { urls, parseDate, formatDate } from '../../utils';

const styles = {
  containerStyle: {
    marginTop: '50px',
    width: '100%',
    fontSize: '14px',
  },
};

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
      openDeleteModal: false,
      errorText: '',
      loading: true,
      showAuthorSkills: false,
      currentPage: 1,
      currentRecords: [],
    };
    this.totalPages = 1;
    this.pageNeighbours =
      typeof this.pageNeighbours === 'number'
        ? Math.max(0, Math.min(this.pageNeighbours, 2))
        : 0;
    const { pathname } = this.props.location;
    this.groupValue = pathname.split('/')[1];
    this.skillTag = pathname.split('/')[2];
    this.languageValue = pathname.split('/')[3];
    this.skillName = this.skillTag
      ? this.skillTag
          .split('_')
          .map(data => {
            const s = data.charAt(0).toUpperCase() + data.substring(1);
            return s;
          })
          .join(' ')
      : '';

    this.skillData = {
      model: 'general',
      group: this.groupValue,
      language: this.languageValue,
      skill: this.skillTag,
    };
  }

  fetchPageNumbers = () => {
    const { skillFeedbacks } = this.props;
    const { currentPage } = this.state;
    const totalPages = Math.ceil(skillFeedbacks.length / pageLimit);
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
    const { actions } = this.props;
    actions.getSkillMetaData(this.skillData);
    actions
      .getSkillFeedbacks(this.skillData)
      .then(response => this.setState({ loading: false }));
    this.gotoPage(1);
  }

  onPageChanged = data => {
    const { currentPage } = this.state;
    const { skillFeedbacks } = this.props;
    const offset = (currentPage - 1) * pageLimit;
    const currentRecords = skillFeedbacks.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentRecords });
  };

  gotoPage = page => {
    const { skillFeedbacks } = this.props;
    const currentPage = Math.max(0, page);
    const paginationData = {
      currentPage,
      totalPages: Math.ceil(skillFeedbacks.length / pageLimit),
      pageLimit,
      totalRecords: skillFeedbacks,
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
    const { currentPage } = this.state;
    evt.preventDefault();
    if (currentPage !== 1) {
      this.gotoPage(currentPage - 1);
    }
  };

  handleMoveRight = evt => {
    const { currentPage } = this.state;
    const { skillFeedbacks } = this.props;
    evt.preventDefault();
    if (currentPage !== Math.ceil(skillFeedbacks.length / pageLimit)) {
      this.gotoPage(currentPage + 1);
    }
  };

  handleEditOpen = () => {
    this.setState({ openEditDialog: true });
  };

  toggleDeleteModal = () => {
    this.setState(prevState => ({
      openDeleteModal: !prevState.openDeleteModal,
    }));
  };

  handleEditClose = () => {
    this.setState({
      openEditDialog: false,
      errorText: '',
    });
  };

  handleEditOpen = () => {
    this.setState({ openEditDialog: true });
  };

  editFeedback = () => {
    let feedbackText = document.getElementById('edit-feedback').value;
    this.setState({ feedbackValue: feedbackText });
  };

  setFeedback = event => {
    this.setState({ feedbackValue: event.target.value });
  };

  postFeedback = () => {
    const { group, language, skillTag: skill, actions } = this.props;
    const { feedbackValue } = this.state;
    const skillData = {
      model: 'general',
      group,
      language,
      skill,
      feedback: feedbackValue,
    };
    if (feedbackValue) {
      actions
        .setSkillFeedback(skillData)
        .then(payload => {
          actions.getSkillFeedbacks(skillData);
        })
        .catch(error => {
          console.log(error);
        });
      this.handleEditClose();
    } else {
      this.setState({ errorText: 'Feedback cannot be empty' });
    }
  };

  deleteFeedback = () => {
    const { actions } = this.props;
    actions
      .deleteSkillFeedback(this.skillData)
      .then(payload => actions.getSkillFeedbacks(this.skillData))
      .catch(error => console.log(error));
    this.toggleDeleteModal();
  };

  toggleAuthorSkills = () => {
    if (this.author) {
      this.setState(prevState => ({
        showAuthorSkills: !prevState.showAuthorSkills,
      }));
    }
  };

  render() {
    const {
      currentPage,
      showAuthorSkills,
      errorText,
      openEditDialog,
      openDeleteModal,
      loading,
    } = this.state;
    const {
      image,
      author,
      skillName: _skillName,
      skillFeedbacks,
      email,
      accessToken,
    } = this.props;

    const { containerStyle } = styles;

    const imgUrl = !image
      ? '/favicon-512x512.jpg'
      : `${urls.API_URL}/cms/getImage.png?model=general&language=${
          this.languageValue
        }&group=${this.groupValue}&image=${image}`;

    const skillName = _skillName === null ? 'No Name Given' : _skillName;

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
        onClick={this.postFeedback}
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
        onClick={this.toggleDeleteModal}
      />,
    ];

    let feedbackCards = [];
    let userFeedbackCard;
    let userFeedback;
    let userName = '';
    let userAvatarLink = '';
    let userEmail = '';

    if (skillFeedbacks) {
      userFeedback =
        skillFeedbacks[skillFeedbacks.findIndex(x => x.email === email)];
      if (userFeedback && currentPage === 1) {
        userEmail = userFeedback.email;
        userAvatarLink = userFeedback.avatar;
        userName = userFeedback.userName;
        const avatarProps = {
          src: userAvatarLink,
          name: userName === '' ? userEmail : userName,
        };
        userFeedbackCard = (
          <div>
            <ListItem
              leftAvatar={<CircleImage {...avatarProps} size="40" />}
              primaryText={
                <div>
                  <div>{userName === '' ? userEmail : userName}</div>
                  <div className="feedback-timestamp">
                    {formatDate(parseDate(userFeedback.timestamp))}
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
                    onClick={this.toggleDeleteModal}
                    leftIcon={<Delete />}
                  >
                    Delete
                  </MenuItem>
                </IconMenu>
              }
              secondaryText={<Emoji text={userFeedback.feedback} />}
            />
            <Divider inset={true} />
          </div>
        );
      }
    }
    if (skillFeedbacks) {
      feedbackCards = skillFeedbacks
        .slice((currentPage - 1) * pageLimit, currentPage * pageLimit)
        .map((data, index) => {
          userEmail = data.email;
          userAvatarLink = data.avatar;
          userName = data.userName;
          const avatarProps = {
            src: userAvatarLink,
            name: userName === '' ? userEmail : userName,
          };
          if (userEmail !== email) {
            return (
              <ListItem
                key={index}
                leftAvatar={<CircleImage {...avatarProps} size="40" />}
                primaryText={
                  <div>
                    <div>
                      {userName !== ''
                        ? userName
                        : `${userEmail.slice(
                            0,
                            userEmail.indexOf('@') + 1,
                          )}...`}
                    </div>
                    <div className="feedback-timestamp">
                      {formatDate(parseDate(data.timestamp))}
                    </div>
                  </div>
                }
                secondaryText={<Emoji text={data.feedback} />}
              />
            );
          }
          return null;
        });
    }
    let feedbackCardsElement = null;
    feedbackCardsElement = (
      <div>
        {accessToken && !userFeedback ? (
          <div>
            <div className="subTitle">
              {`Write your invaluable feedback with
            ${this.skillName} on SUSI.AI`}
            </div>
            <div>
              <div className="feedback-textbox">
                <TextField
                  id="post-feedback"
                  hintText="Skill Feedback"
                  defaultValue=""
                  errorText={errorText}
                  multiLine={true}
                  fullWidth={true}
                  onChange={this.setFeedback}
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
    if (!loading) {
      renderElement = (
        <div>
          <StaticAppBar {...this.props} />
          <div className="skill_listing_container" style={containerStyle}>
            <Paper className="margin-b-md margin-t-md">
              <p style={{ marginLeft: 10 }}>
                <Link
                  to={`/${this.groupValue}/${this.skillTag}/${
                    this.languageValue
                  }`}
                  style={{ color: '#000000' }}
                >
                  {this.skillName}
                </Link>
                <NavigationChevronRight style={{ paddingTop: 10 }} />
                Feedback
              </p>
              <div className="feedback-skill-detail">
                <div className="feedback-avatar">
                  <Link
                    to={`/${this.groupValue}/${this.skillTag}/${
                      this.languageValue
                    }`}
                  >
                    {image == null ? (
                      <CircleImage
                        name={this.skillName.toUpperCase()}
                        size="60"
                      />
                    ) : (
                      <img
                        className="feedback-avatar-img"
                        alt="Thumbnail"
                        src={imgUrl}
                      />
                    )}
                  </Link>
                </div>
                <div className="feedback-skill-name-author">
                  <h1 className="feedback-name">
                    <Link
                      to={`/${this.groupValue}/${this.skillTag}/${
                        this.languageValue
                      }`}
                    >
                      {skillName}
                    </Link>
                  </h1>
                  <div>
                    by{' '}
                    <span
                      className="feedback-author"
                      onClick={this.toggleAuthorSkills}
                    >
                      {author}
                    </span>
                  </div>
                </div>
              </div>
              <h1 className="title">Feedback</h1>
              {feedbackCardsElement}
              {skillFeedbacks &&
                (skillFeedbacks.length > 0 ? (
                  <div className="pagination-container">
                    <ul className="pagination">
                      <div
                        className={`navigation-pagination${
                          currentPage === 1 ? '-disabled' : ''
                        } `}
                      >
                        <a
                          onClick={this.handleMoveLeft}
                          className={`navigation-pagination-text${
                            currentPage === 1 ? '-disabled' : ''
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
                          currentPage ===
                          Math.ceil(skillFeedbacks.length / pageLimit)
                            ? '-disabled'
                            : ''
                        }`}
                      >
                        <a
                          onClick={this.handleMoveRight}
                          className={`navigation-pagination-text${
                            currentPage ===
                            Math.ceil(skillFeedbacks.length / pageLimit)
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
                  to={`/${this.groupValue}/${this.skillTag}/${
                    this.languageValue
                  }`}
                  style={{ color: '#417DDE' }}
                >
                  <b>
                    {`‹ See all details for ${this.skillTag &&
                      this.skillTag
                        .split(' ')
                        .map(data => {
                          let s =
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
          open={openEditDialog}
          onRequestClose={this.handleEditClose}
        >
          <TextField
            id="edit-feedback"
            hintText="Skill Feedback"
            defaultValue={userFeedback ? userFeedback.feedback : ''}
            errorText={errorText}
            multiLine={true}
            fullWidth={true}
            onChange={this.editFeedback}
          />
        </Dialog>
        <Dialog
          title="Delete Feedback"
          actions={deleteActions}
          modal={true}
          open={openDeleteModal}
          onRequestClose={this.handleEditClose}
        >
          Are you sure, you want to delete your feedback?
        </Dialog>
        <div>
          <AuthorSkills
            ref={c => {
              this.author = c;
            }}
            open={showAuthorSkills}
            requestClose={this.toggleAuthorSkills}
          />
        </div>
      </div>
    );
  }
}

SkillFeedbackPage.propTypes = {
  skillTag: PropTypes.string,
  skillFeedbacks: PropTypes.array,
  language: PropTypes.string,
  group: PropTypes.string,
  feedback: PropTypes.string,
  actions: PropTypes.object,
  location: PropTypes.object,
  author: PropTypes.object,
  image: PropTypes.string,
  skillName: PropTypes.string,
  email: PropTypes.string,
  accessToken: PropTypes.string,
};

function mapStateToProps(store) {
  return {
    language: store.skill.metaData.language,
    group: store.skill.metaData.group,
    skillTag: store.skill.metaData.skillTag,
    feedback: store.skill.feedback,
    skillFeedbacks: store.skill.skillFeedbacks,
    author: store.skill.metaData.author,
    image: store.skill.metaData.image,
    skillName: store.skill.metaData.skillName,
    email: store.app.email,
    accessToken: store.app.accessToken,
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
)(SkillFeedbackPage);
