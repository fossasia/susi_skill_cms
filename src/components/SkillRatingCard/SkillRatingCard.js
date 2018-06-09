// Packages
import React, { Component } from 'react';
import {
    BarChart,
    Cell,
    LabelList,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';
import { Paper } from 'material-ui';
import Ratings from 'react-ratings-declarative';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

import './SkillRatingCard.css';

const cookies = new Cookies();

class SkillRatingCard extends Component {
	render() {
		return(
            <Paper className="margin-b-md margin-t-md">
                <h1 className='title'>
                    Ratings
                </h1>
                {
                    cookies.get('loggedIn') ?
                    <div>
                        <div className='subTitle'> Rate your experience with {this.name} on SUSI.AI </div>
                        <div className="ratings-section">
                            <div>
                                <Ratings
                                    rating={this.props.avg_rating}
                                    widgetRatedColors="#ffbb28"
                                    widgetHoverColors="#ffbb28"
                                    widgetDimensions="30px"
                                    changeRating={this.props.changeRating}
                                >
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                </Ratings>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
                {
                    this.props.total_star ?
                    <div className="ratings-section">
                        <div className="average">
                            Average Rating
                            <div className="large-text">
                                {this.props.avg_rating || 0}
                            </div>
                        </div>
                        <div className="rating-bar-chart">
                            <BarChart
                                layout='vertical'
                                width={400}
                                height={250}
                                data={this.props.skill_ratings} >
                                <XAxis type="number" padding={{right: 20}} />
                                <YAxis dataKey="name" type="category"/>
                                <Tooltip
                                    wrapperStyle={{height: '60px'}}
                                />
                                <Bar name="Skill Rating" dataKey="value" fill="#8884d8">
                                    <LabelList dataKey="value" position="right" />
                                    {
                                        this.props.skill_ratings
                                            .map((entry, index) =>
                                                <Cell key={index} fill={
                                                    ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF2323'][index % 5]
                                                }/>)
                                    }
                                </Bar>
                            </BarChart>
                        </div>
                        <div className="total-rating">
                            Total Ratings
                            <div className="large-text">
                                {this.props.total_star || 0}
                            </div>
                        </div>
                    </div>
                    :
                    <div className="ratings-default-message">No ratings data available yet, be the first to rate this skill!</div>
                }

            </Paper>
		)
	}
}

SkillRatingCard.propTypes = {
    skill_ratings: PropTypes.array,
    rating: PropTypes.number,
    avg_rating: PropTypes.string,
    total_star: PropTypes.string,
    changeRating: PropTypes.func
};


export default SkillRatingCard;
