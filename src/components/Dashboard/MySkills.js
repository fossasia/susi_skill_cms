import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import appActions from '../../redux/actions/app';
import uiActions from '../../redux/actions/ui';
import PropTypes from 'prop-types';
import Person from 'material-ui/svg-icons/social/person';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import CircleImage from '../CircleImage/CircleImage';
import MenuItem from 'material-ui/MenuItem';
import Img from 'react-image';
import Add from 'material-ui/svg-icons/content/add';
import { urls, colors } from '../../utils';

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
      openMenu: false,
      openMenuBottom: false,
    };
  }
  componentDidMount() {
    this.loadSkills();
  }

  loadSkills = () => {
    const { actions } = this.props;
    let dataObj = {
      filterName: 'ascending',
      filterType: 'lexicographical',
    };
    actions
      .getUserSkills(dataObj)
      .then(() => {
        this.setState({
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
        });
        actions.openSnackBar({
          snackBarMessage: "Error. Couldn't fetch skills.",
          snackBarDuration: 2000,
        });
      });
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
    const { userSkills } = this.props;
    const { openMenu, loading } = this.state;
    return (
      <div>
        <div style={{ textAlign: 'right' }}>
          <IconMenu
            anchorOrigin={{ vertical: 'bottom', horizontal: 'middle' }}
            label="Add new skill"
            animated={false}
            open={openMenu}
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

        {loading ? (
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
                {userSkills.map((skill, index) => {
                  return (
                    <TableRow key={index}>
                      <TableRowColumn>
                        <Link
                          to={{
                            pathname:
                              '/' +
                              skill.group +
                              '/' +
                              skill.skillTag.toLowerCase().replace(/ /g, '_') +
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
                              <CircleImage name={skill.skillName} size="40" />
                            }
                          />
                        </Link>
                      </TableRowColumn>
                      <TableRowColumn style={{ fontSize: '16px' }}>
                        {skill.skillName ? (
                          <Link
                            to={{
                              pathname:
                                '/' +
                                skill.group +
                                '/' +
                                skill.skillTag
                                  .toLowerCase()
                                  .replace(/ /g, '_') +
                                '/' +
                                skill.language,
                            }}
                          >
                            {skill.skillName}
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
        {userSkills.length === 0 &&
          !loading && (
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
      </div>
    );
  }
}

MySkills.propTypes = {
  userSkills: PropTypes.array,
  actions: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...appActions, ...uiActions }, dispatch),
  };
}

function mapStateToProps({ app }) {
  const { userSkills } = app;
  return {
    userSkills,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MySkills);
