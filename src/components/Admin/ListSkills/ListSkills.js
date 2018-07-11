import React from 'react';
import Table from 'antd/lib/table';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import './ListSkills.css';
import urls from '../../../Utils/urls';
import * as $ from 'jquery';

const columns = [
  {
    title: 'Skill Name',
    dataIndex: 'skill_name',
    width: '25%',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: '20%',
  },
  {
    title: 'Author',
    dataIndex: 'author',
    width: '25%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: '20%',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: '10%',
    // eslint-disable-next-line
    render: () => {
      return (
        <span>
          <div style={{ cursor: 'pointer', color: '#49A9EE' }}>Edit</div>
        </span>
      );
    },
  },
];

class ListSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsData: [],
      loading: true,
      openSnackbar: false,
      msgSnackbar: '',
    };
  }

  componentDidMount() {
    this.loadSkills();
  }

  loadSkills = () => {
    let url;
    url =
      urls.API_URL +
      '/cms/getSkillList.json?applyFilter=true&filter_name=ascending&filter_type=lexicographical';
    let self = this;
    let skillsData = [];
    $.ajax({
      url: url,
      jsonpCallback: 'pxcd',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        for (let i of data.filteredData) {
          skillsData.push({
            skill_name: i.skill_name,
            type: 'public',
            status: 'Not Reviewed',
            ...i,
          });
        }
        self.setState({
          skillsData: skillsData,
          loading: false,
        });
      },
      error: function(err) {
        self.setState({
          loading: false,
          openSnackbar: true,
          msgSnackbar: "Error. Couldn't fetch skills.",
        });
      },
    });
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div className="center">
            <CircularProgress size={62} color="#4285f5" />
            <h4>Loading</h4>
          </div>
        ) : (
          <div className="table">
            <Table
              columns={columns}
              rowKey={record => record.registered}
              dataSource={this.state.skillsData}
              loading={this.state.loading}
            />
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

export default ListSkills;
