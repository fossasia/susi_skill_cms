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
import { Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import * as $ from 'jquery';
import urls from '../../Utils/urls';

const cookies = new Cookies();

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

  parseDate = dtstr => {
    if (dtstr) {
      // replace anything but numbers by spaces
      dtstr = dtstr.replace(/\D/g, ' ');
      // trim any hanging white space
      dtstr = dtstr.replace(/\s+$/, '');
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
      const convdt = new Date(
        Date.UTC(
          dtcomps[0],
          dtcomps[1],
          dtcomps[2],
          dtcomps[3],
          dtcomps[4],
          dtcomps[5],
        ),
      );
      return convdt.toUTCString();
    }
  };

  loadSkills = () => {
    let url;
    url =
      urls.API_URL +
      '/cms/getProfileDetails.json?access_token=' +
      cookies.get('loggedIn');
    let self = this;
    let ratingsData = [];
    $.ajax({
      url: url,
      jsonpCallback: 'pxcd',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        if (data.rated_skills) {
          for (let i of data.rated_skills) {
            let skill_name = Object.keys(i)[0];
            ratingsData.push({
              skill_name: skill_name,
              skill_star: i[skill_name].stars,
              rating_timestamp: i[skill_name].timestamp,
            });
          }
          self.setState({
            ratingsData,
          });
        }
        self.setState({
          loading: false,
        });
      },
      error: function(err) {
        self.setState({
          loading: false,
          openSnackbar: true,
          msgSnackbar: "Error. Couldn't rating data.",
        });
      },
    });
  };

  render() {
    let ratingsData = this.state.ratingsData;
    return (
      <div>
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
                        {(
                          skill.skill_name.charAt(0).toUpperCase() +
                          skill.skill_name.slice(1)
                        ).replace(/[_-]/g, ' ')}
                      </TableRowColumn>
                      <TableRowColumn style={{ fontSize: '16px' }}>
                        {skill.skill_star}
                      </TableRowColumn>
                      <TableRowColumn>
                        {this.parseDate(skill.rating_timestamp)}
                      </TableRowColumn>
                    </TableRow>
                  );
                })}
                <TableRow />
              </TableBody>
            </Table>
          </div>
        )}
        {ratingsData.length === 0 &&
          !this.state.loading && (
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

export default MyRatings;
