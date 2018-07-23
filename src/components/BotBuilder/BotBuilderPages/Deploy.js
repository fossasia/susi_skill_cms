import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import Cookies from 'universal-cookie';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const cookies = new Cookies();
const host = window.location.protocol + '//' + window.location.host;
class Deploy extends Component {
  constructor() {
    super();
    this.state = {
      copied: false,
    };
  }
  render() {
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
              id=&quot;susi-bot-script&quot; data-token=&quot;{cookies.get(
                'loggedIn',
              )}&quot; src=&quot;{host}/susi-chatbot.js&quot;&gt;&lt;/script&gt;
            </code>
            <CopyToClipboard
              text={
                "<script type='text/javascript' id='susi-bot-script' data-token='" +
                cookies.get('loggedIn') +
                "' src='" +
                host +
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

export default Deploy;
