import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import { Link } from 'react-router-dom';
import { Card } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircleImage from '../CircleImage/CircleImage';
import StaffPick from '../../images/staff_pick.png';

import styles from '../BrowseSkill/SkillStyle';
import { urls } from '../../utils';
class SkillCardGrid extends Component {
  loadSkillCards = () => {
    let cards = [];
    Object.keys(this.props.skills).forEach(el => {
      let skill = this.props.skills[el];
      let skillName,
        examples,
        image,
        staffPick = false;
      let averageRating = 0,
        totalRating = 0;
      if (skill.skillName) {
        skillName = skill.skillName;
        skillName = skillName.charAt(0).toUpperCase() + skillName.slice(1);
      } else {
        skillName = 'Name not available';
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
      if (skill.skillRating) {
        averageRating = parseFloat(skill.skillRating.stars.avgStar);
        totalRating = parseInt(skill.skillRating.stars.totalStar, 10);
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
                skill.skillTag +
                '/' +
                this.props.languageValue,
            }}
          >
            <div style={styles.imageContainer} key={el}>
              {image ? (
                <div style={styles.image}>
                  <img alt={skillName} src={image} style={styles.image} />
                </div>
              ) : (
                <CircleImage name={el} size="48" />
              )}
              {examples ? (
                <div style={styles.example}>&quot;{examples}&quot;</div>
              ) : null}
            </div>
            <div style={styles.name}>
              <span>{skillName}</span>
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
          </Link>
          <div style={styles.rating}>
            <Link
              key={el}
              to={{
                pathname:
                  '/' +
                  skill.group +
                  '/' +
                  skill.skillTag +
                  '/' +
                  this.props.languageValue +
                  '/feedbacks',
              }}
            >
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
            </Link>
          </div>
        </Card>,
      );
    });
    return cards;
  };

  render() {
    return (
      <div
        style={{
          marginTop: '20px',
          marginBottom: '40px',
          textAlign: 'center',
          fontSize: '0.1px',
          width: '100%',
        }}
      >
        <div>
          <div style={styles.gridList}>{this.loadSkillCards()}</div>
        </div>
      </div>
    );
  }
}

SkillCardGrid.propTypes = {
  skills: PropTypes.array,
  languageValue: PropTypes.array,
};

function mapStateToProps(store) {
  return {
    languageValue: store.skills,
    skills: store.skills.listSkills,
  };
}

export default connect(
  mapStateToProps,
  null,
)(SkillCardGrid);
