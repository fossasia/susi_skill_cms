import React, { Component } from 'react';
import susi from '../images/susi-logo.svg';
import './Footer.css';
import { Link } from 'react-router-dom';

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
          <div className="footer-left">
            <Link to="/">
              <img src={susi} alt="SUSI" className="susi-logo" />
            </Link>
            <ul>
              <li>
                <a href="https://chat.susi.ai/overview">Overview</a>
              </li>
              <li>
                <a href="https://chat.susi.ai/blog">Blog</a>
              </li>
              <li>
                <a href="https://api.susi.ai">API</a>
              </li>
              <li>
                <a href="https://github.com/fossasia/susi_skill_cms">Code</a>
              </li>
            </ul>
          </div>
          <ul>
            <li>
              <a href="https://chat.susi.ai/contact">Contact</a>
            </li>
            <li>
              <a href="https://chat.susi.ai/terms">Terms</a>
            </li>
            <li>
              <a href="https://chat.susi.ai/privacy">Privacy</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Footer;
