import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-flexbox-grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uiActions from '../../../../redux/actions/ui';
import createActions from '../../../../redux/actions/create';
import Close from '@material-ui/icons/Close';
import Add from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ColorPicker from 'material-ui-color-picker';
import { urls, colors, avatars } from '../../../../utils';
import TiTick from 'react-icons/lib/ti/tick';
let BASE_URL = urls.API_URL;
let IMAGE_GET_URL = `${BASE_URL}/cms/getImage.png?image=`;

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

class UIView extends Component {
  constructor(props) {
    super(props);
    let avatarsIcons = avatars.slice();
    this.state = {
      loadedSettings: false,
      uploadingBodyBackgroundImg: false,
      botbuilderBodyBackgroundImgName: '',
      uploadingBotbuilderIconImg: false,
      avatars: avatarsIcons,
      originalAvatarsCount: avatarsIcons.length,
      showBackgroundImageChange: false,
    };
  }

  componentDidMount() {
    this.getSettings();
  }

  handleChangeColor = (component, color) => {
    const { actions } = this.props;
    if (!color.startsWith('#')) {
      color = '#' + color;
    }
    actions.setDesignComponentColor({ component, color });
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
    const { actions, accessToken } = this.props;
    let form = new FormData();
    form.append('image', file);
    form.append('access_token', accessToken);
    form.append('image_name', file.name);
    this.setState({ uploadingBodyBackgroundImg: true });
    actions
      .setBotBackgroundImage(form)
      .then(payload => {
        this.setState({
          uploadingBodyBackgroundImg: false,
        });
      })
      .catch(error => {
        this.setState({
          uploadingBodyBackgroundImg: false,
        });
        actions.openSnackBar({
          snackBarMessage: "Error! Couldn't upload image",
          snackBarDuration: 2000,
        });
      });
  };

  uploadImageIcon = file => {
    const { actions, accessToken } = this.props;
    let form = new FormData();
    form.append('access_token', accessToken);
    form.append('image_name', file.name);
    form.append('image', file);
    actions
      .setBotAvatar(form)
      .then(({ payload }) => {
        const { imagePath } = payload;
        let imgUrl = IMAGE_GET_URL + imagePath;
        let avatarsObj = this.state.avatars;
        let imgObj = {
          id: avatarsObj.length,
          url: imgUrl,
        };
        this.handleIconSelect(imgObj);
        avatarsObj.push(imgObj);
        this.setState({
          avatars: avatarsObj,
          uploadingBotbuilderIconImg: false,
        });
      })
      .catch(error => {
        this.setState({
          uploadingBotbuilderIconImg: false,
        });
        actions.openSnackBar({
          snackBarMessage: "Error! Couldn't upload image",
          snackBarDuration: 2000,
        });
      });
  };

  handleRemoveUrlBody = () => {
    let {
      actions,
      design: { code },
    } = this.props;
    code = code.replace(
      /^::bodyBackgroundImage\s(.*)$/m,
      '::bodyBackgroundImage ',
    );
    actions.updateDesignData({
      code,
      botbuilderBodyBackgroundImg: '',
      botbuilderBodyBackgroundImgName: '',
    });
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
    let {
      actions,
      design: { code },
    } = this.props;
    code = code.replace(/^::botIconImage\s(.*)$/m, '::botIconImage ');
    actions.updateDesignData({
      code,
      botbuilderIconImg: '',
    });
    this.setState({
      iconSelected: null,
    });
  };

  getSettings = () => {
    const { code } = this.props.design;
    const botIconImageMatch = code.match(/^::botIconImage\s(.*)$/m);

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
      });
    }

    this.setState({
      loadedSettings: true,
    });
  };

  handleReset = () => {
    // reset to default values
    const { actions } = this.props;
    this.setState({ loadedSettings: false });
    let avatarsIcons = this.state.avatars.slice(
      0,
      this.state.originalAvatarsCount,
    );
    actions.resetDesignData().then(() => {
      this.setState({
        loadedSettings: true,
        iconSelected: 0,
        avatars: avatarsIcons,
      });
    });
  };

  handleIconSelect = icon => {
    let {
      actions,
      design: { code },
    } = this.props;
    if (icon.id === this.state.iconSelected) {
      code = code.replace(/^::botIconImage\s(.*)$/m, '::botIconImage ');
      actions.updateDesignData({ code, botbuilderIconImg: '' });
      this.setState({
        iconSelected: null,
      });
    } else {
      code = code.replace(
        /^::botIconImage\s(.*)$/m,
        `::botIconImage ${icon.url}`,
      );
      actions.updateDesignData({ code, botbuilderIconImg: icon.url });
      this.setState({
        iconSelected: icon.id,
      });
    }
  };

  handleClickColorBox = id => {
    document.getElementById(`colorPicker${id}`).click();
  };

  handleShowBackgroundImageChangeToggle = () => {
    let {
      actions,
      design: { code },
    } = this.props;
    let isInputChecked = !this.state.showBackgroundImageChange;
    if (isInputChecked === false) {
      code = code.replace(
        /^::bodyBackgroundImage\s(.*)$/m,
        '::bodyBackgroundImage ',
      );
      actions.updateDesignData({
        code,
        botbuilderBodyBackgroundImg: '',
      });
    }
    this.setState({ showBackgroundImageChange: isInputChecked });
  };

  render() {
    const {
      botbuilderBodyBackgroundImg,
      botbuilderBodyBackgroundImgName,
    } = this.props.design;
    const {
      showBackgroundImageChange,
      uploadingBodyBackgroundImg,
      uploadingBotbuilderIconImg,
      avatars,
      iconSelected,
      loadedSettings,
      resetting,
    } = this.state;
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
                      <FormControlLabel
                        control={
                          <Switch
                            checked={showBackgroundImageChange}
                            onChange={
                              this.handleShowBackgroundImageChangeToggle
                            }
                            color="primary"
                          />
                        }
                        label="Image"
                      />
                    </div>
                  )}
                </div>
              )}
            </Col>
            <Col xs={12} md={6} lg={6}>
              {component.id !== 7 &&
              !(component.id === 1 && showBackgroundImageChange === true) ? (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="color-picker-wrap">
                    <span
                      className="color-box"
                      onClick={() => this.handleClickColorBox(component.id)}
                      style={{
                        backgroundColor: this.props.design[component.component],
                      }}
                    />
                    <ColorPicker
                      className="color-picker"
                      style={{ display: 'inline-block', width: '60px' }}
                      name="color"
                      id={'colorPicker' + component.id}
                      defaultValue={this.props.design[component.component]}
                      onChange={color =>
                        this.handleChangeColor(component.component, color)
                      }
                    />
                  </div>
                </div>
              ) : null}
              {component.component === 'botbuilderBackgroundBody' &&
                showBackgroundImageChange === true && (
                  <div>
                    <br />
                    <form style={{ display: 'inline-block' }}>
                      <label
                        className="file-upload-btn"
                        title="Upload Background Image"
                      >
                        <input
                          disabled={uploadingBodyBackgroundImg}
                          type="file"
                          onChange={this.handleChangeBodyBackgroundImage}
                          accept="image/*"
                        />
                        {uploadingBodyBackgroundImg ? (
                          <CircularProgress color="#ffffff" size={32} />
                        ) : (
                          'Upload Image'
                        )}
                      </label>
                    </form>
                    {botbuilderBodyBackgroundImg && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: '10px',
                        }}
                      >
                        <h3>{botbuilderBodyBackgroundImgName}</h3>
                        <span title="Remove image">
                          <Close
                            className="remove-icon"
                            onClick={this.handleRemoveUrlBody}
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
              {avatars.map(icon => {
                return (
                  <span
                    id={icon.id}
                    key={icon.id}
                    className={
                      'icon-wrap ' +
                      (iconSelected === icon.id ? 'icon-selected' : '')
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
                    disabled={uploadingBotbuilderIconImg}
                    type="file"
                    onChange={
                      uploadingBotbuilderIconImg
                        ? null
                        : this.handleChangeIconImage
                    }
                    accept="image/x-png,image/gif,image/jpeg"
                  />
                  {uploadingBotbuilderIconImg ? (
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
        {!loadedSettings ? (
          <div className="center">
            <CircularProgress size={62} color="#4285f5" />
            <h4>Loading</h4>
          </div>
        ) : (
          <div className="design-box">
            {loadedSettings && <Grid>{customizeComponents}</Grid>}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleReset}
            >
              {resetting ? (
                <CircularProgress color={colors.header} size={32} />
              ) : (
                'Reset Changes'
              )}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

UIView.propTypes = {
  actions: PropTypes.object,
  code: PropTypes.string,
  accessToken: PropTypes.string,
  design: PropTypes.object,
};

function mapStateToProps(store) {
  return {
    accessToken: store.app.accessToken,
    design: store.create.design,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...createActions, ...uiActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UIView);
