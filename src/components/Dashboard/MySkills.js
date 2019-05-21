import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import appActions from '../../redux/actions/app';
import uiActions from '../../redux/actions/ui';
import PropTypes from 'prop-types';
import Person from '@material-ui/icons/Person';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircleImage from '../CircleImage/CircleImage';
import Img from 'react-image';
import Add from '@material-ui/icons/Add';
import { urls } from '../../utils';

const styles = {
  imageStyle: {
    marginRight: 10,
    position: 'relative',
    height: '40px',
    width: '40px',
    verticalAlign: 'middle',
    borderRadius: '50%',
  },
  tableCellStyle: {
    padding: '10px 24px',
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
      anchorEl: null,
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

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleMenuClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  render() {
    const { userSkills } = this.props;
    const { anchorEl, loading } = this.state;
    const open = Boolean(anchorEl);
    const { tableCellStyle } = styles;
    return (
      <div>
        <div style={{ textAlign: 'right', marginRight: '20px' }}>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleMenuClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <MenuList disableListWrap={true}>
              <Link to="/skillCreator">
                <MenuItem onClose={this.handleMenuClose}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText>Create a Skill</ListItemText>
                </MenuItem>
              </Link>
              <Link to="/botbuilder">
                <MenuItem onClose={this.handleMenuClose}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText>Create Skill bot</ListItemText>
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleMenuClick}
          >
            <Add /> Create Skill
          </Button>
        </div>

        {loading ? (
          <div className="center">
            <CircularProgress size={62} color="primary" />
            <h4>Loading</h4>
          </div>
        ) : (
          <div className="table-wrap" style={{ padding: '0px 20px' }}>
            <Table className="table-root">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userSkills.map((skill, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell style={tableCellStyle}>
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
                      </TableCell>
                      <TableCell
                        style={{ ...tableCellStyle, fontSize: '16px' }}
                      >
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
                      </TableCell>
                      <TableCell
                        style={{ ...tableCellStyle, fontSize: '16px' }}
                      >
                        {skill.type}
                      </TableCell>
                      <TableCell style={{ ...tableCellStyle, width: '280px' }}>
                        <FormControl>
                          <Select value={1} style={{ width: '280px' }}>
                            <MenuItem value={1}>Enable</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
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
