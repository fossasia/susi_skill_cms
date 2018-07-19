import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as $ from 'jquery';
import Cookies from 'universal-cookie';
import { Grid, Col, Row } from 'react-flexbox-grid';
import AceEditor from 'react-ace';
import Snackbar from 'material-ui/Snackbar';
import TiTick from 'react-icons/lib/ti/tick';
import CircularProgress from 'material-ui/CircularProgress';
import Close from 'material-ui/svg-icons/navigation/close';
import PropTypes from 'prop-types';
import ColorPicker from 'material-ui-color-picker';
import colors from '../../../Utils/colors';
import urls from '../../../Utils/urls';
import avatars from '../../../Utils/avatars';

const cookies = new Cookies();
let BASE_URL = urls.API_URL;
let IMAGE_GET_URL = 'https://api.susi.ai/cms/getImage.png?image=';

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
      uploadingBodyBackgroundImg: false,
      botbuilderBodyBackgroundImgName: '',
      botbuilderIconImgName: '',
      uploadingBotbuilderIconImg: false,
      editorTheme: 'github',
      fontSizeCode: 14,
      code: this.props.code,
    };
    this.getSettings();
    this.handleChangeCode = this.handleChangeCode.bind(this);
  }

  componentDidMount() {
    this.updateSettings();
  }

  updateSettings = () => {
    let settingsString = JSON.stringify(this.state);
    this.props.updateSettings(settingsString);
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
        () => this.updateSettings(),
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
        () => this.updateSettings(),
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
        () => this.updateSettings(),
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
        () => this.updateSettings(),
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
        () => this.updateSettings(),
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
        () => this.updateSettings(),
      );
    }
  };

  handleChangeCode(newValue) {
    const bodyBackgroundMatch = newValue.match(/^::bodyBackground\s(.*)$/m);
    const bodyBackgroundImgMatch = newValue.match(
      /^::bodyBackgroundImage\s(.*)$/m,
    );
    const userMessageBoxBackgroundMatch = newValue.match(
      /^::userMessageBoxBackground\s(.*)$/m,
    );
    const userMessageTextColorMatch = newValue.match(
      /^::userMessageTextColor\s(.*)$/m,
    );
    const botMessageBoxBackgroundMatch = newValue.match(
      /^::botMessageBoxBackground\s(.*)$/m,
    );
    const botMessageTextColorMatch = newValue.match(
      /^::botMessageTextColor\s(.*)$/m,
    );
    const botIconColorMatch = newValue.match(/^::botIconColor\s(.*)$/m);
    const botIconImageMatch = newValue.match(/^::botIconImage\s(.*)$/m);

    if (bodyBackgroundMatch) {
      this.setState({
        botbuilderBackgroundBody: bodyBackgroundMatch[1],
      });
    }

    if (bodyBackgroundImgMatch) {
      this.setState({
        botbuilderBodyBackgroundImg: bodyBackgroundImgMatch[1],
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
      this.setState({
        botbuilderIconImg: botIconImageMatch[1],
      });
    }
    this.setState({
      code: newValue,
    });
  }

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
      url: 'https://api.susi.ai/cms/uploadImage.json',
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
          () => self.updateSettings(),
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
      url: 'https://api.susi.ai/cms/uploadImage.json',
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
          () => self.updateSettings(),
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
      () => this.updateSettings(),
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
    this.setState({ code, botbuilderIconImg }, () => this.updateSettings());
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
      () => this.updateSettings(),
    );
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
        key: 'botbuilderBodyBackgroundImgName',
        value: this.state.botbuilderBodyBackgroundImgName,
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
      {
        key: 'botbuilderIconImgName',
        value: this.state.botbuilderIconImgName,
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
    if (cookies.get('loggedIn')) {
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
                botbuilderBackgroundBody:
                  '#' + settings.botbuilderBackgroundBody,
              });
              this.handleChangeColor(
                'botbuilderBackgroundBody',
                settings.botbuilderBackgroundBody,
              );
            }
            if (settings.botbuilderBodyBackgroundImg) {
              let img = settings.botbuilderBodyBackgroundImg;
              let code = this.state.code.replace(
                /^::bodyBackgroundImage\s(.*)$/m,
                `::bodyBackgroundImage ${img}`,
              );
              this.setState({
                botbuilderBodyBackgroundImg: img,
                code,
              });
            }
            if (settings.botbuilderBodyBackgroundImgName) {
              this.setState({
                botbuilderBodyBackgroundImgName:
                  settings.botbuilderBodyBackgroundImgName,
              });
            }
            if (settings.botbuilderUserMessageBackground) {
              this.setState({
                botbuilderUserMessageBackground:
                  '#' + settings.botbuilderUserMessageBackground,
              });
              this.handleChangeColor(
                'botbuilderUserMessageBackground',
                settings.botbuilderUserMessageBackground,
              );
            }
            if (settings.botbuilderUserMessageTextColor) {
              this.setState({
                botbuilderUserMessageTextColor:
                  '#' + settings.botbuilderUserMessageTextColor,
              });
              this.handleChangeColor(
                'botbuilderUserMessageTextColor',
                settings.botbuilderUserMessageTextColor,
              );
            }
            if (settings.botbuilderBotMessageBackground) {
              this.setState({
                botbuilderBotMessageBackground:
                  '#' + settings.botbuilderBotMessageBackground,
              });
              this.handleChangeColor(
                'botbuilderBotMessageBackground',
                settings.botbuilderBotMessageBackground,
              );
            }
            if (settings.botbuilderBotMessageTextColor) {
              this.setState({
                botbuilderBotMessageTextColor:
                  '#' + settings.botbuilderBotMessageTextColor,
              });
              this.handleChangeColor(
                'botbuilderBotMessageTextColor',
                settings.botbuilderBotMessageTextColor,
              );
            }
            if (settings.botbuilderIconColor) {
              this.setState({
                botbuilderIconColor: '#' + settings.botbuilderIconColor,
              });
              this.handleChangeColor(
                'botbuilderIconColor',
                settings.botbuilderIconColor,
              );
            }
            if (settings.botbuilderIconImg) {
              let code = this.state.code.replace(
                /^::botIconImage\s(.*)$/m,
                `::botIconImage ${settings.botbuilderIconImg}`,
              );
              this.setState({
                code,
                botbuilderIconImg: settings.botbuilderIconImg,
              });
              this.handleChangeColor(
                'botbuilderIconImg',
                settings.botbuilderIconImg,
              );
            }
            if (settings.botbuilderIconImgName) {
              this.setState({
                botbuilderIconImgName: settings.botbuilderIconImgName,
              });
            }
            this.setState(() => this.updateSettings());
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
          this.setState({
            loadedSettings: true,
          });
        }.bind(this),
        error: function(error) {
          this.setState({
            openSnackbar: true,
            msgSnackbar: "Couldn't get settings. Please try login again",
          });
        }.bind(this),
      });
    }
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
        key: 'botbuilderBodyBackgroundImgName',
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
      {
        key: 'botbuilderIconImgName',
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
        () => this.updateSettings(),
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
        <div className="center menu-page">
          <h2 style={{ lineHeight: '50px', textAlign: 'left' }}>
            2. Design your bot
          </h2>
          <div style={{ padding: '20px 10px 0 10px' }}>
            <AceEditor
              mode="java"
              theme={this.state.editorTheme}
              width="100%"
              fontSize={this.state.fontSizeCode}
              height="200px"
              value={this.state.code}
              onChange={this.handleChangeCode}
              showPrintMargin={false}
              name="skill_code_editor"
              scrollPastEnd={false}
              wrapEnabled={true}
              editorProps={{ $blockScrolling: true }}
              style={{
                resize: 'vertical',
                overflowY: 'scroll',
                minHeight: '200px',
              }}
            />
          </div>
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
                disabled={
                  this.state.uploadingBodyBackgroundImg ||
                  this.state.uploadingBotbuilderIconImg
                }
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
      </div>
    );
  }
}

Design.propTypes = {
  updateSettings: PropTypes.func,
  code: PropTypes.string,
};

export default Design;
