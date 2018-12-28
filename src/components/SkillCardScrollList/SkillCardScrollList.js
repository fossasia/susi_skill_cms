import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import { Link } from 'react-router-dom';
import { Card } from 'material-ui/Card';
import PropTypes from 'prop-types';
import CircleImage from '../CircleImage/CircleImage';
import { scrollAnimation } from '../../utils';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import StaffPick from '../../images/staff_pick.png';
import { urls } from '../../utils';

import styles from './ScrollStyle';

class SkillCardScrollList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      skills: this.props.skills,
      scrollCards: 4,
      leftBtnDisplay: 'none',
      rightBtnDisplay: 'inline',
    };
  }

  componentDidMount = () => {
    this.loadSkillCards();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    let width = window.innerWidth - 304;

    let element = document.getElementsByClassName('scrolling-wrapper')[0];

    if (window.innerWidth >= 430) {
      element.style = { width };
    } else {
      element.style.width = window.innerWidth;
      element.style.margin = '10px 0px 10px 0px';
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  };

  updateWindowDimensions = () => {
    let scrollCards = 1;
    switch (true) {
      case window.innerWidth >= 1400:
        scrollCards = 4;
        break;
      case window.innerWidth >= 1120:
        scrollCards = 3;
        break;
      case window.innerWidth >= 840:
        scrollCards = 2;
        break;
      default:
        scrollCards = 1;
    }
    let width = window.innerWidth - 304;
    this.setState({
      scrollCards: scrollCards,
    });

    let element = document.getElementsByClassName('scrolling-wrapper')[0];

    if (window.innerWidth >= 430) {
      element.style = { width };
    } else {
      element.style.width = window.innerWidth;
      element.style.margin = '10px 0px 10px 0px';
    }
  };

  componentDidUpdate() {
    if (this.props.skills !== this.state.skills) {
      this.setState(
        {
          skills: this.props.skills,
        },
        () => this.loadSkillCards(),
      );
    }
  }

  changeBtnDisplay = (scrollValue, maxScrollValue) => {
    scrollValue >= maxScrollValue
      ? this.setState({ rightBtnDisplay: 'none' })
      : this.setState({ rightBtnDisplay: 'inline' });
    scrollValue <= 0
      ? this.setState({ leftBtnDisplay: 'none' })
      : this.setState({ leftBtnDisplay: 'inline' });
  };

  scrollLeft = () => {
    debugger;
    let parentEle = document.getElementById(this.props.scrollId);
    let maxScrollValue = parentEle.scrollWidth - parentEle.clientWidth;
    let scrollValue = parentEle.scrollLeft - 280 * this.state.scrollCards;
    scrollAnimation(parentEle, scrollValue, 100, 'horizontal');
    this.changeBtnDisplay(scrollValue, maxScrollValue);
  };

  scrollRight = () => {
    let parentEle = document.getElementById(this.props.scrollId);
    let scrollValue = parentEle.scrollLeft + 280 * this.state.scrollCards;
    let maxScrollValue = parentEle.scrollWidth - parentEle.clientWidth;
    scrollAnimation(parentEle, scrollValue, 100, 'horizontal');
    this.changeBtnDisplay(scrollValue, maxScrollValue);
  };

  loadSkillCards = () => {
    let cards = [];
    Object.keys(this.state.skills).forEach(el => {
      let skill = this.state.skills[el];
      let skill_name,
        examples,
        image,
        staffPick = false; // , description;
      let average_rating = 0,
        total_rating = 0;
      if (skill.skill_name) {
        skill_name = skill.skill_name;
        skill_name = skill_name.charAt(0).toUpperCase() + skill_name.slice(1);
      } else {
        skill_name = 'Name not available';
      }
      if (skill.image) {
        image = `${urls.API_URL}/cms/getImage.png?model=${
          skill.model
        }&language=${skill.language}&group=${skill.group}&image=${skill.image}`;
      } else {
        image = '';
      }
      if (skill.examples) {
        examples = skill.examples;
        examples = examples[0];
      } else {
        examples = null;
      }
      if (skill.skill_rating) {
        average_rating = parseFloat(skill.skill_rating.stars.avg_star);
        total_rating = parseInt(skill.skill_rating.stars.total_star, 10);
      }

      if (skill.staffPick) {
        staffPick = true;
      }

      cards.push(
        <Card style={styles.skillCard} key={el}>
          <Link
            key={el}
            to={{
              pathname:
                '/' +
                skill.group +
                '/' +
                skill.skill_tag +
                '/' +
                skill.language,
              state: {
                url: this.props.skillUrl,
                element: el,
                name: el,
                modelValue: this.props.modelValue,
                groupValue: skill.group,
                languageValue: this.props.languageValue,
              },
            }}
          >
            <div style={styles.imageContainer} key={el}>
              {image ? (
                <div style={styles.image}>
                  <img alt={skill_name} src={image} style={styles.image} />
                </div>
              ) : (
                <CircleImage name={el} size="48" />
              )}
              {examples ? (
                <div style={styles.example}>&quot;{examples}&quot;</div>
              ) : null}
            </div>
          </Link>
          <div style={styles.name}>
            <Link
              to={{
                pathname:
                  '/' +
                  skill.group +
                  '/' +
                  skill.skill_tag +
                  '/' +
                  skill.language,
                state: {
                  url: this.props.skillUrl,
                  element: el,
                  name: el,
                  modelValue: this.props.modelValue,
                  groupValue: skill.group,
                  languageValue: this.props.languageValue,
                },
              }}
            >
              <span>{skill_name}</span>
            </Link>
            {staffPick && (
              <div style={styles.staffPick}>
                <img
                  alt="Staff Pick Badge"
                  src={StaffPick}
                  className="staffPickIcon"
                />
              </div>
            )}
          </div>
          <div style={styles.rating}>
            <Link
              key={el}
              to={{
                pathname:
                  '/' +
                  skill.group +
                  '/' +
                  skill.skill_tag +
                  '/' +
                  skill.language +
                  '/feedbacks',
                state: {
                  url: this.props.skillUrl,
                  element: el,
                  name: el,
                  modelValue: this.props.modelValue,
                  groupValue: skill.group,
                  languageValue: this.props.languageValue,
                },
              }}
            >
              <Ratings
                rating={average_rating || 0}
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
              <span style={styles.totalRating} title="Total ratings">
                {total_rating || 0}
              </span>
            </Link>
          </div>
        </Card>,
      );
    });
    if (cards.length <= this.state.scrollCards) {
      this.setState({ rightBtnDisplay: 'none' });
    }
    this.setState({
      cards,
    });
  };

  render() {
    let leftFabStyle = styles.leftFab;
    let rightFabStyle = styles.rightFab;
    if (window.innerWidth < 430) {
      leftFabStyle.display = 'none';
      rightFabStyle.display = 'none';
    }

    return (
      <div
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          textAlign: 'justify',
          fontSize: '0.1px',
          width: '100%',
        }}
      >
        <div>
          <div
            id={this.props.scrollId}
            className="scrolling-wrapper"
            style={styles.gridList}
          >
            <FloatingActionButton
              mini={true}
              backgroundColor={'#4285f4'}
              style={{
                ...leftFabStyle,
                display: this.state.leftBtnDisplay,
              }}
              onClick={this.scrollLeft}
            >
              <NavigationChevronLeft />
            </FloatingActionButton>
            {this.state.cards}
            <FloatingActionButton
              mini={true}
              backgroundColor={'#4285f4'}
              style={{
                ...rightFabStyle,
                display: this.state.rightBtnDisplay,
              }}
              onClick={this.scrollRight}
            >
              <NavigationChevronRight />
            </FloatingActionButton>
          </div>
        </div>
      </div>
    );
  }
}

SkillCardScrollList.propTypes = {
  scrollId: PropTypes.string.isRequired,
  skills: PropTypes.array,
  languageValue: PropTypes.array,
  skillUrl: PropTypes.string,
  modelValue: PropTypes.string,
};

export default SkillCardScrollList;
