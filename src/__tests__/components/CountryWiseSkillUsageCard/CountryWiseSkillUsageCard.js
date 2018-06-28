import React from 'react';
import CountryWiseSkillUsageCard from '../../../components/CountryWiseSkillUsageCard/CountryWiseSkillUsageCard';
import { shallow } from 'enzyme';

describe('<CountryWiseSkillUsageCard />', () => {
  it('render CountryWiseSkillUsageCard without crashing', () => {
    shallow(<CountryWiseSkillUsageCard />);
  });
});
