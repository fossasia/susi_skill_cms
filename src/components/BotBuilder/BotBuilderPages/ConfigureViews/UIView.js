import React, { Component } from 'react';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uiActions from '../../../../redux/actions/ui';
import Checkbox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';

const EditableContext = React.createElement();
// eslint-disable-next-line
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class UIView extends Component {
  constructor(props) {
    super(props);
    let code = '';
    if (this.props.configure) {
      code = this.props.configure.code;
    }
    this.columns = [
      {
        title: 'Website',
        dataIndex: 'name',
        width: '30%',
        editable: true,
      },
      {
        title: 'Date Added',
        dataIndex: 'date',
        width: '55%',
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return <a onClick={() => this.handleDelete(record.key)}>Delete</a>;
        },
      },
    ];
    this.state = {
      dataSource: [],
      websiteName: '',
      count: 0,
      code,
      myDevices: false, // use chatbot in your devices
      publicDevices: false, // allow chatbot to be used in other people's devices
      includeSusiSkills: true,
      limitSites: false,
    };
    this.dataSource = [];
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState(
      { dataSource: dataSource.filter(item => item.key !== key) },
      () => this.generateCode(),
    );
  };

  handleAdd = () => {
    const { actions } = this.props;
    const { count, dataSource } = this.state;
    let date = new Date();
    let name = this.state.websiteName;
    if (name !== '' && this.checkValidUrl(name)) {
      const newData = {
        key: count,
        name: name,
        date: date.toString(),
      };
      this.setState(
        {
          dataSource: [...dataSource, newData],
          count: count + 1,
          websiteName: '',
        },
        () => this.generateCode(),
      );
    } else {
      actions.openSnackBar({
        snackBarMessage: 'Please enter valid domain name of the website.',
        snackBarDuration: 2000,
      });
    }
  };

  generateCode = () => {
    let code = this.state.code;
    let data = this.state.dataSource;
    let websites = '';
    data.map(dataItem => {
      if (dataItem.name !== '') {
        websites += dataItem.name.trim();
        if (dataItem.key < data.length - 1) {
          websites += ', ';
        }
      }
      return null;
    });
    code = code.replace(
      /^::allowed_sites\s(.*)$/m,
      `::allowed_sites ${websites}`,
    );
    this.setState(
      {
        code,
      },
      () => this.sendInfoToProps(),
    );
  };

  handleAddFromCode = (websiteName, websiteCount) => {
    let date = new Date();
    const newData = {
      key: websiteCount,
      name: websiteName,
      date: date.toString(),
    };
    if (newData.name !== '') {
      this.dataSource = [...this.dataSource, newData];
    }
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  componentDidMount = () => {
    this.generateUIData();
  };

  generateUIData = () => {
    const enableOnOwnSitesOnly = this.state.code.match(
      /^::allow_bot_only_on_own_sites\s(.*)$/m,
    );
    if (enableOnOwnSitesOnly) {
      let limitSites = false;
      if (enableOnOwnSitesOnly[1] === 'yes') {
        limitSites = true;
      }
      this.setState({
        limitSites,
      });
    }

    if (enableOnOwnSitesOnly[1] === 'yes') {
      const allowedSites = this.state.code.match(/^::allowed_sites\s(.*)$/m);
      const sites = allowedSites[1].split(',');
      for (let i = 0; i < sites.length; i++) {
        if (this.checkValidUrl(sites[i])) {
          this.handleAddFromCode(sites[i], i);
        } else {
          let code = this.state.code;
          code = code.replace(sites[i], '');
          this.setState({ code }, () => this.sendInfoToProps());
        }
      }
      let data = this.dataSource;
      this.setState({
        dataSource: data,
        count: sites.length,
      });
    }

    const enableDefaultSkillsMatch = this.state.code.match(
      /^::enable_default_skills\s(.*)$/m,
    );
    if (enableDefaultSkillsMatch) {
      let includeSusiSkills = false;
      if (enableDefaultSkillsMatch[1] === 'yes') {
        includeSusiSkills = true;
      }
      this.setState({
        includeSusiSkills,
      });
    }

    const enableOnDeviceMatch = this.state.code.match(
      /^::enable_bot_in_my_devices\s(.*)$/m,
    );
    if (enableOnDeviceMatch) {
      let myDevices = false;
      if (enableOnDeviceMatch[1] === 'yes') {
        myDevices = true;
      }
      this.setState({
        myDevices,
      });
    }

    const enableOtherUserDeviceMatch = this.state.code.match(
      /^::enable_bot_for_other_users\s(.*)$/m,
    );
    if (enableOtherUserDeviceMatch) {
      let publicDevices = false;
      if (enableOtherUserDeviceMatch[1] === 'yes') {
        publicDevices = true;
      }
      this.setState({
        publicDevices,
      });
    }
  };

  handleChangeWebsiteName = event => {
    this.setState({
      websiteName: event.target.value,
    });
  };

  handleOpenLastActiveInfo = () => {
    this.setState({ lastActiveInfo: true });
  };

  handleCloseLastActiveInfo = () => {
    this.setState({ lastActiveInfo: false });
  };

  handleChangeIncludeSusiSkills = () => {
    let value = !this.state.includeSusiSkills;
    let code = this.state.code;
    code = code.replace(
      /^::enable_default_skills\s(.*)$/m,
      `::enable_default_skills ${value ? 'yes' : 'no'}`,
    );
    this.setState(
      {
        includeSusiSkills: value,
        code,
      },
      () => this.sendInfoToProps(),
    );
  };

  handleChangeIncludeInMyDevices = () => {
    let value = !this.state.myDevices;
    let code = this.state.code;
    code = code.replace(
      /^::enable_bot_in_my_devices\s(.*)$/m,
      `::enable_bot_in_my_devices ${value ? 'yes' : 'no'}`,
    );
    this.setState(
      {
        myDevices: value,
        code,
      },
      () => this.sendInfoToProps(),
    );
  };

  handleChangeIncludeInPublicDevices = () => {
    let value = !this.state.publicDevices;
    let code = this.state.code;
    code = code.replace(
      /^::enable_bot_for_other_users\s(.*)$/m,
      `::enable_bot_for_other_users ${value ? 'yes' : 'no'}`,
    );
    this.setState(
      {
        publicDevices: value,
        code,
      },
      () => this.sendInfoToProps(),
    );
  };

  handleChangeLimitSites = () => {
    let value = !this.state.limitSites;
    let code = this.state.code;
    code = code.replace(
      /^::allow_bot_only_on_own_sites\s(.*)$/m,
      `::allow_bot_only_on_own_sites ${value ? 'yes' : 'no'}`,
    );
    this.setState(
      {
        limitSites: value,
        code,
      },
      () => this.sendInfoToProps(),
    );
  };

  sendInfoToProps = () => {
    this.props.configure.sendInfoToProps({
      code: this.state.code,
    });
  };

  checkValidUrl = url => {
    url = url.trim();
    // eslint-disable-next-line
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(url)) {
      return true;
      // eslint-disable-next-line
    } else {
      return false;
    }
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <div className="table-wrap">
          <Checkbox
            label="Allow bot only on own site"
            labelPosition="right"
            checked={this.state.limitSites}
            labelStyle={{ fontSize: '16px' }}
            iconStyle={{ fill: 'rgb(66, 133, 244)' }}
            onCheck={this.handleChangeLimitSites}
          />
          <div style={{ fontSize: '14px', padding: '0px 0px 2px 40px' }}>
            Allow the chatbot to run only on specified websites.
          </div>
          {this.state.limitSites ? (
            <div style={{ padding: '20px 0px' }}>
              <TextField
                name="Website Name"
                value={this.state.websiteName}
                onChange={this.handleChangeWebsiteName}
                style={styles.nameField}
                inputStyle={styles.inputStyle}
                placeholder="Domain Name"
                underlineStyle={{ display: 'none' }}
              />
              <Button
                onClick={this.handleAdd}
                type="primary"
                style={{ marginBottom: 16, marginLeft: '15px', height: '36px' }}
              >
                Add a website
              </Button>
              <Table
                components={components}
                rowClassName={() => 'editable-row'}
                locale={{ emptyText: 'No websites added!' }}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </div>
          ) : null}
        </div>
        <div style={{ padding: '0px 0px 20px 0px' }}>
          <Checkbox
            label="Include SUSI default skills"
            labelPosition="right"
            checked={this.state.includeSusiSkills}
            labelStyle={{ fontSize: '16px' }}
            iconStyle={{ fill: 'rgb(66, 133, 244)' }}
            onCheck={this.handleChangeIncludeSusiSkills}
          />
          <div style={{ fontSize: '14px', padding: '0px 0px 2px 40px' }}>
            Allow the users to use all skills of SUSI.AI on your chatbot.
            Don&apos;t worry, your bot skill will always have a higher priority
            than SUSI skills.
          </div>
          <Checkbox
            label="(Coming Soon) Enable bot in my devices"
            labelPosition="right"
            checked={this.state.myDevices}
            labelStyle={{ fontSize: '16px' }}
            iconStyle={{ fill: 'rgb(66, 133, 244)' }}
            onCheck={this.handleChangeIncludeInMyDevices}
          />
          <div style={{ fontSize: '14px', padding: '0px 0px 2px 40px' }}>
            Allow the chatbot to run on your devices.
          </div>
          <Checkbox
            label="(Coming Soon) Enable bot for other users"
            labelPosition="right"
            checked={this.state.publicDevices}
            labelStyle={{ fontSize: '16px' }}
            iconStyle={{ fill: 'rgb(66, 133, 244)' }}
            onCheck={this.handleChangeIncludeInPublicDevices}
          />
          <div style={{ fontSize: '14px', padding: '0px 0px 2px 40px' }}>
            List the chatbot publicly. Users won&apos;t be able to see/edit the
            code of your chatbot.
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  helpIcon: {
    position: 'absolute',
    top: '18px',
    right: '10px',
    height: '20px',
    width: '20px',
    cursor: 'pointer',
    color: 'rgb(158, 158, 158)',
  },
  nameField: {
    height: '38px',
    borderRadius: 4,
    border: '1px solid #ced4da',
    fontSize: 15,
    padding: '0px 10px',
    width: '272px',
  },
  inputStyle: {
    height: '35px',
    marginBottom: '10px',
  },
};

UIView.propTypes = {
  configure: PropTypes.object,
  actions: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(uiActions, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(UIView);
