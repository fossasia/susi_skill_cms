import React from 'react';
import susi from '../../images/susi-logo.svg';
import './Footer.css';
import { Link } from 'react-router-dom';
import { urls } from '../../utils';
import moment from 'moment';

const Footer = () => {
  // Footer Component
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <Link className="susi-logo-container" to="/">
          <img src={susi} alt="SUSI" className="susi-logo" />
        </Link>
        <div className="footer">
          <div className="footer-left">
            <div className="footer-elements">
              <ul>
                <li>
                  <a href={urls.CHAT_URL + '/overview'}>Overview</a>
                </li>
                <li>
                  <a href={urls.CHAT_URL + '/blog'}>Blog</a>
                </li>
                <li>
                  <a href={urls.API_URL}>API</a>
                </li>
                <li>
                  <a href={urls.CMS_GITHUB_URL}>Code</a>
                </li>
                <li>
                  <a href={urls.CHAT_URL + '/privacy'}>Privacy</a>
                </li>
                <li>
                  <a href={urls.CHAT_URL + '/terms'}>Terms</a>
                </li>
                <li>
                  <a href={urls.CHAT_URL + '/contact'}>Contact</a>
                </li>
              </ul>
            </div>
            <div className="footer-copyright">
              Copyright &copy; {moment().year()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
