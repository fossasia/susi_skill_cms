import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircleImage from '../CircleImage/CircleImage';
import styles from './SkillCardStyle';

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
      let skill_name = 'Name not available',
        examples = [],
        image = '',
        description = 'No description available',
        author_name = 'Author',
        average_rating = 0,
        total_rating = 0;
      if (skill.skill_name) {
        skill_name = skill.skill_name;
        skill_name = skill_name.charAt(0).toUpperCase() + skill_name.slice(1);
      }
      if (skill.image) {
        image = `https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/${
          skill.model
        }/${skill.group}/${skill.language}/${skill.image}`;
      }
      if (skill.examples) {
        examples = skill.examples;
        examples = examples.slice(0, 2); // Select max 2 examples
      }
      if (skill.descriptions) {
        description = skill.descriptions;
      }
      if (skill.author) {
        author_name = skill.author;
      }
      if (skill.skill_rating) {
        average_rating = parseFloat(skill.skill_rating.stars.avg_star);
        total_rating = parseInt(skill.skill_rating.stars.total_star, 10);
      }
      cards.push(
        <div style={styles.skillCard} key={el}>
          <div style={styles.imageContainer}>
            {image ? (
              <div style={styles.image}>
                <img alt={skill_name} src={image} style={styles.image} />
              </div>
            ) : (
              <CircleImage name={el} size="218" />
            )}
          </div>
          <div style={styles.content}>
            <div style={styles.header}>
              <div style={styles.title}>
                <Link
                  key={el}
                  to={{
                    pathname: `/${skill.group}/${skill.skill_tag}/${
                      this.props.languageValue
                    }`,
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
              </div>

              <div style={styles.authorName}>
                <span>{author_name}</span>
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
                  </div>
                </div>
                <div style={styles.row}>
                  <div style={styles.descriptionTitle}>Description</div>
                  {description}
                </div>
              </div>
            </div>
          </div>
        </div>,
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
