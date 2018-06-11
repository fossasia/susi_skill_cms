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

        let ratingMessage = '';

        if(this.props.rating === 0) {
            ratingMessage = 'The skill has not been rated by you';
        }
        else if(this.props.rating === 1) {
            ratingMessage = 'Hated it';
        }
        else if(this.props.rating === 2) {
            ratingMessage = 'Disliked it';
        }
        else if(this.props.rating === 3) {
            ratingMessage = 'It\'s OK';
        }
        else if(this.props.rating === 4) {
            ratingMessage = 'Liked it';
        }
        else if(this.props.rating === 5) {
            ratingMessage = 'Loved it';
        }

        return(
            <Paper className="margin-b-md margin-t-md">
                <h1 className='title'>
                    Ratings
                </h1>
                {
                    cookies.get('loggedIn') ?
                    <div>
                        <div className='subTitle'> Rate your experience with {this.props.skill_name} on SUSI.AI </div>
                        <div className="ratings-section">
                            <div>
                                <Ratings
                                    rating={this.props.avg_rating}
                                    widgetRatedColors="#ffbb28"
                                    widgetHoverColors="#ffbb28"
                                    widgetDimensions="50px"
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
                        <div className='rating-message'>{ratingMessage}</div>
                    </div>
                    :
                    null
                }
                {
                    this.props.total_star ?
                    <div className="ratings-section">
                        <div className="average">
                            <div className="large-text">
                                {this.props.avg_rating || 0}
                            </div>
                            Average Rating
                        </div>
                        <div className="rating-bar-chart">
                            <BarChart
                                layout='vertical'
                                width={400}
                                height={200}
                                margin={{right: 48}}
                                data={this.props.skill_ratings} >
                                <XAxis type="number" hide={true} />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false}/>
                                <Tooltip cursor={false} wrapperStyle={{height: '30px'}} />
                                <Bar name="Skill Rating" background={true} barSize={32} maxBarSize={100} dataKey="value">
                                <LabelList position='insideLeft' offset={305} fill='#666666' />
                                    {
                                        this.props.skill_ratings
                                            .map((entry, index) =>
                                                <Cell key={index} fill={
                                                    ['#81C784', '#AED581', '#FFF176', '#FFB74D', '#E57373'][index % 5]
                                                }/>)
                                    }
                                </Bar>
                            </BarChart>
                        </div>
                        <div className="total-rating">
                            <div className="large-text">
                                {this.props.total_star || 0}
                            </div>
                            Total Ratings
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
    skill_name: PropTypes.string,
    skill_ratings: PropTypes.array,
    rating: PropTypes.number,
    avg_rating: PropTypes.number,
    total_star: PropTypes.number,
    changeRating: PropTypes.func
};

export default SkillRatingCard;
