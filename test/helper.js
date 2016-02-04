import sinon from 'sinon';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

global.sinon = sinon;
global.React = React;
global.expect = expect;
global.shallow = shallow;