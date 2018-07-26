import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const cookies = new Cookies();
const api = window.location.protocol + '//' + window.location.host;
class Deploy extends Component {
  constructor() {
    super();
    this.state = {
      copied: false,
    };
  }
  render() {
    let { group, language, skill } = this.props;
    return (
      <div className="menu-page">
        <h1 style={{ lineHeight: '50px' }}>
          4. Deploy your bot to your own website
        </h1>
        <br />
        <div className="code-wrap show">
          <div className="code-box">
            <code>
              &lt;script type=&quot;text/javascript&quot;
              id=&quot;susi-bot-script&quot; data-userid=&quot;{cookies.get(
                'uuid',
              )}&quot; data-group=&quot;{group}&quot; data-language=&quot;{
                language
              }&quot; data-skill=&quot;{skill}&quot; src=&quot;{api}/susi-chatbot.js&quot;
              &gt; &lt;/script&gt;
            </code>
            <CopyToClipboard
              text={
                "<script type='text/javascript' id='susi-bot-script' data-userid='" +
                cookies.get('uuid') +
                "' data-group='" +
                group +
                "' data-language='" +
                language +
                "' data-skill='" +
                skill +
                "' src='" +
                api +
                "/susi-chatbot.js'></script>"
              }
              onCopy={() => this.setState({ copied: true })}
            >
              <span className="copy-button">copy</span>
            </CopyToClipboard>
          </div>
          <h4>
            Paste the above code just above <i>&lt;/body&gt;</i>
            &nbsp;tag in your website.
          </h4>
        </div>
        <Snackbar
          open={this.state.copied}
          message="Copied to clipboard!"
          autoHideDuration={2000}
          onRequestClose={() => {
            this.setState({ copied: false });
          }}
        />
      </div>
    );
  }
}

Deploy.propTypes = {
  group: PropTypes.string,
  language: PropTypes.string,
  skill: PropTypes.string,
};
export default Deploy;
