// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import $ from 'jquery';

// Components
import AuthorSkills from '../AuthorSkills/AuthorSkills'
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import SkillUsageCard from '../SkillUsageCard/SkillUsageCard';
import SkillRatingCard from '../SkillRatingCard/SkillRatingCard';
import CountryWiseSkillUsageCard from '../CountryWiseSkillUsageCard/CountryWiseSkillUsageCard';
import {
    FloatingActionButton,
    Paper,
} from 'material-ui';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

// Static Assets
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import CircleImage from '../CircleImage/CircleImage';
import EditBtn from 'material-ui/svg-icons/editor/mode-edit';
import VersionBtn from 'material-ui/svg-icons/action/history';
import ReactTooltip from 'react-tooltip';
import colors from '../../Utils/colors';
import urls from '../../Utils/urls';

import './SkillListing.css';

const cookies = new Cookies();

const defaultNullSkillList = ['image', 'author', 'author_url', 'developer_privacy_policy', 'terms_of_use', 'dynamic_content', 'examples'];
let urlCode, name;

class SkillListing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fontSizeCode: 14,
            editorTheme: 'github',
            image: '',
            author: '',
            author_url: '',
            developer_privacy_policy: '',
            terms_of_use: '',
            dynamic_content: '',
            examples: '',
            descriptions: '',
            skill_name: '',
            positive_rating: 0,
            negative_rating: 0,
            last_modified_time: '',
            last_access_time: '',
            showAuthorSkills: false,
            dataReceived: false,
            imgUrl: null,
            commits: [],
            commitsChecked: [],
            avg_rating: 0,
            total_star: 0,
            skill_ratings: [],
            skill_usage: [],
            country_wise_skill_usage: [],
            rating : 0,
            openSnack: false,
            snackMessage: ''
        };

        let clickedSkill = this.props.location.pathname.split('/')[2];
        this.name = clickedSkill;
        this.url = urls.API_URL + '/cms/getSkillList.json?group=Knowledge';
        if (this.url !== undefined) {
            let url = this.url;
            this.name = clickedSkill;
            if (url.indexOf('model') < 0) {
                urlCode = url + '?skill=' + this.name;
            }
            else {
                urlCode = url + '&skill=' + this.name;
            }

            urlCode = urlCode.toString();
            urlCode = urlCode.replace('getSkillList', 'getSkill');
            // console.log(urlCode);
        }
    }


    componentDidMount() {

        if(this.url !== undefined) {

            let baseUrl = urls.API_URL + '/cms/getSkillMetadata.json';
            let userSkillRatingUrl = `${urls.API_URL}/cms/getRatingByUser.json`;
            let skillUsageUrl = `${urls.API_URL}/cms/getSkillUsage.json`;
            let countryWiseSkillUsageUrl =
            	`${urls.API_URL}/cms/getCountryWiseSkillUsage.json`;
            let url = this.url;

            let modelValue = 'general';
            this.groupValue = this.props.location.pathname.split('/')[1];
            this.languageValue = this.props.location.pathname.split('/')[3];
            url = baseUrl + '?model=' + modelValue + '&group=' + this.groupValue + '&language=' + this.languageValue + '&skill=' + this.name;
            userSkillRatingUrl = userSkillRatingUrl + '?model=' + modelValue + '&group=' + this.groupValue + '&language=' + this.languageValue + '&skill=' + this.name + '&access_token='+cookies.get('loggedIn');
            skillUsageUrl = skillUsageUrl + '?model=' + modelValue + '&group=' + this.groupValue + '&language=' + this.languageValue + '&skill=' + this.name;
            countryWiseSkillUsageUrl = countryWiseSkillUsageUrl + '?model=' + modelValue + '&group=' + this.groupValue + '&language=' + this.languageValue + '&skill=' + this.name;
            // console.log('Url:' + url);
            let self = this;
            $.ajax({
                url: url,
                jsonpCallback: 'pc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    self.updateData(data.skill_metadata)
                }
            });
            // Fetch user ratings for the visited skill
            $.ajax({
                url: userSkillRatingUrl,
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    if(data.ratings) {
                        self.setState({
                            rating: parseInt(data.ratings.stars, 10)
                        });
                    }
                },
                error: function(e) {
                    console.log(e);
                }
            });
            // Fetch skill usage of the visited skill
            $.ajax({
                url: skillUsageUrl,
                dataType: 'jsonp',
                crossDomain: true,
                jsonp: 'callback',
                success: function (data) {
                    self.saveSkillUsage(data.skill_usage)
                },
                error: function(e) {
                    self.saveSkillUsage()
                }
            });
            // Fetch country wise skill usage of the visited skill
            $.ajax({
                url: countryWiseSkillUsageUrl,
                dataType: 'json',
                crossDomain: true,
                success: function (data) {
                    self.saveCountryWiseSkillUsage(data.skill_usage)
                },
                error: function(e) {
                    self.saveCountryWiseSkillUsage()
                }
            });
        }
    };

    saveSkillRatings = (skill_ratings) => {
        // Added 10 as radix to remove warnings
        const ratings_data = [
            {name: '5.0 ⭐', value: parseInt(skill_ratings.five_star, 10) || 0},
            {name: '4.0 ⭐', value: parseInt(skill_ratings.four_star, 10) || 0},
            {name: '3.0 ⭐', value: parseInt(skill_ratings.three_star, 10) || 0},
            {name: '2.0 ⭐', value: parseInt(skill_ratings.two_star, 10) || 0},
            {name: '1.0 ⭐', value: parseInt(skill_ratings.one_star, 10) || 0}
        ];

        let avg_rating = parseFloat(skill_ratings.avg_star);
        this.setState({
            skill_ratings: ratings_data,
            avg_rating: parseFloat(avg_rating.toFixed(2)),
            total_star: parseInt(skill_ratings.total_star, 10)
        });
    }

    saveSkillUsage = (skill_usage = []) => {
        // Add sample data to test
        const data = [
              {date: '2018-06-05', count: 7},
              {date: '2018-06-06', count: 2},
              {date: '2018-06-07', count: 2},
              {date: '2018-06-08', count: 2},
              {date: '2018-06-09', count: 6},
              {date: '2018-06-10', count: 2},
              {date: '2018-06-11', count: 2},
        ];
        this.setState({
            skill_usage: data
        })
    }

    saveCountryWiseSkillUsage = (country_wise_skill_usage = []) => {
        // Add sample data to test
        let data=country_wise_skill_usage
        .map(country => [country.country_code, Number(country.count)]);

        this.setState({
            country_wise_skill_usage: data
        })
    }

    updateData = (skillData) => {
        this.saveSkillRatings(skillData.skill_rating.stars)
        let imgUrl = `https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/general/${this.groupValue}/${this.languageValue}/${skillData.image}`;
        if (!skillData.image) {
            imgUrl = 'https://pbs.twimg.com/profile_images/904617517489979392/6Hff65Th.jpg';
        }
        this.setState({
            imgUrl
        });

        defaultNullSkillList.forEach((data) => {
            this.setState({
                [data]: skillData[data]
            })
        });

        let descriptions = skillData.descriptions === null ? 'No Description Provided' : skillData.descriptions;
        this.setState({
            descriptions
        });

        let skill_name = skillData.skill_name === null ? 'No Name Given' : skillData.skill_name;
        this.setState({
            skill_name
        });
        name = skill_name;
        this.setState({
            last_modified_time: skillData.lastModifiedTime,
            last_access_time: skillData.lastAccessTime
        })
        this.setState({
            dataReceived: true
        });
    };


    changeRating = (newRating) => {

        let baseUrl = urls.API_URL + '/cms/fiveStarRateSkill.json';
        let modelValue = 'general';
        this.groupValue = this.props.location.pathname.split('/')[1];
        this.languageValue = this.props.location.pathname.split('/')[3];
        let changeRatingUrl = baseUrl + '?model=' + modelValue + '&group=' + this.groupValue + '&language=' + this.languageValue + '&skill=' + this.name + '&stars=' + newRating + '&access_token='+cookies.get('loggedIn');
        // console.log('Url:' + url);
        let self = this;
        $.ajax({
            url: changeRatingUrl,
            jsonpCallback: 'pc',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                self.saveSkillRatings(data.ratings);
                self.setState({
                    openSnack: true,
                    snackMessage: 'The skill was successfully rated!'
                });
            },
            error: function(e) {
                console.log(e);
            }
        });

         this.setState({
            rating: parseInt(newRating,10)
        });
    };

    handleSnackRequestClose = () => {
        this.setState({
            openSnack: false,
        });
    };

    openAuthorSkills = () => {
      if(this.author){
        this.author.loadSkillCards(this.state.author);
        this.setState({ showAuthorSkills: true });
      }
    };

    closeAuthorSkills = () => {
        this.setState({ showAuthorSkills: false });
    };

    parseDate = dtstr => {
        if (dtstr) {
            // replace anything but numbers by spaces
            dtstr = dtstr.replace(/\D/g,' ');
            // trim any hanging white space
            dtstr = dtstr.replace(/\s+$/,'');
            // split on space
            var dtcomps = dtstr.split(' ');
            // not all ISO 8601 dates can convert, as is
            // unless month and date specified, invalid
            if (dtcomps.length < 3) {
                return 'Invalid date';
            }
            // if time not provided, set to zero
            if (dtcomps.length < 4) {
                dtcomps[3] = 0;
                dtcomps[4] = 0;
                dtcomps[5] = 0;
            }
            // modify month between 1 based ISO 8601 and zero based Date
            dtcomps[1]--;
            const convdt = new
            Date(Date.UTC(dtcomps[0],dtcomps[1],dtcomps[2],
                dtcomps[3],dtcomps[4],dtcomps[5]));
            return convdt.toUTCString();
        }
    }

    render() {

        const authorStyle = {
            cursor: 'pointer'
        };

        const styles = {
            home: {
                width: '100%',
                fontSize: '14px'
            },
            right: {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                padding: '10px',
            },
            paper_full_width: {
                width: '100%',
                marginBottom: 10,
                display: 'inline-block',
            }
        };
        let renderElement = null;
        let oldGroupValue = this.props.location.pathname.split('/')[1];
        let oldLanguageValue = this.props.location.pathname.split('/')[3];
        let oldImageValue = this.state.imgUrl;
        let imageValue = this.state.image;
        if (!this.state.dataReceived) {
            renderElement = <div>
                    <StaticAppBar
                    {...this.props} />
                    <h1 className='skill_loading_container'>
                        <div className='center'>
                            <CircularProgress size={62} color='#4285f5'/>
                            <h4>Loading</h4>
                        </div>
                    </h1>
                </div>
        }
        else {
            renderElement = <div>
                <StaticAppBar {...this.props} />
                <div className='skill_listing_container' style={styles.home}>
                    <div className='avatar'>
                        {this.state.image == null ?
                            <CircleImage name={this.state.skill_name.toUpperCase()} size='250' /> :
                            <img className='avatar-img' alt='Thumbnail' src={this.state.imgUrl} />
                        }
                    </div>
                    <div className='linkButtons'>
                        <Link to={{
                            pathname: '/'+this.groupValue+ '/'+this.name+'/edit/'+this.languageValue,
                            state: {
                                url: urlCode,
                                name: name,
                                oldExpertValue: this.name,
                                oldGroupValue: oldGroupValue,
                                oldLanguageValue: oldLanguageValue,
                                oldImageUrl: oldImageValue,
                                oldImageValue: imageValue }
                        }}>

                            <FloatingActionButton data-tip='Edit Skill' backgroundColor={colors.header} >
                                <EditBtn />
                            </FloatingActionButton>
                            <ReactTooltip effect='solid' place='bottom' />
                        </Link>
                        <Link to={{ pathname: '/'+this.groupValue+ '/'+this.name+'/versions/'+this.languageValue }}>
                            <div className='skillVersionBtn'>
                                <FloatingActionButton data-tip='Skill Versions'  backgroundColor={colors.header} >
                                    <VersionBtn />
                                </FloatingActionButton>
                                <ReactTooltip  effect='solid' place='bottom'/>
                            </div>
                        </Link>
                    </div>
                    <div className='meta'>
                        <h1 className='name'>
                            {
                                name && name.split(' ').map((data) => {
                                  var s =  data.charAt(0).toUpperCase()+
                                          data.substring(1);
                                  return(s);
                                }).join(' ')}
                        </h1>
                        <h4>
                            author: <span style={authorStyle}
                                      onClick={this.openAuthorSkills}>
                                      {this.state.author}
                                    </span>
                        </h4>
                        <div className='avatar-meta margin-b-md'>
                            <div className='examples'>
                                {typeof this.state.examples === 'undefined' ||
                                this.state.examples === null ||
                                typeof this.state.examples[Object.keys(this.state.examples)[0]] === 'undefined' ? '' :
                                    this.state.examples.map((data,index) => {
                                        return (
                                            <Paper
                                                key={index}
                                                className='exampleTile'
                                                style={{ backgroundColor: '#f5f5f5' }}
                                                zDepth={1}
                                            >
                                                {data}
                                            </Paper>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <Paper className="margin-b-md margin-t-md">
                        <div className='desc margin-b-md margin-t-md'>
                            <h1 className='title'>
                                Description
                            </h1>
                            <p className="card-content">{this.state.descriptions}</p>
                        </div>
                    </Paper>
                    <Paper className="margin-b-md margin-t-md">
                        <div className='margin-b-md margin-t-md skill'>
                            <h1 className='title'>
                                Skill Details
                            </h1>
                            <div className='card-content'>
                                <ul>
                                    {this.state.dynamic_content ?
                                        <li>The Skill Contains content Dynamic Content
                                            that is updated real-time based on inputs
                                            from the User.</li> :
                                        <li>Skill details are not available yet.</li>}

                                    {this.state.terms_of_use == null ? '' :
                                      (<li><a href={this.state.terms_of_use}
                                              target='_blank'
                                              rel='noopener noreferrer'>Term & Condition</a></li>)}

                                    {this.state.terms_of_use == null ? '' :
                                      (<li><a href={this.state.developer_privacy_policy}
                                              target='_blank'
                                              rel='noopener noreferrer'>Developer Privacy Policy</a></li>)}
                                </ul>
                            </div>
                            <div className='card-content'>
                                Last accessed at -
                                    {` ${this.parseDate(this.state.last_access_time)}`}
                            </div>
                            <div className='card-content'>
                                Last modified at -
                                    {` ${this.parseDate(this.state.last_modified_time)}`}
                            </div>
                        </div>
                    </Paper>
                    <SkillRatingCard
                        skill_name={this.state.skill_name}
                        skill_ratings={this.state.skill_ratings}
                        rating={this.state.rating}
                        avg_rating={this.state.avg_rating}
                        total_star={this.state.total_star}
                        changeRating={this.changeRating}
                    />
                   <SkillUsageCard skill_usage={this.state.skill_usage} />
                   <CountryWiseSkillUsageCard
						country_wise_skill_usage={this.state.country_wise_skill_usage} />
                </div>
            </div>
        }

        return (
            <div>
                <div>{renderElement}</div>
                <div>
                    <AuthorSkills
                        ref={(c) => { this.author = c; }}
                        open={this.state.showAuthorSkills}
                        close={this.closeAuthorSkills}
                        author={this.state.author}
                        authorUrl={this.state.author_url}
                    />
                </div>
                <Snackbar
                  open={this.state.openSnack}
                  message={this.state.snackMessage}
                  autoHideDuration={4000}
                  onRequestClose={this.handleSnackRequestClose}
                />
            </div>
        );
    }
}

SkillListing.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default SkillListing;
