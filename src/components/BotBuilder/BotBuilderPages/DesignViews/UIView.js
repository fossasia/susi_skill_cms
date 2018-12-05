import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as $ from 'jquery';
import Cookies from 'universal-cookie';
import { Grid, Col, Row } from 'react-flexbox-grid';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Close from 'material-ui/svg-icons/navigation/close';
import Add from 'material-ui/svg-icons/content/add';
import Toggle from 'material-ui/Toggle';
import ColorPicker from 'material-ui-color-picker';
import { urls, colors, avatars } from '../../../../utils';
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
    let avatarsIcons = avatars.slice();
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
      uploadingBotbuilderIconImg: false,
      code,
      avatars: avatarsIcons,
      originalAvatarsCount: avatarsIcons.length,
      showBackgroundImageChange: false,
    };
  }

  componentDidMount() {
    this.getSettings();
  }

  sendInfoToProps = () => {
    this.props.design.sendInfoToProps({
      code: this.state.code,
    });
    let settingsString = this.state;
    this.props.design.updateSettings(settingsString);
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
      .done(
        function(response) {
          response = JSON.parse(response);
          let img_url = IMAGE_GET_URL + response.image_path;
          let code = this.state.code.replace(
            /^::botIconImage\s(.*)$/m,
            `::botIconImage ${img_url}`,
          );
          let avatarsObj = this.state.avatars;
          let img_obj = {
            id: avatarsObj.length,
            url: img_url,
          };
          this.handleIconSelect(img_obj);
          avatarsObj.push(img_obj);
          this.setState(
            {
              code,
              uploadingBotbuilderIconImg: false,
              botbuilderIconImg: img_url,
              avatars: avatarsObj,
            },
            () => this.sendInfoToProps(),
          );
        }.bind(this),
      )
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
    botbuilderIconImg.persist();
    let files = botbuilderIconImg.target.files;
    if (files.length === 0) {
      this.handleRemoveUrlIcon();
    } else {
      this.uploadImageIcon(files[0]);
    }
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
        iconSelected: null,
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
      if (bodyBackgroundImageMatch[1].length > 0) {
        this.setState({
          showBackgroundImageChange: true,
        });
      }
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
    if (botIconImageMatch && botIconImageMatch[1].length > 0) {
      let avatarsObj = this.state.avatars;
      avatarsObj.push({
        id: avatarsObj.length,
        url: botIconImageMatch[1],
      });
      for (let icon of avatarsObj) {
        if (icon.url === botIconImageMatch[1]) {
          this.handleIconSelect(icon);
          break;
        }
      }
      this.setState({
        avatars: avatarsObj,
        botbuilderIconImg: botIconImageMatch[1],
      });
    }

    this.setState({
      loadedSettings: true,
    });
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
      /^::bodyBackgroundImage\s(.*)$/m,
      '::bodyBackgroundImage ',
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
    code = code.replace(/^::botIconImage\s(.*)$/m, '::botIconImage ');
    this.setState(
      {
        code,
      },
      () => this.sendInfoToProps(),
    );
    let avatarsIcons = this.state.avatars.slice(
      0,
      this.state.originalAvatarsCount,
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
        iconSelected: 0,
        avatars: avatarsIcons,
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
        },
        () => this.sendInfoToProps(),
      );
    }
  };

  handleClickColorBox = id => {
    $('#colorPicker' + id).click();
  };

  handleShowBackgroundImageChangeToggle = () => {
    let isInputChecked = !this.state.showBackgroundImageChange;
    if (isInputChecked === false) {
      let code = this.state.code.replace(
        /^::bodyBackgroundImage\s(.*)$/m,
        '::bodyBackgroundImage ',
      );
      this.setState(
        {
          botbuilderBodyBackgroundImg: '',
          code,
        },
        () => this.sendInfoToProps(),
      );
    }
    this.setState({ showBackgroundImageChange: isInputChecked });
  };
  render() {
    // Custom Theme feature Component
    const customiseOptionsList = [
      {
        id: 1,
        component: 'botbuilderBackgroundBody',
        name: 'Change background',
      },
      {
        id: 2,
        component: 'botbuilderUserMessageBackground',
        name: 'User message bubble',
      },
      {
        id: 3,
        component: 'botbuilderUserMessageTextColor',
        name: 'User message text',
      },
      {
        id: 4,
        component: 'botbuilderBotMessageBackground',
        name: 'Bot message bubble',
      },
      {
        id: 5,
        component: 'botbuilderBotMessageTextColor',
        name: 'Bot message text',
      },
      {
        id: 6,
        component: 'botbuilderIconColor',
        name: 'Avatar background',
      },
      {
        id: 7,
        component: 'botbuilderAvatar',
        name: 'Choose your bot avatar',
      },
    ];
    const customizeComponents = customiseOptionsList.map(component => {
      return (
        <div key={component.id} className="circleChoose">
          <Row style={{ marginBottom: '15px' }}>
            <Col xs={12} md={6} lg={6}>
              {component.id === 7 ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: '400',
                    }}
                  >
                    {component.name}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontSize: '18px',
                      paddingTop: '12px',
                      fontWeight: '400',
                    }}
                  >
                    {component.name}
                  </div>
                  {component.id === 1 && (
                    <div>
                      <span
                        className="toggle-label-right"
                        onClick={this.handleShowBackgroundImageChangeToggle}
                      >
                        Color
                      </span>
                      <Toggle
                        label="Image"
                        labelPosition="right"
                        labelStyle={{
                          width: 'auto',
                          fontSize: '14px',
                          fontWeight: '300',
                        }}
                        defaultToggled={this.state.showBackgroundImageChange}
                        onToggle={this.handleShowBackgroundImageChangeToggle}
                        style={{
                          textAlign: 'right',
                          marginTop: '10px',
                          display: 'inline-block',
                          width: 'auto',
                        }}
                        thumbSwitchedStyle={{
                          backgroundColor: 'rgb(66, 133, 245)',
                        }}
                        trackSwitchedStyle={{
                          backgroundColor: 'rgba(151, 184, 238, 0.85)',
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </Col>
            <Col xs={12} md={6} lg={6}>
              {component.id !== 7 &&
              !(
                component.id === 1 &&
                this.state.showBackgroundImageChange === true
              ) ? (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="color-picker-wrap">
                    <span
                      className="color-box"
                      onClick={() => this.handleClickColorBox(component.id)}
                      style={{
                        backgroundColor: this.state[component.component],
                      }}
                    />
                    <ColorPicker
                      className="color-picker"
                      style={{ display: 'inline-block', width: '60px' }}
                      name="color"
                      id={'colorPicker' + component.id}
                      defaultValue={this.state[component.component]}
                      onChange={color =>
                        this.handleChangeColor(component.component, color)
                      }
                    />
                  </div>
                </div>
              ) : null}
              {component.component === 'botbuilderBackgroundBody' &&
                this.state.showBackgroundImageChange === true && (
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
                          accept="image/*"
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
          {component.component === 'botbuilderAvatar' && (
            <div style={{ padding: '10px  0 25px 0' }}>
              {this.state.avatars.map(icon => {
                return (
                  <span
                    id={icon.id}
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
              <form style={{ display: 'inline-block' }}>
                <label
                  className="avatar-upload-btn icon-wrap"
                  title="Upload your own bot icon"
                >
                  <input
                    disabled={this.state.uploadingBotbuilderIconImg}
                    type="file"
                    onChange={
                      this.state.uploadingBotbuilderIconImg
                        ? null
                        : this.handleChangeIconImage
                    }
                    accept="image/x-png,image/gif,image/jpeg"
                  />
                  {this.state.uploadingBotbuilderIconImg ? (
                    <CircularProgress
                      color="rgb(66, 133, 245)"
                      style={{ marginTop: '15px' }}
                      size={30}
                    />
                  ) : (
                    <Add
                      style={{
                        height: '30px',
                        marginTop: '15px',
                        color: 'rgb(66, 133, 245)',
                      }}
                    />
                  )}
                </label>
              </form>
            </div>
          )}
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
            {this.state.loadedSettings && <Grid>{customizeComponents}</Grid>}
            <RaisedButton
              backgroundColor={colors.header}
              label={
                this.state.resetting ? (
                  <CircularProgress color={colors.header} size={32} />
                ) : (
                  'Reset Changes'
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
