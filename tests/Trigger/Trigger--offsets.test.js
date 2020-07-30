/*jshint esversion: 6 */

import { Trigger } from '../../src/Triggers.js';

describe('Trigger', () => {
  const mockElement = {
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
  // Offsets

  test('Threshold calculations based on basis(bottom) focus(top) with offset(10)', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;
    
    const trigger = new Trigger('#test').offset(10);

    expect(trigger.top()).toEqual(1500);
    expect(trigger.threshold()).toEqual(600);
    expect(trigger.thresholdMin()).toEqual(600);
    expect(trigger.thresholdMax()).toEqual(600);
  });

  test('Threshold calculations based on basis(bottom) focus(bottom) with offset(10)', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;
    
    const trigger = new Trigger('#test').focus('bottom').offset(10);

    expect(trigger.top()).toEqual(1500);
    expect(trigger.threshold()).toEqual(1100);
    expect(trigger.thresholdMin()).toEqual(1100);
    expect(trigger.thresholdMax()).toEqual(1100);
  });

  test('Threshold calculations based on basis(top) focus(top) with offset(10)', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;

    const trigger = new Trigger('#test').basis('top').offset(10);

    expect(trigger.threshold()).toBe(1400);
    expect(trigger.thresholdMin()).toBe(1400);
    expect(trigger.thresholdMax()).toBe(1400);
  });

  test('Threshold calculations based on basis(top) focus(bottom) with offset(10)', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;

    const trigger = new Trigger('#test').basis('top').focus('bottom').offset(10);

    expect(trigger.threshold()).toBe(1900);
    expect(trigger.thresholdMin()).toBe(1900);
    expect(trigger.thresholdMax()).toBe(1900);
  });

});