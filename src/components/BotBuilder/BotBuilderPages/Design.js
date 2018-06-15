import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as $ from 'jquery';
import Cookies from 'universal-cookie';
import Snackbar from 'material-ui/Snackbar';
import TiTick from 'react-icons/lib/ti/tick';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import ColorPicker from 'material-ui-color-picker';
import colors from '../../../Utils/colors';
import urls from '../../../Utils/urls';
import avatars from '../../../Utils/avatars';

const cookies = new Cookies();
let BASE_URL = urls.API_URL;

class Design extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      botbuilderBackgroundBody: '#ffffff',
      botbuilderBodyBackgroundImg: '',
      botbuilderUserMessageBackground: '#0077e5',
      botbuilderUserMessageTextColor: '#ffffff',
      botbuilderBotMessageBackground: '#f8f8f8',
      botbuilderBotMessageTextColor: '#455a64',
      botbuilderIconColor: '#000000',
      botbuilderIconImg: '',
      saving: false,
      openSnackbar: false,
      msgSnackbar: '',
      loadedSettings: false,
      resetting: false,
    };
    this.getSettings();
  }

  componentDidMount() {
    this.updateSettings();
  }
  updateSettings = () => {
    let settingsString = JSON.stringify(this.state);
    this.props.updateSettings(settingsString);
  };
  handleChangeColor = (component, color) => {
    if (component === 'botbuilderIconColor') {
      this.setState(
        {
          [component]: color,
          iconSelected: null,
          botbuilderIconImg: '',
        },
        () => this.updateSettings(),
      );
    } else {
      this.setState(
        {
          [component]: color,
        },
        () => this.updateSettings(),
      );
    }
  };

  handleChangeBodyBackgroundImage = botbuilderBodyBackgroundImg => {
    this.setState({ botbuilderBodyBackgroundImg }, () => this.updateSettings());
  };
  handleRemoveUrlBody = () => {
    this.setState({ botbuilderBodyBackgroundImg: '' }, () =>
      this.updateSettings(),
    );
  };
  handleChangeIconImage = botbuilderIconImg => {
    this.setState(
      {
        botbuilderIconImg,
        iconSelected: null,
      },
      () => this.updateSettings(),
    );
  };
  handleRemoveUrlIcon = () => {
    this.setState({ botbuilderIconImg: '' }, () => this.updateSettings());
  };

  handleSave = () => {
    // send settings to server
    if (
      cookies.get('loggedIn') === null ||
      cookies.get('loggedIn') === undefined
    ) {
      return;
    }
    let settings = [
      {
        key: 'botbuilderBackgroundBody',
        value: this.state.botbuilderBackgroundBody.substring(1),
      },
      {
        key: 'botbuilderBodyBackgroundImg',
        value: this.state.botbuilderBodyBackgroundImg,
      },
      {
        key: 'botbuilderUserMessageBackground',
        value: this.state.botbuilderUserMessageBackground.substring(1),
      },
      {
        key: 'botbuilderUserMessageTextColor',
        value: this.state.botbuilderUserMessageTextColor.substring(1),
      },
      {
        key: 'botbuilderBotMessageBackground',
        value: this.state.botbuilderBotMessageBackground.substring(1),
      },
      {
        key: 'botbuilderBotMessageTextColor',
        value: this.state.botbuilderBotMessageTextColor.substring(1),
      },
      {
        key: 'botbuilderIconColor',
        value: this.state.botbuilderIconColor.substring(1),
      },
      {
        key: 'botbuilderIconImg',
        value: this.state.botbuilderIconImg,
      },
    ];
    let url =
      BASE_URL +
      '/aaa/changeUserSettings.json?' +
      '&access_token=' +
      cookies.get('loggedIn');

    settings.forEach((obj, index) => {
      url +=
        '&key' +
        (index + 1).toString() +
        '=' +
        obj.key +
        '&value' +
        (index + 1).toString() +
        '=' +
        obj.value.toString();
    });
    url += '&count=' + settings.length.toString();
    this.setState({ saving: true });
    $.ajax({
      url: url,
      jsonpCallback: 'pa',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        // successfully stored
        this.setState({
          saving: false,
          openSnackbar: true,
          msgSnackbar: 'Success! Saved settings',
        });
      }.bind(this),
      error: function(textStatus, errorThrown) {
        this.setState({
          saving: false,
          openSnackbar: true,
          msgSnackbar: "Error! Can't save your settings. Try logging again",
        });
      }.bind(this),
    });
  };

  getSettings = () => {
    let url =
      BASE_URL +
      '/aaa/listUserSettings.json?' +
      '&access_token=' +
      cookies.get('loggedIn');
    $.ajax({
      url: url,
      jsonpCallback: 'p',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        if (data.settings) {
          let settings = data.settings;
          if (settings.botbuilderBackgroundBody) {
            this.setState({
              botbuilderBackgroundBody: '#' + settings.botbuilderBackgroundBody,
            });
          }
          if (settings.botbuilderBodyBackgroundImg) {
            let img = settings.botbuilderBodyBackgroundImg;
            this.setState({
              botbuilderBodyBackgroundImg: img,
            });
          }
          if (settings.botbuilderUserMessageBackground) {
            this.setState({
              botbuilderUserMessageBackground:
                '#' + settings.botbuilderUserMessageBackground,
            });
          }
          if (settings.botbuilderUserMessageTextColor) {
            this.setState({
              botbuilderUserMessageTextColor:
                '#' + settings.botbuilderUserMessageTextColor,
            });
          }
          if (settings.botbuilderBotMessageBackground) {
            this.setState({
              botbuilderBotMessageBackground:
                '#' + settings.botbuilderBotMessageBackground,
            });
          }
          if (settings.botbuilderBotMessageTextColor) {
            this.setState({
              botbuilderBotMessageTextColor:
                '#' + settings.botbuilderBotMessageTextColor,
            });
          }
          if (settings.botbuilderIconColor) {
            this.setState({
              botbuilderIconColor: '#' + settings.botbuilderIconColor,
            });
          }
          if (settings.botbuilderIconImg) {
            this.setState({
              botbuilderIconImg: settings.botbuilderIconImg,
            });
          }

          this.setState(
            {
              loadedSettings: true,
            },
            () => this.updateSettings(),
          );
          let botbuilderIconImg = settings.botbuilderIconImg;
          if (botbuilderIconImg) {
            for (let icon of avatars) {
              if (icon.url === botbuilderIconImg) {
                this.handleIconSelect(icon);
                break;
              }
            }
          }
        }
      }.bind(this),
      error: function(error) {
        this.setState({
          openSnackbar: true,
          msgSnackbar: "Couldn't get settings. Please try login again",
        });
      }.bind(this),
    });
  };

  handleReset = () => {
    // send settings to server
    if (
      cookies.get('loggedIn') === null ||
      cookies.get('loggedIn') === undefined
    ) {
      return;
    }
    let settings = [
      {
        key: 'botbuilderBackgroundBody',
        value: '',
      },
      {
        key: 'botbuilderBodyBackgroundImg',
        value: '',
      },
      {
        key: 'botbuilderUserMessageBackground',
        value: '',
      },
      {
        key: 'botbuilderUserMessageTextColor',
        value: '',
      },
      {
        key: 'botbuilderBotMessageBackground',
        value: '',
      },
      {
        key: 'botbuilderBotMessageTextColor',
        value: '',
      },
      {
        key: 'botbuilderIconColor',
        value: '',
      },
      {
        key: 'botbuilderIconImg',
        value: '',
      },
    ];
    let url =
      BASE_URL +
      '/aaa/changeUserSettings.json?' +
      '&access_token=' +
      cookies.get('loggedIn');

    settings.forEach((obj, index) => {
      url +=
        '&key' +
        (index + 1).toString() +
        '=' +
        obj.key +
        '&value' +
        (index + 1).toString() +
        '=' +
        obj.value.toString();
    });
    url += '&count=' + settings.length.toString();
    this.setState({ resetting: true });
    $.ajax({
      url: url,
      jsonpCallback: 'pa',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        // successfully stored
        this.setState(
          {
            resetting: false,
            openSnackbar: true,
            msgSnackbar: 'Success! Saved settings',
          },
          () => this.updateSettings(),
        );
      }.bind(this),
      error: function(textStatus, errorThrown) {
        this.setState({
          resetting: false,
          openSnackbar: true,
          msgSnackbar: "Error! Can't save your settings. Try logging again",
        });
      }.bind(this),
    });
  };

  handleIconSelect = icon => {
    if (icon.id === this.state.iconSelected) {
      this.setState(
        {
          iconSelected: null,
          botbuilderIconImg: '',
        },
        () => this.updateSettings(),
      );
    } else {
      this.setState(
        {
          iconSelected: icon.id,
          botbuilderIconImg: icon.url,
        },
        () => this.updateSettings(),
      );
    }
  };

  handleClickColorBox = id => {
    $('#colorPicker' + id).click();
  };

  render() {
    // Custom Theme feature Component
    const customiseOptionsList = [
      { id: 1, component: 'botbuilderBackgroundBody', name: 'Body background' },
      {
        id: 2,
        component: 'botbuilderUserMessageBackground',
        name: "User's message box background",
      },
      {
        id: 3,
        component: 'botbuilderUserMessageTextColor',
        name: "User's message text color",
      },
      {
        id: 4,
        component: 'botbuilderBotMessageBackground',
        name: "Bot's message box background",
      },
      {
        id: 5,
        component: 'botbuilderBotMessageTextColor',
        name: "Bot's message text color",
      },
      { id: 6, component: 'botbuilderIconColor', name: 'Bot Icon' },
    ];
    const customizeComponents = customiseOptionsList.map(component => {
      return (
        <div key={component.id} className="circleChoose">
          <h2>Color of {component.name}</h2>
          <div className="color-picker-wrap">
            <ColorPicker
              className="color-picker"
              style={{ display: 'inline-block', float: 'left' }}
              name="color"
              id={'colorPicker' + component.id}
              defaultValue={this.state[component.component]}
              onChange={color =>
                this.handleChangeColor(component.component, color)
              }
            />
            <span
              className="color-box"
              onClick={() => this.handleClickColorBox(component.id)}
              style={{ backgroundColor: this.state[component.component] }}
            />
          </div>
          {component.component === 'botbuilderBackgroundBody' && (
            <div>
              <TextField
                name="backgroundImg"
                onChange={(e, value) =>
                  this.handleChangeBodyBackgroundImage(value)
                }
                value={this.state.botbuilderBodyBackgroundImg}
                floatingLabelText="Body Background Image URL"
              />
              <RaisedButton
                name="removeBackgroundBody"
                key={'RemoveBody'}
                backgroundColor={colors.header}
                style={{ marginLeft: '15px' }}
                label="Remove URL"
                labelColor="#fff"
                onTouchTap={this.handleRemoveUrlBody}
              />
            </div>
          )}
          {component.component === 'botbuilderIconColor' && (
            <div>
              <TextField
                name="iconImg"
                onChange={(e, value) => this.handleChangeIconImage(value)}
                value={this.state.botbuilderIconImg}
                floatingLabelText="Icon URL"
              />
              <RaisedButton
                name="removeIconUrl"
                key={'RemoveIconUrl'}
                backgroundColor={colors.header}
                style={{ marginLeft: '15px' }}
                label="Remove URL"
                labelColor="#fff"
                onTouchTap={this.handleRemoveUrlIcon}
              />
              <br />
              <br />
              {avatars.map(icon => {
                return (
                  <span
                    key={icon.id}
                    className={
                      'icon-wrap ' +
                      (this.state.iconSelected === icon.id
                        ? 'icon-selected'
                        : '')
                    }
                  >
                    <img
                      alt="icon"
                      src={icon.url}
                      onClick={() => this.handleIconSelect(icon)}
                      className="bot-avatar"
                    />
                    <TiTick className="tick" />
                  </span>
                );
              })}
            </div>
          )}

          <br />
        </div>
      );
    });
    return (
      <div className="center menu-page">
        {!this.state.loadedSettings ? (
          <div className="center">
            <CircularProgress size={62} color="#4285f5" />
            <h4>Loading</h4>
          </div>
        ) : (
          <div className="design-box">
            {this.state.loadedSettings && customizeComponents}
            <RaisedButton
              label={
                this.state.resetting ? (
                  <CircularProgress color={colors.header} size={32} />
                ) : (
                  'Reset'
                )
              }
              onTouchTap={this.handleReset}
            />
            <RaisedButton
              name="save"
              style={{ marginLeft: '15px' }}
              backgroundColor={colors.header}
              onTouchTap={this.handleSave}
              labelColor="#fff"
              label={
                this.state.saving ? (
                  <CircularProgress color="#ffffff" size={32} />
                ) : (
                  'Save Changes'
                )
              }
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

Design.propTypes = {
  updateSettings: PropTypes.func,
};

export default Design;
