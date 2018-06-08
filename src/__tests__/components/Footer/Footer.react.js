import React from 'react';
import Footer from '../../../components/Footer/Footer.react';
import { shallow } from 'enzyme';

 it('render Footer without crashing',()=>{
   shallow(<Footer />);
 });
