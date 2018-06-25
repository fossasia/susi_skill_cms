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
      let skill_name, examples, image; // , description;
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
      // if (skill.descriptions) {
      //   if (skill.descriptions.length > 105) {
      //     description = skill.descriptions.substring(0, 104) + '...';
      //   } else {
      //     description = skill.descriptions;
      //   }
      // } else {
      //   description = 'No description available';
      // }
      if (skill.skill_rating) {
        average_rating = parseFloat(skill.skill_rating.stars.avg_star);
        total_rating = parseInt(skill.skill_rating.stars.total_star, 10);
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
            <div style={styles.imageContainer} key={el}>
              {image ? (
                <div style={styles.image}>
                  <img alt={skill_name} src={image} style={styles.image} />
                </div>
              ) : (
                <CircleImage name={el} size="48" />
              )}
              <div style={styles.example}>&quot;{examples}&quot;</div>
            </div>
            <div style={styles.name}>
              <span>{skill_name}</span>
            </div>
          </Link>
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
        </Card>,
      );
    });
    this.setState({
      cards,
    });
  };

  render() {
    let skillDisplay = '';
    if (this.props.skills.length) {
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
        <div>
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
