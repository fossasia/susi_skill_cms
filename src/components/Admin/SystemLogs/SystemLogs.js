import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import urls from '../../../utils/urls';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '../../Commons/Alert';

const menuObj = [
  { value: 10, text: 'Last 10 logs' },
  { value: 20, text: 'Last 20 logs' },
  { value: 50, text: 'Last 50 logs' },
  { value: 100, text: 'Last 100 logs' },
  { value: 200, text: 'Last 200 logs' },
  { value: 500, text: 'Last 500 logs' },
  { value: 1000, text: 'Last 1000 logs' },
];

class SystemLogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: '',
      error: false,
      loading: true,
      currentCount: '1000',
    };
  }

  componentDidMount() {
    this.loadSystemLogs(1000);
  }

  loadSystemLogs = count => {
    const { accessToken } = this.props;
    axios
      .get(
        `${urls.API_URL}/log.txt?access_token=${accessToken}&count=${count}`,
        {
          responseType: 'arraybuffer',
        },
      )
      .then(response => {
        let { data } = response;
        //eslint-disable-next-line
        var buffer = new Buffer(data, 'binary');
        var textdata = buffer.toString(); // for string
        let error = false;
        if (textdata.indexOf('WARN root') !== -1) {
          error = true;
        }
        this.setState({
          error: error,
          logs: textdata,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCountChange = event => {
    const { value } = event.target;
    this.setState({
      currentCount: value,
      loading: true,
    });
    this.loadSystemLogs(value);
  };

  render() {
    const { loading } = this.state;
    let renderMenu = menuObj.map(menu => (
      <MenuItem key={menu.value} value={menu.value}>
        {menu.text}
      </MenuItem>
    ));
    return (
      <div className="tabs">
        <Select
          onChange={this.handleCountChange}
          value={this.state.currentCount}
          style={{
            width: '180px',
            float: 'right',
            margin: '1.5rem 0',
          }}
        >
          {renderMenu}
        </Select>
        <div style={{ marginTop: '4rem' }}>
          {loading ? (
            <div className="center">
              <CircularProgress size={62} color="primary" />
            </div>
          ) : (
            <Alert
              description={this.state.logs}
              type={this.state.error === true ? 'error' : 'success'}
            />
          )}
        </div>
      </div>
    );
  }
}

SystemLogs.propTypes = {
  history: PropTypes.object,
  accessToken: PropTypes.string,
};

function mapStateToProps(store) {
  return {
    accessToken: store.app.accessToken,
  };
}

export default connect(
  mapStateToProps,
  null,
)(SystemLogs);
