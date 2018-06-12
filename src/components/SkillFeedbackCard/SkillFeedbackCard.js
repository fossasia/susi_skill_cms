// Packages
import React, { Component } from 'react';
import { Paper } from 'material-ui';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

// Components
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CircleImage from '../CircleImage/CircleImage';

// CSS
import './SkillFeedbackCard.css';

const cookies = new Cookies();

class SkillFeedbackCard extends Component {

    render() {

        let userFeedbackCard = null;
        let emailId = cookies.get('emailId');
        let loggedIn = cookies.get('loggedIn');
        let feedbackCards = this.props.skill_feedback.map((data, index) => {
            if(loggedIn && emailId && data.email === emailId) {
                userFeedbackCard =
                    <div>
                        <ListItem
                            key={index}
                            leftAvatar={<CircleImage name={data.email.toUpperCase()} size='40' />}
                            primaryText={data.email}
                            secondaryText={
                                <p>
                                    {data.feedback}
                                </p>
                            }
                        />
                        <Divider inset={true} />
                    </div>
                return null;
            }
            // eslint-disable-next-line
            else {
                return (
                    <ListItem
                        key={index}
                        leftAvatar={<CircleImage name={data.email.toUpperCase()} size='40' />}
                        primaryText={data.email}
                        secondaryText={
                            <p>
                                {data.feedback}
                            </p>
                        }
                    />
                )
            }
        });

        return(
            <Paper className="margin-b-md margin-t-md">
                <h1 className='title'>
                    Feedback
                </h1>
                {
                    feedbackCards.length > 0 ?

                    <List>
                        {userFeedbackCard}
                        {feedbackCards}
                    </List>

                    :
                    <div className="feedback-default-message">No feedback present for this skill!</div>
                }
            </Paper>
        )
    }
}

SkillFeedbackCard.propTypes = {
    skill_name: PropTypes.string,
    skill_feedback: PropTypes.array
};

export default SkillFeedbackCard;
