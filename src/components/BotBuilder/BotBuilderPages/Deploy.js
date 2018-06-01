import React, {Component} from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Deploy extends Component {

  render() {
    return (
      <div className="menu-page">
        <div className='code-wrap show'>
          <div className="code-box">
            <code>
              &lt;script type=&quot;text/javascript&quot; id=&quot;susi-bot-script&quot; data-token=&quot;{cookies.get('loggedIn')}&quot; src=&quot;https://skills.susi.ai/susi-chatbot.js&quot;&gt;&lt;/script&gt;
            </code>
          </div>
          <h4>Paste the above code just above <i>&lt;/body&gt;</i>
          &nbsp;tag in your website</h4>
        </div>
      </div>
    );
  }
}


export default Deploy;
