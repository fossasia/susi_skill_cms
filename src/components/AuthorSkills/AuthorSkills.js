import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import Close from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/* Utils */
import * as $ from 'jquery';
import CircleImage from '../CircleImage/CircleImage';
import githubLogo from '../images/github-logo.png';
import Img from 'react-image';
import ISO6391 from 'iso-639-1';
import { urls } from '../../utils';

/* CSS */
import './AuthorSkills.css';

const styles = {
  imageStyle: {
    marginRight: 10,
    position: 'relative',
    height: '40px',
    width: '40px',
    verticalAlign: 'middle',
    border: 0,
  },
  githubAvatarStyle: {
    height: 50,
    width: 50,
    verticalAlign: 'middle',
    borderRadius: 100,
    marginLeft: 16,
  },
  closingStyle: {
    position: 'absolute',
    zIndex: 1200,
    fill: '#444',
    width: '26px',
    height: '26px',
    right: '10px',
    top: '10px',
    cursor: 'pointer',
  },
  headingStyle: {
    fill: '#000',
    width: '100%',
    textTransform: 'capitalize',
  },
};

export default class AuthorSkills extends Component {
  static propTypes = {
    location: PropTypes.object,
    open: PropTypes.bool,
    requestClose: PropTypes.func,
    author: PropTypes.string,
    authorUrl: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      modelValue: 'general',
      skillURL: null,
      groupValue: 'Knowledge',
      languageValue: 'en',
      skills: [],
      image: false,
    };
  }

  loadSkillCards = author => {
    let url = `${urls.API_URL}/cms/getSkillsByAuthor.json?author=${author}`;

    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        let skillKeys = Object.keys(data);
        skillKeys = skillKeys.slice(0, skillKeys.length - 1);
        // eslint-disable-next-line
        let skills = skillKeys.map((skillKey, index) => {
          // eslint-disable-next-line
          if (skillKey == index) {
            const dataPoints = data[skillKey].split('/');
            let name = dataPoints[6].split('.')[0];
            name = name.charAt(0).toUpperCase() + name.slice(1);

            if (name.split('_').length > 1) {
              name = name.split('_').join(' ');
            }

            let image = `${
              urls.API_URL
            }/cms/getImage.png?model=general&language=${dataPoints[5]}&group=${
              dataPoints[4]
            }&image=${'/images/' + dataPoints[6].split('.')[0]}`;
            let pngImage = image + '.png';
            let jpgImage = image + '.jpg';

            let skillURL = `${window.location.protocol}//${
              window.location.host
            }/${dataPoints[4]}/${dataPoints[6].split('.')[0]}/${dataPoints[5]}`;

            return (
              <TableRow key={index}>
                <TableRowColumn>
                  <a href={skillURL}>
                    <Img
                      style={styles.imageStyle}
                      src={[pngImage, jpgImage]}
                      unloader={<CircleImage name={name} size="40" />}
                    />
                  </a>
                </TableRowColumn>
                <TableRowColumn>
                  <div>
                    <a href={skillURL} className="effect-underline">
                      {name}
                    </a>
                  </div>
                </TableRowColumn>
                <TableRowColumn>{dataPoints[4]}</TableRowColumn>
                <TableRowColumn>
                  {ISO6391.getNativeName(dataPoints[5])}
                </TableRowColumn>
              </TableRow>
            );
          }
        });
        this.setState({ skills });
      }.bind(this),
      error: function(e) {
        console.log('Error while fetching author skills', e);
      },
    });
  };

  render() {
    let { author, authorUrl, open, requestClose } = this.props;
    const { githubAvatarStyle, closingStyle, headingStyle } = styles;
    let githubAvatarSrc = '';

    if (authorUrl) {
      githubAvatarSrc =
        urls.GITHUB_AVATAR_URL + '/' + authorUrl.split('/')[3] + '?size=50';
    } else {
      githubAvatarSrc = githubLogo;
    }

    return (
      <div>
        <Dialog
          modal={false}
          open={open}
          autoScrollBodyContent={true}
          contentStyle={{ width: '50%', minWidth: '300px' }}
          onRequestClose={requestClose}
        >
          <div style={headingStyle}>
            <h3>
              Skills by {author}{' '}
              <a href={authorUrl}>
                <img
                  alt={'GitHub'}
                  style={githubAvatarStyle}
                  src={githubAvatarSrc}
                />
              </a>
            </h3>
          </div>
          <div>
            <Table
              selectable={false}
              multiSelectable={false}
              style={{ marginTop: 10 }}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn>Image</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Category</TableHeaderColumn>
                  <TableHeaderColumn>Language</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.state.skills}
              </TableBody>
            </Table>
          </div>
          <Close style={closingStyle} onTouchTap={requestClose} />
        </Dialog>
      </div>
    );
  }
}
