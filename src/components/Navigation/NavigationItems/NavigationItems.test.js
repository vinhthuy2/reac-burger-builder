import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from '../../../../../redux-adv-burger-01-async-action-ingredients/redux-adv-burger--01-async-action-ingredients/src/components/Navigation/NavigationItems/NavigationItems';
import NavigationItem from '../../../../../redux-adv-burger-01-async-action-ingredients/redux-adv-burger--01-async-action-ingredients/src/components/Navigation/NavigationItems/NavigationItem/NavigationItem';
configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  it('should render 2 <NavigationItem /> elements if not authenticated', () => {
    const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavigationItem));
  });
});
