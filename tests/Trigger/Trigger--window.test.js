/*jshint esversion: 6 */

import { Trigger } from '../../src/Triggers.js';

describe('Trigger', () => {
  let mockElement = {
    getBoundingClientRect: () => {
      return {
        top: 1500,
        left: 0,
        bottom: 2000,
        right: 1000,
        height: 500,
        width: 1000,
      }; 
    }
  };

  // All
  test( 'Range calculations based on basis(top) focus(y) offset(25) range(50)', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;
    
    const trigger = new Trigger('#test').basis('bottom').focus('y').offset(25).range(50);

    expect(trigger.threshold()).toEqual(750);
    expect(trigger.thresholdMin()).toEqual(750);
    expect(trigger.thresholdMax()).toEqual(1750);
  });


  test( 'State \'initial\' when top before threshold for basis(bottom) focus(top)' , () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
     mockElement = {
      getBoundingClientRect: () => {
        return {
          top: 1,
          left: 0,
          bottom: 501,
          right: 1000,
          height: 500,
          width: 1000,
        };
      }
    };

    window.innerHeight = 1000;
  
    const trigger = new Trigger('#test').class('on');

    expect(trigger.state() === 'initial');
  });

  test( 'State \'on\' when top past threshold for basis(bottom) focus(top)' , () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
     mockElement = {
      getBoundingClientRect: () => {
        return {
          top: -1,
          left: 0,
          bottom: 499,
          right: 1000,
          height: 500,
          width: 1000,
        };
      }
    };

    window.innerHeight = 1000;
  
    const trigger = new Trigger('#test').class('on');

    expect(trigger.state() === 'on');
  });

  
  test( 'State \'final\' when top past threshold for basis(bottom) focus(y) range(50)' , () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
     mockElement = {
      getBoundingClientRect: () => {
        return {
          top: -501,
          left: 0,
          bottom: 499,
          right: 1000,
          height: -1,
          width: 1000,
        };
      }
    };

    window.innerHeight = 1000;
  
    const trigger = new Trigger('#test').class('on');

    expect(trigger.state() === 'final');
  });
});