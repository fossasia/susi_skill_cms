import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircleImage from '../CircleImage/CircleImage';
import styles from './SkillCardStyle';
import urls from '../../Utils/urls';
function createListCard(
  el,
  skillName,
  skillUrl,
  authorName,
  description,
  image,
  language,
  skill,
  examples,
  totalRating,
  averageRating,
) {
  const mobileView = window.innerWidth < 430;
  if (mobileView) {
    return (
      <div style={styles.skillCard} key={el}>
        <div style={styles.imageContainerMobile}>
          {image ? (
            <div style={styles.imageMobile}>
              <img alt={skillName} src={image} style={styles.imageMobile} />
            </div>
          ) : (
            <CircleImage name={skillName} size="96" />
          )}
        </div>
        <div style={styles.content}>
          <div style={styles.header}>
            <div style={styles.title}>
              <Link
                key={el}
                to={{
                  pathname: `/${skill.group}/${skill.skill_tag}/${language}`,
                  state: {
                    url: skillUrl,
                    element: el,
                    name: el,
                    modelValue: skill.model,
                    groupValue: skill.group,
                    languageValue: language,
                  },
                }}
              >
                <span>{skillName}</span>
              </Link>
            </div>
            <div style={styles.authorName}>
              <span>{authorName}</span>
            </div>
            <div style={{ lineHeight: 1.35, fontSize: 14 }}>
              <span>Skills for SUSI</span>
            </div>
            <div style={styles.rating}>
              <Ratings
                style={{ display: 'flex' }}
                rating={averageRating || 0}
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
                {totalRating || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={styles.skillCard} key={el}>
      <div style={styles.imageContainer}>
        {image ? (
          <div style={styles.image}>
            <Link
              key={el}
              to={{
                pathname: `/${skill.group}/${skill.skill_tag}/${language}`,
                state: {
                  url: skillUrl,
                  element: el,
                  name: el,
                  modelValue: skill.model,
                  groupValue: skill.group,
                  languageValue: language,
                },
              }}
            >
              <img alt={skillName} src={image} style={styles.image} />
            </Link>
          </div>
        ) : (
          <CircleImage name={skillName} size="160" />
        )}
      </div>
      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.title}>
            <Link
              key={el}
              to={{
                pathname: `/${skill.group}/${skill.skill_tag}/${language}`,
                state: {
                  url: skillUrl,
                  element: el,
                  name: el,
                  modelValue: skill.model,
                  groupValue: skill.group,
                  languageValue: language,
                },
              }}
            >
              <span>{skillName}</span>
            </Link>
          </div>
          <div style={styles.authorName}>
            <span>{authorName}</span>
          </div>
        </div>
        <div style={styles.details}>
          <div style={styles.exampleSection}>
            {examples.map((eg, index) => {
              return (
                <div key={index} style={styles.example}>
                  &quot;{eg}&quot;
                </div>
              );
            })}
          </div>
          <div style={styles.textData}>
            <div style={styles.row}>
              <div style={styles.rating}>
                <Ratings
                  style={{ display: 'flex' }}
                  rating={averageRating || 0}
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
                  {totalRating || 0}
                </span>
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.descriptionTitle}>Description</div>
              <div style={styles.description}>{description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class SkillCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      skills: this.props.skills,
    };
  }

  componentDidMount() {
    this.loadSkillCards();
  }

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

  loadSkillCards = () => {
    let cards = [];
    Object.keys(this.state.skills).forEach(el => {
      let skill = this.state.skills[el];
      let skillName = 'Name not available',
        examples = [],
        image = '',
        description = 'No description available',
        authorName = 'Author',
        skillUrl = this.props.skillUrl,
        averageRating = 0,
        totalRating = 0;
      if (skill.skill_name) {
        skillName = skill.skill_name;
        skillName = skillName.charAt(0).toUpperCase() + skillName.slice(1);
      }
      if (skill.image) {
        image = `${urls.API_URL}/cms/getImage.png?model=${
          skill.model
        }&language=${skill.language}&group=${skill.group}&image=${skill.image}`;
      }
      if (skill.examples) {
        examples = skill.examples;
        examples = examples.slice(0, 2); // Select max 2 examples
      }
      if (skill.descriptions) {
        description = skill.descriptions;
      }
      if (skill.author) {
        authorName = skill.author;
      }
      if (skill.skill_rating) {
        averageRating = parseFloat(skill.skill_rating.stars.avg_star);
        totalRating = parseInt(skill.skill_rating.stars.total_star, 10);
      }

      let language = this.props.languageValue;
      cards.push(
        createListCard(
          el,
          skillName,
          skillUrl,
          authorName,
          description,
          image,
          language,
          skill,
          examples,
          totalRating,
          averageRating,
        ),
      );
    });
    this.setState({
      cards,
    });
  };

  render() {
    let skillDisplay = '';
    if (this.props.skills && this.props.skills.length) {
      skillDisplay = this.state.cards;
    }

    return <div style={styles.gridList}>{skillDisplay}</div>;
  }
}

SkillCardList.propTypes = {
  skills: PropTypes.array,
  languageValue: PropTypes.array,
  skillUrl: PropTypes.string,
  modelValue: PropTypes.string,
};

export default SkillCardList;
