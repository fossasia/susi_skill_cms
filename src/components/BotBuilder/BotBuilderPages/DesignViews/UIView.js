import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as $ from 'jquery';
import Cookies from 'universal-cookie';
import { Grid, Col, Row } from 'react-flexbox-grid';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Close from 'material-ui/svg-icons/navigation/close';
import ColorPicker from 'material-ui-color-picker';
import colors from '../../../../Utils/colors';
import urls from '../../../../Utils/urls';
import avatars from '../../../../Utils/avatars';
import TiTick from 'react-icons/lib/ti/tick';

const cookies = new Cookies();
let BASE_URL = urls.API_URL;
let IMAGE_GET_URL = `${BASE_URL}/cms/getImage.png?image=`;

class UIView extends Component {
  constructor(props) {
    super(props);
    let code = '';
    if (this.props.design) {
      code = this.props.design.code;
    }
    this.state = {
      botbuilderBackgroundBody: '#ffffff',
      botbuilderBodyBackgroundImg: '',
      botbuilderUserMessageBackground: '#0077e5',
      botbuilderUserMessageTextColor: '#ffffff',
      botbuilderBotMessageBackground: '#f8f8f8',
      botbuilderBotMessageTextColor: '#455a64',
      botbuilderIconColor: '#000000',
      botbuilderIconImg: '',
      openSnackbar: false,
      msgSnackbar: '',
      loadedSettings: false,
      uploadingBodyBackgroundImg: false,
      botbuilderBodyBackgroundImgName: '',
      botbuilderIconImgName: '',
      uploadingBotbuilderIconImg: false,
      code,
    };
  }

  componentDidMount() {
    this.getSettings();
  }

  updateSettings = () => {
    let settingsString = JSON.stringify(this.state);
    this.props.design.updateSettings(settingsString);
  };

  sendInfoToProps = () => {
    this.props.design.sendInfoToProps({
      code: this.state.code,
    });
    this.updateSettings();
  };

  handleChangeColor = (component, color) => {
    if (!color.startsWith('#')) {
      color = '#' + color;
    }
    let code = '';
    if (component === 'botbuilderBackgroundBody') {
      code = this.state.code.replace(
        /^::bodyBackground\s(.*)$/m,
        `::bodyBackground ${color}`,
      );
      this.setState(
        {
          code,
          [component]: color,
        },
        () => this.sendInfoToProps(),
      );
    } else if (component === 'botbuilderUserMessageBackground') {
      code = this.state.code.replace(
        /^::userMessageBoxBackground\s(.*)$/m,
        `::userMessageBoxBackground ${color}`,
      );
      this.setState(
        {
          code,
          [component]: color,
        },
        () => this.sendInfoToProps(),
      );
    } else if (component === 'botbuilderUserMessageTextColor') {
      code = this.state.code.replace(
        /^::userMessageTextColor\s(.*)$/m,
        `::userMessageTextColor ${color}`,
      );
      this.setState(
        {
          code,
          [component]: color,
        },
        () => this.sendInfoToProps(),
      );
    } else if (component === 'botbuilderBotMessageBackground') {
      code = this.state.code.replace(
        /^::botMessageBoxBackground\s(.*)$/m,
        `::botMessageBoxBackground ${color}`,
      );
      this.setState(
        {
          code,
          [component]: color,
        },
        () => this.sendInfoToProps(),
      );
    } else if (component === 'botbuilderBotMessageTextColor') {
      code = this.state.code.replace(
        /^::botMessageTextColor\s(.*)$/m,
        `::botMessageTextColor ${color}`,
      );
      this.setState(
        {
          code,
          [component]: color,
        },
        () => this.sendInfoToProps(),
      );
    } else if (component === 'botbuilderIconColor') {
      code = this.state.code.replace(
        /^::botIconColor\s(.*)$/m,
        `::botIconColor ${color}`,
      );
      this.setState(
        {
          code,
          [component]: color,
        },
        () => this.sendInfoToProps(),
      );
    }
  };

  handleChangeBodyBackgroundImage = botbuilderBodyBackgroundImg => {
    let files = botbuilderBodyBackgroundImg.target.files;
    if (files.length === 0) {
      this.handleRemoveUrlBody();
    } else {
      this.uploadImageBodyBackground(files[0]);
    }
  };

  uploadImageBodyBackground = file => {
    let form = new FormData();
    form.append('image', file);
    form.append('access_token', cookies.get('loggedIn'));
    form.append('image_name', file.name);
    let settings = {
      async: true,
      crossDomain: true,
      url: `${BASE_URL}/cms/uploadImage.json`,
      method: 'POST',
      processData: false,
      contentType: false,
      mimeType: 'multipart/form-data',
      data: form,
    };
    this.setState({ uploadingBodyBackgroundImg: true });
    let self = this;
    $.ajax(settings)
      .done(function(response) {
        response = JSON.parse(response);
        let img_url = IMAGE_GET_URL + response.image_path;
        let code = self.state.code.replace(
          /^::bodyBackgroundImage\s(.*)$/m,
          `::bodyBackgroundImage ${img_url}`,
        );
        self.setState(
          {
            code,
            uploadingBodyBackgroundImg: false,
            botbuilderBodyBackgroundImg: img_url,
            botbuilderBodyBackgroundImgName: response.image_path.substring(
              response.image_path.indexOf('_') + 1,
            ),
          },
          () => self.sendInfoToProps(),
        );
      })
      .fail(function(jqXHR, textStatus) {
        self.setState({
          uploadingBodyBackgroundImg: false,
          openSnackbar: true,
          msgSnackbar: "Error! Couldn't upload image",
        });
      });
  };

  uploadImageIcon = file => {
    let form = new FormData();
    form.append('access_token', cookies.get('loggedIn'));
    form.append('image_name', file.name);
    form.append('image', file);
    let settings = {
      async: true,
      crossDomain: true,
      url: `${BASE_URL}/cms/uploadImage.json`,
      method: 'POST',
      processData: false,
      contentType: false,
      mimeType: 'multipart/form-data',
      data: form,
    };
    this.setState({ uploadingBotbuilderIconImg: true });
    let self = this;
    $.ajax(settings)
      .done(function(response) {
        response = JSON.parse(response);
        let img_url = IMAGE_GET_URL + response.image_path;
        let code = self.state.code.replace(
          /^::botIconImage\s(.*)$/m,
          `::botIconImage ${img_url}`,
        );
        self.setState(
          {
            code,
            uploadingBotbuilderIconImg: false,
            iconSelected: null,
            botbuilderIconImg: img_url,
            botbuilderIconImgName: response.image_path.substring(
              response.image_path.indexOf('_') + 1,
            ),
          },
          () => self.sendInfoToProps(),
        );
      })
      .fail(function(jqXHR, textStatus) {
        self.setState({
          uploadingBotbuilderIconImg: false,
          openSnackbar: true,
          msgSnackbar: "Error! Couldn't upload image",
        });
      });
  };

  handleRemoveUrlBody = () => {
    let code = this.state.code.replace(
      /^::bodyBackgroundImage\s(.*)$/m,
      '::bodyBackgroundImage ',
    );
    this.setState(
      {
        code,
        botbuilderBodyBackgroundImg: '',
        botbuilderBodyBackgroundImgName: '',
      },
      () => this.sendInfoToProps(),
    );
  };

  handleChangeIconImage = botbuilderIconImg => {
    let files = botbuilderIconImg.target.files;
    if (files.length === 0) {
      this.handleRemoveUrlIcon();
    } else {
      this.uploadImageIcon(files[0]);
    }
    let code = this.state.code.replace(
      /^::botIconImage\s(.*)$/m,
      `::botIconImage ${botbuilderIconImg}`,
    );
    this.setState({ code, botbuilderIconImg }, () => this.sendInfoToProps());
  };

  handleRemoveUrlIcon = () => {
    let code = this.state.code.replace(
      /^::botIconImage\s(.*)$/m,
      '::botIconImage ',
    );
    this.setState(
      {
        code,
        botbuilderIconImg: '',
        botbuilderIconImgName: '',
      },
      () => this.sendInfoToProps(),
    );
  };

  getSettings = () => {
    let code = this.state.code;
    const bodyBackgroundMatch = code.match(/^::bodyBackground\s(.*)$/m);
    const bodyBackgroundImageMatch = code.match(
      /^::bodyBackgroundImage\s(.*)$/m,
    );
    console.log(bodyBackgroundImageMatch);
    const userMessageBoxBackgroundMatch = code.match(
      /^::userMessageBoxBackground\s(.*)$/m,
    );
    const userMessageTextColorMatch = code.match(
      /^::userMessageTextColor\s(.*)$/m,
    );
    const botMessageBoxBackgroundMatch = code.match(
      /^::botMessageBoxBackground\s(.*)$/m,
    );
    const botMessageTextColorMatch = code.match(
      /^::botMessageTextColor\s(.*)$/m,
    );
    const botIconColorMatch = code.match(/^::botIconColor\s(.*)$/m);
    const botIconImageMatch = code.match(/^::botIconImage\s(.*)$/m);
    console.log(botIconImageMatch);
    if (bodyBackgroundMatch) {
      this.setState({
        botbuilderBackgroundBody: bodyBackgroundMatch[1],
      });
    }
    if (bodyBackgroundImageMatch) {
      this.setState({
        botbuilderBodyBackgroundImg: bodyBackgroundImageMatch[1],
        botbuilderBodyBackgroundImgName: bodyBackgroundImageMatch[1].split(
          '/',
        )[5],
      });
    }
    if (userMessageBoxBackgroundMatch) {
      this.setState({
        botbuilderUserMessageBackground: userMessageBoxBackgroundMatch[1],
      });
    }
    if (userMessageTextColorMatch) {
      this.setState({
        botbuilderUserMessageTextColor: userMessageTextColorMatch[1],
      });
    }
    if (botMessageBoxBackgroundMatch) {
      this.setState({
        botbuilderBotMessageBackground: botMessageBoxBackgroundMatch[1],
      });
    }
    if (botMessageTextColorMatch) {
      this.setState({
        botbuilderBotMessageTextColor: botMessageTextColorMatch[1],
      });
    }
    if (botIconColorMatch) {
      this.setState({
        botbuilderIconColor: botIconColorMatch[1],
      });
    }
    if (botIconImageMatch) {
      for (let icon of avatars) {
        if (icon.url === botIconImageMatch[1]) {
          this.handleIconSelect(icon);
          break;
        }
      }
      this.setState({
        botbuilderIconImg: botIconImageMatch[1],
        botbuilderIconImgName: botIconImageMatch[1].split('/')[5],
      });
    }

    this.setState(
      {
        loadedSettings: true,
      },
      () => this.updateSettings(),
    );
  };

  handleReset = () => {
    // reset to default values
    this.setState({ loadedSettings: false });
    let code = this.state.code;
    code = code.replace(
      /^::bodyBackground\s(.*)$/m,
      '::bodyBackground #ffffff',
    );
    code = code.replace(
      /^::userMessageBoxBackground\s(.*)$/m,
      '::userMessageBoxBackground #0077e5',
    );
    code = code.replace(
      /^::userMessageTextColor\s(.*)$/m,
      '::userMessageTextColor #ffffff',
    );
    code = code.replace(
      /^::botMessageBoxBackground\s(.*)$/m,
      '::botMessageBoxBackground #f8f8f8',
    );
    code = code.replace(
      /^::botMessageTextColor\s(.*)$/m,
      '::botMessageTextColor #455a64',
    );
    code = code.replace(/^::botIconColor\s(.*)$/m, '::botIconColor #000000');
    this.setState(
      {
        code,
      },
      () => this.sendInfoToProps(),
    );
    this.setState(
      {
        botbuilderBackgroundBody: '#ffffff',
        botbuilderBodyBackgroundImg: '',
        botbuilderUserMessageBackground: '#0077e5',
        botbuilderUserMessageTextColor: '#ffffff',
        botbuilderBotMessageBackground: '#f8f8f8',
        botbuilderBotMessageTextColor: '#455a64',
        botbuilderIconColor: '#000000',
        botbuilderIconImg: '',
      },
      () => this.setState({ loadedSettings: true }),
    );
  };

  handleIconSelect = icon => {
    if (icon.id === this.state.iconSelected) {
      let code = this.state.code.replace(
        /^::botIconImage\s(.*)$/m,
        '::botIconImage ',
      );
      this.setState(
        {
          code,
          iconSelected: null,
          botbuilderIconImg: '',
          botbuilderIconImgName: '',
        },
        () => this.sendInfoToProps(),
      );
    } else {
      let code = this.state.code.replace(
        /^::botIconImage\s(.*)$/m,
        `::botIconImage ${icon.url}`,
      );
      this.setState(
        {
          code,
          iconSelected: icon.id,
          botbuilderIconImg: icon.url,
          botbuilderIconImgName: '',
        },
        () => this.sendInfoToProps(),
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
      { id: 7, component: 'botbuilderAvatar', name: 'Choose your bot avatar' },
    ];
    const customizeComponents = customiseOptionsList.map(component => {
      return (
        <div key={component.id} className="circleChoose">
          <Grid>
            <Row>
              <Col xs={12} md={6} lg={6}>
                {component.id === 7 ? (
                  <h2>{component.name}</h2>
                ) : (
                  <h2>Color of {component.name}</h2>
                )}
              </Col>
              <Col xs={12} md={6} lg={6}>
                {component.id !== 7 ? (
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                        style={{
                          backgroundColor: this.state[component.component],
                        }}
                      />
                    </div>
                  </div>
                ) : null}
                {component.component === 'botbuilderBackgroundBody' && (
                  <div>
                    <br />
                    <form style={{ display: 'inline-block' }}>
                      <label
                        className="file-upload-btn"
                        title="Upload Background Image"
                      >
                        <input
                          disabled={this.state.uploadingBodyBackgroundImg}
                          type="file"
                          onChange={this.handleChangeBodyBackgroundImage}
                          accept="image/x-png,image/gif,image/jpeg"
                        />
                        {this.state.uploadingBodyBackgroundImg ? (
                          <CircularProgress color="#ffffff" size={32} />
                        ) : (
                          'Upload Image'
                        )}
                      </label>
                    </form>
                    {this.state.botbuilderBodyBackgroundImg && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: '10px',
                        }}
                      >
                        <h3>{this.state.botbuilderBodyBackgroundImgName}</h3>
                        <span title="Remove image">
                          <Close
                            className="remove-icon"
                            onTouchTap={this.handleRemoveUrlBody}
                          />
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </Col>
            </Row>
          </Grid>
          {component.component === 'botbuilderAvatar' && (
            <div style={{ padding: '25px  0 25px 0' }}>
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
          {component.component === 'botbuilderAvatar' && (
            <div>
              <h2>OR</h2>
              <br />
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h2 style={{ paddingRight: '20px' }}>
                  Upload your own bot avatar
                </h2>
                <form style={{ display: 'inline-block' }}>
                  <label className="file-upload-btn">
                    <input
                      disabled={this.state.uploadingBotbuilderIconImg}
                      type="file"
                      onChange={this.handleChangeIconImage}
                      accept="image/x-png,image/gif,image/jpeg"
                    />
                    {this.state.uploadingBotbuilderIconImg ? (
                      <CircularProgress color="#ffffff" size={32} />
                    ) : (
                      'Upload Image'
                    )}
                  </label>
                </form>
              </div>
              <br />
              {this.state.botbuilderIconImgName && (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <h3>{this.state.botbuilderIconImgName}</h3>
                  <span title="Remove image">
                    <Close
                      className="remove-icon"
                      onTouchTap={this.handleRemoveUrlIcon}
                    />
                  </span>
                </div>
              )}
            </div>
          )}

          <br />
        </div>
      );
    });
    return (
      <div>
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

UIView.propTypes = {
  design: PropTypes.object,
};

export default UIView;
