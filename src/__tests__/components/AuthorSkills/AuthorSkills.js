import React from 'react';
import AuthorSkills from '../../../components/AuthorSkills/AuthorSkills';
import { shallow } from 'enzyme';

 it('render AuthorSkills without crashing',()=>{
   shallow(<AuthorSkills open={false} author='' author_url=''/>);
 });
 