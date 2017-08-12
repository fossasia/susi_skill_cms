import {Component} from 'react';
import PropTypes from 'prop-types';
// import Cookies from 'universal-cookie'

// const cookies = new Cookies();

var deleteCookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

class Logout extends Component {

  constructor(props){
    super(props);
    this.state = {
      'loggedIn' : '',
      'showAdmin' : ''
    }
  }

  componentDidMount(){
    deleteCookie('loggedIn');
    deleteCookie('serverUrl');
    deleteCookie('email');
    deleteCookie('showAdmin');
    this.props.history.push('/');
    window.location.reload();
  }
  render() {

      return  null

  }

};

Logout.propTypes = {
  history: PropTypes.object
};


export default Logout;
