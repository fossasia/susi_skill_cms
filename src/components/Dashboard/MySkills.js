import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Cookies from 'universal-cookie';
import SelectField from 'material-ui/SelectField';
import { Link } from 'react-router-dom';
import Person from 'material-ui/svg-icons/social/person';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import CircleImage from '../CircleImage/CircleImage';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import * as $ from 'jquery';
import Img from 'react-image';
import Add from 'material-ui/svg-icons/content/add';
import { urls, colors } from '../../utils';

const cookies = new Cookies();

const styles = {
  imageStyle: {
    marginRight: 10,
    position: 'relative',
    height: '40px',
    width: '40px',
    verticalAlign: 'middle',
    borderRadius: '50%',
  },
};

class MySkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsData: [],
      loading: true,
      openSnackbar: false,
      showMySkills: true,
      msgSnackbar: '',
      openMenu: false,
      openMenuBottom: false,
    };
  }
  componentDidMount() {
    this.loadSkills();
  }

  loadSkills = () => {
    let url =
      urls.API_URL +
      '/cms/getSkillList.json?applyFilter=true&filter_name=ascending&filter_type=lexicographical';
    let self = this;
    let skillsData = [];
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        for (let i of data.filteredData) {
          skillsData.push({
            skill_name: i.skill_name,
            type: 'public',
            status: 'active',
            ...i,
          });
        }
        self.setState({
          skillsData,
          loading: false,
        });
      },
      error: function(err) {
        self.setState({
          loading: false,
          openSnackbar: false,
          msgSnackbar: "Error. Couldn't fetch skills.",
        });
      },
    });
  };

  handleShowMySkills = (event, isInputChecked) => {
    this.setState({ showMySkills: isInputChecked });
  };

  handleOnRequestChangeBottom = value => {
    this.setState({
      openMenuBottom: value,
    });
  };

  handleOnRequestChange = value => {
    this.setState({
      openMenu: value,
    });
  };
  render() {
    let skillsData = this.state.skillsData.filter(item => {
      if (
        !this.state.showMySkills ||
        item.author_email === cookies.get('emailId')
      ) {
        return item;
      }
      return null;
    });
    return (
      <div>
        <div style={{ textAlign: 'right' }}>
          <IconMenu
            anchorOrigin={{ vertical: 'bottom', horizontal: 'middle' }}
            label="Add new skill"
            animated={false}
            open={this.state.openMenu}
            onRequestChange={this.handleOnRequestChange}
            iconButtonElement={
              <IconButton className="add-button" iconStyle={{ color: '#fff' }}>
                <Add />
              </IconButton>
            }
          >
            <Link to="/skillCreator">
              <MenuItem leftIcon={<Add />} primaryText="Create a Skill" />
            </Link>
            <Link to="/botbuilder">
              <MenuItem leftIcon={<Person />} primaryText="Create Skill bot" />
            </Link>
          </IconMenu>
          <RaisedButton
            backgroundColor={colors.header}
            onClick={() => {
              this.setState({ openMenu: true });
            }}
            label="Create Skill"
            labelStyle={{ verticalAlign: 'middle' }}
            labelColor="#fff"
            icon={<Add />}
          />
        </div>

        {this.state.loading ? (
          <div className="center">
            <CircularProgress size={62} color="#4285f5" />
            <h4>Loading</h4>
          </div>
        ) : (
          <div className="table-wrap">
            <Table className="table-root" selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Image</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Type</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {skillsData.map((skill, index) => {
                  return (
                    <TableRow key={index}>
                      <TableRowColumn>
                        <Link
                          to={{
                            pathname:
                              '/' +
                              skill.group +
                              '/' +
                              skill.skill_tag.toLowerCase().replace(/ /g, '_') +
                              '/' +
                              skill.language,
                          }}
                        >
                          <Img
                            style={styles.imageStyle}
                            src={`${
                              urls.API_URL
                            }/cms/getImage.png?model=general&language=${
                              skill.language
                            }&group=${skill.group}&image=/${skill.image}`}
                            unloader={
                              <CircleImage name={skill.skill_name} size="40" />
                            }
                          />
                        </Link>
                      </TableRowColumn>
                      <TableRowColumn style={{ fontSize: '16px' }}>
                        {skill.skill_name ? (
                          <Link
                            to={{
                              pathname:
                                '/' +
                                skill.group +
                                '/' +
                                skill.skill_tag
                                  .toLowerCase()
                                  .replace(/ /g, '_') +
                                '/' +
                                skill.language,
                            }}
                          >
                            {skill.skill_name}
                          </Link>
                        ) : (
                          'NA'
                        )}
                      </TableRowColumn>
                      <TableRowColumn style={{ fontSize: '16px' }}>
                        {skill.type}
                      </TableRowColumn>
                      <TableRowColumn>
                        <SelectField
                          floatingLabelText="Status"
                          fullWidth={true}
                          value={1}
                        >
                          <MenuItem value={1} primaryText="Enable" />
                        </SelectField>
                      </TableRowColumn>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
        {skillsData.length === 0 &&
          !this.state.loading && (
            <div>
              <div className="center">
                <br />
                <h2>
                  Create your first skill or learn more about{' '}
                  <a
                    href={
                      urls.CMS_GITHUB_URL +
                      '/blob/master/docs/Skill_Tutorial.md'
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    SUSI Skills
                  </a>
                </h2>
                <br />
              </div>
            </div>
          )}

        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.msgSnackbar}
          autoHideDuration={2000}
          onRequestClose={() => {
            this.setState({ openSnackbar: false });
          }}
        />
      </div>
    );
  }
}

export default MySkills;
