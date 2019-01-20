import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import { fetchUserRatings } from '../../api';
import { parseDate } from '../../utils';

class MyRatings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingsData: [],
      loading: true,
      openSnackbar: false,
      showMySkills: true,
      msgSnackbar: '',
    };
  }
  componentDidMount() {
    this.loadSkills();
  }

  loadSkills = () => {
    let ratingsData = [];
    fetchUserRatings()
      .then(payload => {
        if (payload.ratedSkills) {
          for (let i of payload.ratedSkills) {
            let skillName = Object.keys(i)[0];
            ratingsData.push({
              skillName: skillName,
              group: i[skillName].group,
              language: i[skillName].language,
              skillStar: i[skillName].stars,
              ratingTimestamp: i[skillName].timestamp,
            });
          }
          this.setState({
            ratingsData,
          });
        }
        this.setState({
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          openSnackbar: true,
          msgSnackbar: "Error. Couldn't rating data.",
        });
      });
  };

  render() {
    let { ratingsData, loading, openSnackbar, msgSnackbar } = this.state;
    return (
      <div>
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
                  <TableHeaderColumn>Skill Name</TableHeaderColumn>
                  <TableHeaderColumn>Rating</TableHeaderColumn>
                  <TableHeaderColumn>Timestamp</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {ratingsData.map((skill, index) => {
                  return (
                    <TableRow key={index}>
                      <TableRowColumn style={{ fontSize: '16px' }}>
                        <Link
                          to={{
                            pathname:
                              '/' +
                              skill.group +
                              '/' +
                              skill.skillName.toLowerCase().replace(/ /g, '_') +
                              '/' +
                              skill.language,
                          }}
                        >
                          {(
                            skill.skillName.charAt(0).toUpperCase() +
                            skill.skillName.slice(1)
                          ).replace(/[_-]/g, ' ')}
                        </Link>
                      </TableRowColumn>
                      <TableRowColumn style={{ fontSize: '16px' }}>
                        {skill.skillStar}
                      </TableRowColumn>
                      <TableRowColumn>
                        {parseDate(skill.ratingTimestamp)}
                      </TableRowColumn>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
        {ratingsData.length === 0 &&
          !loading && (
            <div>
              <div className="center">
                <br />
                <h2>
                  You have not rated any skill, go to{' '}
                  <Link to="/">SUSI Skills Explorer</Link> and rate.
                </h2>
                <br />
              </div>
            </div>
          )}

        <Snackbar
          open={openSnackbar}
          message={msgSnackbar}
          autoHideDuration={2000}
          onRequestClose={() => {
            this.setState({ openSnackbar: false });
          }}
        />
      </div>
    );
  }
}

export default MyRatings;
