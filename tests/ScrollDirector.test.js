/*jshint esversion: 6 */

import ScrollDirector from '../src/ScrollDirector.js';
// jest.mock('../src/ScrollDirector'); // ScrollDirector is now a mock constructor

const window = {};

describe('Scroll Director', () => {
  it('init error if no triggers', () => {
    console.warn = jest.fn();
    const SD = new ScrollDirector();
    SD.init();

    expect(console.warn).toHaveBeenCalledWith('Add triggers before calling init.');
  });

  
});