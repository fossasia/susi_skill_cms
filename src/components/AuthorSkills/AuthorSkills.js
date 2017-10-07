import React, {Component} from 'react';
import PropTypes from 'prop-types';
import github from '../images/github-logo.png';
import ISO6391 from 'iso-639-1';
import Dialog from 'material-ui/Dialog';
import * as $ from 'jquery';
import Img from 'react-image';
import CircleImage from '../CircleImage/CircleImage';
import Close from 'material-ui/svg-icons/navigation/close';
import './AuthorSkills.css';
import urls from '../../Utils/urls';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
let skills = [];
const imageStyle = {
      marginRight: 10,
      position: 'relative',
      height: '40px',
      width: '40px',
      verticalAlign: 'middle',
      border: 0
};
const githubProfile = {
  height: 30,
  width: 30,
  verticalAlign: 'middle',
};

class AuthorSkills extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modelValue: 'general',
            skillURL:null,
            groupValue:'Knowledge',
            languageValue:'en',
            skills: [],
            image: false
        };
    }


    loadSkillCards = (author) => {
      console.log(author);
      let url = urls.API_URL + '/cms/getSkillsByAuthor.json?author=' + author;
          $.ajax({
              url: url,
              dataType: 'jsonp',
              jsonp: 'callback',
              crossDomain: true,
              success: function (data) {
                let skillByAuthor = Object.keys(data);
                skillByAuthor = skillByAuthor.slice(0,skillByAuthor.length-1);
                skills = skillByAuthor.map((skill,index) => {
                  let parse = data[skill].split('/');
                  let name = parse[8].split('.')[0];
                  name = name.charAt(0).toUpperCase() + name.slice(1);
                  if(name.split('_').length > 1){
                    let temp = name.split('_');
                    name = temp[0]+ ' '+ temp[1];
                  }

                  let image = 'https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/general/'+
                    parse[6]+'/'+parse[7]+'/images/'+parse[8].split('.')[0];
                    let image1 = image + '.png';
                    let image2 = image + '.jpg';

                  let skillURL = 'http://skills.susi.ai/' + parse[6] + '/' + parse[8].split('.')[0] + '/' + parse[7];

                  return (
                    <TableRow key={index}>
                      <TableRowColumn>
                        <div>
                          <a
                            href={skillURL} >
                            <Img
                              style={imageStyle}
                              src={[
                                image1,
                                image2
                              ]}
                              unloader={<CircleImage name={name} size='40'/>}
                          />
                        </a>
                          <a
                            href={skillURL}
                            className='effect-underline' >
                          {name}
                        </a>
                        </div>
                      </TableRowColumn>
                      <TableRowColumn>{parse[6]}</TableRowColumn>
                      <TableRowColumn>{ISO6391.getNativeName(parse[7])}</TableRowColumn>
                    </TableRow>
                  )
                });
                this.setState({skills: skills})
              }.bind(this)
          });
    };

    render() {

        const closingStyle ={
            position: 'absolute',
            zIndex: 1200,
            fill: '#444',
            width: '26px',
            height: '26px',
            right: '10px',
            top: '10px',
            cursor:'pointer'
        };
        const headingStyle ={
            fill: '#000',
            width: '100%'
        };
        return (
            <div>
                <Dialog
                    modal={false}
                    open={this.props.open}
                    autoScrollBodyContent={true}
                    contentStyle={{width: '50%',minWidth: '300px'}}
                    onRequestClose={this.props.close} >
                    <div style={headingStyle}>
                        <h3>Skills by {this.props.author} <a href={this.props.authorUrl} ><img alt={'GitHub'} style={githubProfile} src={github}/></a></h3>
                    </div>
                    <div>
                        <Table
                          selectable={false}
                          multiSelectable={false}
                          style={{marginTop: 10}}
                          >
                            <TableHeader
                              displaySelectAll={false}
                              adjustForCheckbox={false}
                              enableSelectAll={false}
                              >
                                <TableRow>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Category</TableHeaderColumn>
                                    <TableHeaderColumn>Language</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                              displayRowCheckbox={false}
                              >
                                {this.state.skills}
                            </TableBody>
                        </Table>
                    </div>
                    <Close style={closingStyle} onTouchTap={this.props.close} />
                    </Dialog>
                </div>
            );
        }
}

AuthorSkills.propTypes = {
  location: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
  author: PropTypes.string,
  authorUrl: PropTypes.string
};

export default AuthorSkills;
