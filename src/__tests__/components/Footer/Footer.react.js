import React from 'react';
import Footer from '../../../components/Footer/Footer.react';
import { shallow } from 'enzyme';

describe('<Footer />', () => {
  it('render Footer without crashing', () => {
    shallow(<Footer />);
  });
});
