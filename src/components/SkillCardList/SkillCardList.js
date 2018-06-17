import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import { Link } from 'react-router-dom';
import { Card } from 'material-ui/Card';
import PropTypes from 'prop-types';
import CircleImage from '../CircleImage/CircleImage';

import styles from '../BrowseSkill/SkillStyle';

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
      let skill_name, examples, image, description;
      let average_rating = 0,
        total_rating = 0;
      if (skill.skill_name) {
        skill_name = skill.skill_name;
        skill_name = skill_name.charAt(0).toUpperCase() + skill_name.slice(1);
      } else {
        skill_name = 'Name not available';
      }
      if (skill.image) {
        image =
          'https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/' +
          skill.model +
          '/' +
          skill.group +
          '/' +
          skill.language +
          '/' +
          skill.image;
      } else {
        image = '';
      }
      if (skill.examples) {
        examples = skill.examples;
        examples = examples[0];
      } else {
        examples = null;
      }
      if (skill.descriptions) {
        if (skill.descriptions.length > 105) {
          description = skill.descriptions.substring(0, 104) + '...';
        } else {
          description = skill.descriptions;
        }
      } else {
        description = 'No description available';
      }
      if (skill.skill_rating) {
        average_rating = parseFloat(skill.skill_rating.stars.avg_star);
        total_rating = parseInt(skill.skill_rating.stars.total_star, 10);
      }
      cards.push(
        <Card style={styles.row} key={el}>
          <Link
            key={el}
            to={{
              pathname:
                '/' +
                skill.group +
                '/' +
                skill_name.toLowerCase().replace(/ /g, '_') +
                '/' +
                this.props.languageValue,
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
            <div style={styles.right} key={el}>
              {image ? (
                <div style={styles.imageContainer}>
                  <img alt={skill_name} src={image} style={styles.image} />
                </div>
              ) : (
                <CircleImage name={el} size="48" />
              )}
              <div style={styles.titleStyle}>&quot;{examples}&quot;</div>
            </div>
            <div style={styles.details}>
              <h3 style={styles.name}>{skill_name}</h3>
              <p style={styles.description}>{description}</p>
            </div>
          </Link>
          <div style={styles.rating}>
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
          </div>
        </Card>,
      );
    });
    this.setState({
      cards,
    });
  };

  render() {
    let skillDisplay;
    if (!this.props.skills.length) {
      skillDisplay = (
        <div style={{ fontSize: 30 }}>
          No Skills found. Be the first one to
          <Link to="/skillCreator"> create</Link> a skill in this category
        </div>
      );
    } else {
      skillDisplay = this.state.cards;
    }
    return (
      <div
        style={{
          marginTop: '20px',
          marginBottom: '40px',
          textAlign: 'justify',
          fontSize: '0.1px',
          width: '100%',
        }}
      >
        <div className="row" style={styles.scroll}>
          <div style={styles.gridList}>{skillDisplay}</div>
        </div>
      </div>
    );
  }
}

SkillCardList.propTypes = {
  skills: PropTypes.array,
  languageValue: PropTypes.string,
  skillUrl: PropTypes.string,
  modelValue: PropTypes.string,
};

export default SkillCardList;
