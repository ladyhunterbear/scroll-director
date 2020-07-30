/*jshint esversion: 6 */

import { Trigger } from '../../src/Triggers.js';
// jest.mock('../src/Triggers'); // SoundPlayer is now a mock constructor


// beforeEach(() => {
//   // Clear all instances and calls to constructor and all methods:
//   Trigger.mockClear();
// });

// it('We can check if the consumer called the class constructor', () => {
//   const trigger = new Trigger();
//   expect(Trigger).toHaveBeenCalledTimes(1);
// });

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


  test('Trigger constructor error when no target.', () => {
    console.warn = jest.fn();
    
    const trigger = new Trigger();
    
    expect(console.warn).toHaveBeenCalledWith('Missing target');
  });

  test('DOM element called by ID', () => {
    document.getElementById = jest.fn();
    const trigger = new Trigger('#test');
    expect(document.getElementById).toHaveBeenCalledTimes(1);
  });

  test('DOM element called by class name', () => {
    document.getElementsByClassName = jest.fn();
    const trigger = new Trigger('.test');
    expect(document.getElementsByClassName).toHaveBeenCalledTimes(1);
  });

  test('DOM element called by data attribute', () => {
    document.querySelectorAll = jest.fn();
    const trigger = new Trigger('[data-test]');
    expect(document.querySelectorAll).toHaveBeenCalledTimes(1);
  });

  test('DOM element called by tag name', () => {
    document.getElementsByTagName = jest.fn();
    const trigger = new Trigger('div');
    expect(document.getElementsByTagName).toHaveBeenCalledTimes(1);
  });

  test('Warn when DOM element does not exist', () => {
    console.warn = jest.fn();
    document.getElementById = () => { return null; };
    const trigger = new Trigger('#invalid');
    expect(trigger.element()).toBeUndefined();
  });


  // Sides

  test("Default threshold calculations by side where basis(bottom) and focus(top)", () => {
    console.log = jest.fn();  
    document.getElementById = () => { return mockElement; }; 
    window.innerHeight = 1000;

    const trigger = new Trigger('#test');
    
    expect(trigger.element()).toEqual(mockElement);
    expect(trigger.top()).toEqual(1500);
    expect(trigger.bottom()).toEqual(2000);
    expect(trigger.threshold()).toEqual(500);
    expect(trigger.thresholdMin()).toEqual(500);
    expect(trigger.thresholdMax()).toEqual(500);
  });

  test('Threshold calculations based on basis(bottom) focus(bottom)', () => {
    console.log = jest.fn();  
    document.getElementById = () => { return mockElement; }; 
    window.innerHeight = 1000;

    const trigger = new Trigger('#test').focus('bottom');

    expect(trigger.threshold()).toBe(1000);
    expect(trigger.thresholdMin()).toBe(1000);
    expect(trigger.thresholdMax()).toBe(1000);
  });

  test('Threshold calculations based on basis(bottom) focus(y)', () => {
    console.log = jest.fn();  
    document.getElementById = () => { return mockElement; }; 
    window.innerHeight = 1000;

    const trigger = new Trigger('#test').focus('y');

    expect(trigger.threshold()).toBe(500);
    expect(trigger.thresholdMin()).toBe(500);
    expect(trigger.thresholdMax()).toBe(1000);
  });

  test('Threshold calculations based on basis(top) focus(top)', () => {
    console.log = jest.fn();  
    document.getElementById = () => { return mockElement; }; 
    window.innerHeight = 1000;

    const trigger = new Trigger('#test').basis('top');

    expect(trigger.threshold()).toBe(1500);
    expect(trigger.thresholdMin()).toBe(1500);
    expect(trigger.thresholdMax()).toBe(1500);
  });

  test('Threshold calculations based on basis(top) focus(bottom)', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;

    const trigger = new Trigger('#test').basis('top').focus('bottom');

    expect(trigger.threshold()).toBe(2000);
    expect(trigger.thresholdMin()).toBe(2000);
    expect(trigger.thresholdMax()).toBe(2000);
  });


  test('Threshold calculations based on basis(top) focus(y)', () => {
    console.log = jest.fn();
    document.getElementById = () => { return mockElement; };
    window.innerHeight = 1000;

    const trigger = new Trigger('#test').basis('top').focus('y');

    expect(trigger.threshold()).toBe(1500);
    expect(trigger.thresholdMin()).toBe(1500);
    expect(trigger.thresholdMax()).toBe(2000);
  });

}); // end describe



