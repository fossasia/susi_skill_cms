import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: false,
    };
  }
  render() {
    // Footer Component
    return (
      <div className="footer-wrapper">
        <div className="footer">
          <div className="footer-container">
            <ul className="alignLeft">
              <li>
                <a href="https://chat.susi.ai/overview">Overview</a>
              </li>
              <li>
                <a href="https://chat.susi.ai/blog">Blog</a>
              </li>
              <li>
                <a href="https://github.com/fossasia/susi_skill_cms">Code</a>
              </li>
            </ul>
            <ul className="alignRight">
              <li>
                <a href="https://chat.susi.ai/privacy">Privacy</a>
              </li>
              <li>
                <a href="https://chat.susi.ai/terms">Terms</a>
              </li>
              <li>
                <a href="https://chat.susi.ai/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
