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
  // Ranges

  test('Range calculations based on basis(bottom) focus(top) with range(10)', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;
    
    const trigger = new Trigger('#test').range(10);

    expect(trigger.threshold()).toEqual(500);
    expect(trigger.thresholdMin()).toEqual(500);
    expect(trigger.thresholdMax()).toEqual(600);
  });

  test('Range calculations based on basis(bottom) focus(bottom) with range(10)', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;
    
    const trigger = new Trigger('#test').focus('bottom').range(10);

    expect(trigger.threshold()).toEqual(1000);
    expect(trigger.thresholdMin()).toEqual(1000);
    expect(trigger.thresholdMax()).toEqual(1100);
  });

  test('Range calculations based on basis(top) focus(top) with range(10)', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;
    
    const trigger = new Trigger('#test').basis('top').range(10);

    expect(trigger.threshold()).toEqual(1400);
    expect(trigger.thresholdMin()).toEqual(1400);
    expect(trigger.thresholdMax()).toEqual(1500);
  });

  test('Range calculations based on basis(top) focus(bottom) with range(10)', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;
    
    const trigger = new Trigger('#test').basis('top').focus('bottom').range(10);

    expect(trigger.threshold()).toEqual(1900);
    expect(trigger.thresholdMin()).toEqual(1900);
    expect(trigger.thresholdMax()).toEqual(2000);
  });

  test('Range calculations based on basis(bottom) focus(spanY) range()', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;
    
    const trigger = new Trigger('#test').focus('spanY').range();

    expect(trigger.threshold()).toEqual(500);
    expect(trigger.thresholdMin()).toEqual(500);
    expect(trigger.thresholdMax()).toEqual(1500);
  });

  test('Range calculations based on basis(top) focus(y) range(50)', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;
    
    const trigger = new Trigger('#test').basis('top').focus('y').range(50);

    expect(trigger.threshold()).toEqual(1000);
    expect(trigger.thresholdMin()).toEqual(1000);
    expect(trigger.thresholdMax()).toEqual(2000);
  });
});