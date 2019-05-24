import React from 'react';
import Lozenge from '../../../components/Commons/Lozenge';
import { shallow } from 'enzyme';

describe('<Lozenge />', () => {
  it('render Lozenge without crashing', () => {
    shallow(<Lozenge />);
  });
});
