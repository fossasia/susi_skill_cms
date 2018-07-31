import React from 'react';
import Icon from 'antd/lib/icon';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
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
import LinearProgress from 'material-ui/LinearProgress';
import { colors } from '../../../utils';

const fontsizes = [];
const codeEditorThemes = [];
let self;

export default class CodeView extends React.Component {
  componentDidMount() {
    self = this;
    if (this.props.skillCode) {
      this.setState({
        code: this.props.skillCode,
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      groupSelect: true,
      languageSelect: true,
      expertSelect: true,
      showImage: false,
      loading: false,
      file: null,
      imageUrl: '<image_url>',
      commitMessage: '',
      modelValue: null,
      groupValue: null,
      languageValue: null,
      expertValue: '',
      code:
        '::name <Skill_name>\n::category <Category>\n::language <Language>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query',
      fontSizeCode: 14,
      editorTheme: 'github',
      groups: [],
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom',
      },
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
        <MenuItem
          value={fonts[i]}
          key={fonts[i]}
          primaryText={`${fonts[i]}`}
        />,
      );
    }
    for (let i = 0; i < themes.length; i++) {
      codeEditorThemes.push(
        <MenuItem
          value={themes[i]}
          key={themes[i]}
          primaryText={`${themes[i]}`}
        />,
      );
    }
  }

  onChange = newValue => {
    const match = newValue.match(/^::image\s(.*)$/m);
    const nameMatch = newValue.match(/^::name\s(.*)$/m);
    const categoryMatch = newValue.match(/^::category\s(.*)$/m);
    const languageMatch = newValue.match(/^::language\s(.*)$/m);

    self.setState(
      {
        expertValue: nameMatch ? nameMatch[1] : '',
        groupValue: categoryMatch ? categoryMatch[1] : '',
        languageValue: languageMatch ? languageMatch[1] : '',
        imageUrl: match ? match[1] : '',
        code: newValue,
      },
      () => self.sendInfoToProps(),
    );
  };

  handleCommitMessageChange = event => {
    this.setState(
      {
        commitMessage: event.target.value,
      },
      () => self.sendInfoToProps(),
    );
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

  sendInfoToProps = () => {
    if (this.props.sendInfoToProps) {
      this.props.sendInfoToProps({
        code: this.state.code,
        expertValue: this.state.expertValue,
        groupValue: this.state.groupValue,
        languageValue: this.state.languageValue,
        imageUrl: this.state.imageUrl,
      });
    }
  };

  render() {
    return (
      <div>
        <div
          style={{
            width: '100%',
            padding: '0px',
          }}
        >
          <div style={styles.codeEditor}>
            {this.state.loading && (
              <LinearProgress mode="indeterminate" color={colors.header} />
            )}
            <div style={styles.toolbar}>
              <span style={styles.button}>
                <Icon type="cloud-download" style={styles.icon} />Download as
                text
              </span>
              <span style={styles.button}>
                Size{' '}
                <SelectField
                  style={{ width: '60px' }}
                  onChange={this.handleFontChange}
                >
                  {fontsizes}
                </SelectField>
              </span>

              <span style={styles.button}>
                Theme{' '}
                <SelectField
                  style={{ width: '150px' }}
                  onChange={this.handleThemeChange}
                >
                  {codeEditorThemes}
                </SelectField>
              </span>
            </div>
            <AceEditor
              mode="java"
              theme={this.state.editorTheme}
              width="100%"
              fontSize={this.state.fontSizeCode}
              height="400px"
              value={this.state.code}
              showPrintMargin={false}
              name="skill_code_editor"
              onChange={this.onChange}
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
        </div>
      </div>
    );
  }
}

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
  loggedInError: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '100px',
    fontSize: '50px',
    marginTop: '300px',
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
  customWidth: {
    width: 50,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};
CodeView.propTypes = {
  skillCode: PropTypes.string,
  sendInfoToProps: PropTypes.func,
};
