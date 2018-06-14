import Cookies from 'universal-cookie';

const cookies = new Cookies();

function setDefaults() {
  if (!cookies.get('settings')) {
    let vals = {
      theme: 'light',
    };
    let settings = Object.assign({}, vals);
    cookies.set('settings', settings);
  }
}
export default setDefaults;
