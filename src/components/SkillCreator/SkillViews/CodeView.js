import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'antd/lib/icon';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/mode/java';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import 'brace/ext/searchbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import createActions from '../../../redux/actions/create';

const fontsizes = [];
const codeEditorThemes = [];

const styles = {
  codeEditor: {
    width: '100%',
    marginTop: '20px',
  },
  toolbar: {
    width: '100%',
    height: '50px',
    background: '#fff',
    borderBottom: '2px solid #eee',
    display: 'none',
    alignItems: 'stretch',
    padding: '0 25px',
    fontSize: '14px',
  },
  button: {
    display: 'flex',
    marginRight: '30px',
    alignItems: 'center',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '5px',
  },
};

class CodeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      commitMessage: '',
      fontSizeCode: 14,
      editorTheme: 'github',
    };
    let fonts = [14, 16, 18, 20, 24, 28, 32, 40];
    let themes = [
      'monokai',
      'github',
      'tomorrow',
      'kuroir',
      'twilight',
      'xcode',
      'textmate',
      'solarized_dark',
      'solarized_light',
      'terminal',
    ];
    for (let i = 0; i < fonts.length; i++) {
      fontsizes.push(
        <MenuItem value={fonts[i]} key={fonts[i]}>
          {`${fonts[i]}`}
        </MenuItem>,
      );
    }
    for (let i = 0; i < themes.length; i++) {
      codeEditorThemes.push(
        <MenuItem value={themes[i]} key={themes[i]}>
          {`${themes[i]}`}
        </MenuItem>,
      );
    }
  }

  onChange = newValue => {
    const { actions } = this.props;
    const match = newValue.match(/^::image\s(.*)$/m);
    const nameMatch = newValue.match(/^::name\s(.*)$/m);
    const categoryMatch = newValue.match(/^::category\s(.*)$/m);
    const languageMatch = newValue.match(/^::language\s(.*)$/m);

    const payload = {
      name: nameMatch ? nameMatch[1] : '',
      category: categoryMatch ? categoryMatch[1] : '',
      language: languageMatch ? languageMatch[1] : '',
      imageUrl: match ? match[1] : '',
      code: newValue,
    };
    actions.setSkillData(payload);
  };

  handleCommitMessageChange = event => {
    this.setState({
      commitMessage: event.target.value,
    });
  };

  handleFontChange = (event, index, value) => {
    this.setState({
      fontSizeCode: value,
    });
  };

  handleThemeChange = (event, index, value) => {
    this.setState({
      editorTheme: value,
    });
  };

  render() {
    const { codeEditor, toolbar, button, icon } = styles;
    const { code } = this.props;
    return (
      <div>
        <div
          style={{
            width: '100%',
            padding: '0px',
          }}
        >
          <div style={codeEditor}>
            {this.state.loading && <LinearProgress color="primary" />}
            <div style={toolbar}>
              <span style={button}>
                <Icon type="cloud-download" style={icon} />Download as text
              </span>
              <span style={button}>
                Size{' '}
                <Select
                  style={{ width: '60px' }}
                  onChange={this.handleFontChange}
                >
                  {fontsizes}
                </Select>
              </span>

              <span style={button}>
                Theme{' '}
                <Select
                  style={{ width: '150px' }}
                  onChange={this.handleThemeChange}
                >
                  {codeEditorThemes}
                </Select>
              </span>
            </div>
            <AceEditor
              mode="java"
              theme={this.state.editorTheme}
              width="100%"
              fontSize={this.state.fontSizeCode}
              height="400px"
              value={code}
              showPrintMargin={false}
              name="skill_code_editor"
              onChange={this.onChange}
              scrollPastEnd={false}
              wrapEnabled={true}
              readOnly={!this.props.editable}
              editorProps={{ $blockScrolling: true }}
              style={{
                resize: 'vertical',
                minHeight: '200px',
                maxHeight: '560px',
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

CodeView.propTypes = {
  editable: PropTypes.bool,
  actions: PropTypes.object,
  code: PropTypes.string,
};

function mapStateToProps(store) {
  return {
    code: store.create.skill.code,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(createActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeView);
