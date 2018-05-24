import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import AuthorSkills from '../AuthorSkills/AuthorSkills'
import {BarChart, Cell, LabelList, Bar, XAxis, YAxis, Tooltip} from 'recharts';
import Ratings from 'react-ratings-declarative';
import Cookies from 'universal-cookie';
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
import $ from 'jquery';
import Divider from 'material-ui/Divider';
import './SkillListing.css';
import {
    FloatingActionButton,
    Paper,
} from 'material-ui';
import CircleImage from '../CircleImage/CircleImage';
import EditBtn from 'material-ui/svg-icons/editor/mode-edit';
import VersionBtn from 'material-ui/svg-icons/action/history';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import ReactTooltip from 'react-tooltip';
import colors from '../../Utils/colors';
import urls from '../../Utils/urls';

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
            avg_rating: '',
            skill_ratings: [],
            rating : 0
        };

        let clickedSkill = this.props.location.pathname.split('/')[2];
        this.name = clickedSkill;
        this.url = urls.API_URL + '/cms/getSkillList.json';
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
            let skillRatingUrl = `${urls.API_URL}/cms/getSkillRating.json`
            let url = this.url;

            let modelValue = 'general';
            this.groupValue = this.props.location.pathname.split('/')[1];
            this.languageValue = this.props.location.pathname.split('/')[3];
            url = baseUrl + '?model=' + modelValue + '&group=' + this.groupValue + '&language=' + this.languageValue + '&skill=' + this.name;
            skillRatingUrl = skillRatingUrl + '?model=' + modelValue + '&group=' + this.groupValue + '&language=' + this.languageValue + '&skill=' + this.name;
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
            // Fetch ratings for the visited skill
            $.ajax({
                url: skillRatingUrl,
                jsonpCallback: 'pc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    self.saveSkillRatings(data.skill_rating)
                },
                error: function(e) {
                    console.log(e);
                }
            });
        }
        if(this.props.location.state!==undefined){
            if (this.props.location.state.from_upload !== undefined) {
                let baseUrl = urls.API_URL + '/cms/getSkillMetadata.json';
                let url;

                let modelValue = 'general';
                let groupValue = this.props.location.state.groupValue;
                let languageValue = this.props.location.state.languageValue;
                let expertValue = this.props.location.state.expertValue;

                url = baseUrl +
                      '?model=' + modelValue +
                      '&group=' + groupValue +
                      '&language=' + languageValue +
                      '&skill=' + expertValue;

                // console.log('Url meta:' + url);

                urlCode = url.toString();
                urlCode = url.replace('getSkillMetadata', 'getSkill');
                // console.log(url);
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
            }
        }

    };

    saveSkillRatings = (skill_ratings) => {
        // Sample data
        const ratings_data = [{name: '5 ⭐', value: skill_ratings.five_star || 0},
              {name: '4 ⭐', value: skill_ratings.four_star || 0},
              {name: '3 ⭐', value: skill_ratings.three_star || 0},
              {name: '2 ⭐', value: skill_ratings.two_star || 0},
              {name: '1 ⭐', value: skill_ratings.one_star || 0}];
        this.setState({
            skill_ratings: ratings_data,
            avg_rating: skill_ratings.avg_star
        })
    }

    updateData = (skillData) => {
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
            last_modified_time: skillData['lastModifiedTime: '],
            last_access_time: skillData['lastAccessTime: ']
        })
        this.setState({
            dataReceived: true
        });
    };


    changeRating = (newRating) => {

        let baseUrl = urls.API_URL + 'cms/fiveStarRateSkill.json';
        let skillRatingUrl = `${urls.API_URL}/cms/getSkillRating.json`

        let modelValue = 'general';
        this.groupValue = this.props.location.pathname.split('/')[1];
        this.languageValue = this.props.location.pathname.split('/')[3];
        skillRatingUrl = skillRatingUrl + '?model=' + modelValue + '&group=' + this.groupValue + '&language=' + this.languageValue + '&skill=' + this.name;
        let changeRatingUrl = baseUrl + '?model=' + modelValue + '&group=' + this.groupValue + '&language=' + this.languageValue + '&skill=' + this.name + '&rating=' + newRating;
        // console.log('Url:' + url);
        let self = this;
        $.ajax({
            url: changeRatingUrl,
            jsonpCallback: 'pc',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                console.log('Ratings accepted');
            },
            error: function(e) {
                console.log(e);
            }
        });

         this.setState({
            rating: newRating
        });
        // Fetch ratings for the visited skill
        $.ajax({
            url: skillRatingUrl,
            jsonpCallback: 'pc',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                self.saveSkillRatings(data.skill_rating)
            },
            error: function(e) {
                console.log(e);
            }
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
        Date(Date.UTC(dtcomps[0],dtcomps[1],dtcomps[2],dtcomps[3],dtcomps[4],dtcomps[5]));
        return convdt.toUTCString();
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
            renderElement = <div><StaticAppBar {...this.props} /><h1 className='skill_loading_container'>Loading...</h1></div>
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
                            state: { url: urlCode, name:name,
                                oldExpertValue:this.name,
                                oldGroupValue:oldGroupValue,
                                oldLanguageValue:oldLanguageValue,
                                oldImageUrl:oldImageValue, oldImageValue:imageValue }
                        }}>

                            <FloatingActionButton data-tip='Edit Skill' backgroundColor={colors.header} >
                                <EditBtn />
                            </FloatingActionButton>
                            <ReactTooltip effect='solid' place='bottom' />

                        </Link>
                        <Link to={{
                            pathname: '/'+this.groupValue+ '/'+this.name+'/versions/'+this.languageValue,
                        }}>
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
                    <div className='desc margin-b-md margin-t-md'>
                        <h1 className='title'>
                            Description
                        </h1>
                        <p>{this.state.descriptions}</p>
                    </div>
                    <div className='margin-b-md margin-t-md skill'>
                        <h1 className='title'>
                            Skill Details
                        </h1>
                        <div>
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
                        <div>
                            Last accessed at -
                                {` ${this.parseDate(this.state.last_access_time)}`}
                        </div>
                        <div>
                            Last modified at -
                                {` ${this.parseDate(this.state.last_modified_time)}`}
                        </div>
                    </div>

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
                                            rating={this.state.rating}
                                            widgetRatedColors="#ffbb28"
                                            widgetHoverColors="#ffbb28"
                                            widgetDimensions="30px"
                                            changeRating={this.changeRating}
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
                        <div className="ratings-section">
                            <div className="average">
                                Average Rating
                                <div className="large-text">
                                    {this.state.avg_star ? this.state.avg_star : 0}
                                </div>
                            </div>
                            <div className="rating-bar-chart">
                                <BarChart layout='vertical' width={400} height={250} data={this.state.skill_ratings}>
                                    <XAxis type="number" padding={{right: 20}} />
                                    <YAxis dataKey="name" type="category"/>
                                    <Tooltip
                                        wrapperStyle={{height: '60px'}}
                                    />
                                    <Bar name="Skill Rating" dataKey="value" fill="#8884d8">
                                        <LabelList dataKey="value" position="right" />
                                        {
                                            this.state.skill_ratings
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
                                    { this.state.skill_ratings.total_star || 0 }
                                </div>
                            </div>
                        </div>
                    </Paper>
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
            </div>
        );
    }
}

SkillListing.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default SkillListing;
