import React from 'react';
import { shallow } from 'enzyme';
import { Recommand } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Recommand />);
  expect(renderedComponent.find('.home-recommand').length).toBe(1);
});
