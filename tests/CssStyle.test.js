/*jshint esversion: 6 */

import { CssStyle } from '../src/CssStyle';


test('Style constructor missing style property', () => {
  console.log = jest.fn();

  const style = new CssStyle();

  expect(console.log).toHaveBeenCalledWith('Missing style property.');
});


// test('Invalid property type in Style constructor', () => {
//   console.log = jest.fn();

//   const style = new Style('height', 100, 200, 'invalid-property-type');

//   expect(console.log).toHaveBeenCalledWith('Invalid property type used for new Style.');
// });


// test('Style accepts all valid property types including no value', () => {
//   console.log = jest.fn();

//   // passing cases
//   const style = new Style('height', 100, 200, 'px');
//   const style2 = new Style('height', 100, 200, 'percent');
//   const style3 = new Style('font-size', 1, 1.2, 'rem');
//   const style4 = new Style('font-size', 1, 0.75, 'em');
//   const style5 = new Style('height', 100, 200, 'vw');
//   const style6 = new Style('height', 100, 200, 'vh');
//   const style7 = new Style('margin-top', 0, 10);

//   // failing cases
//   const style8 = new Style('margin-top', 100, 100, 'x');

//   expect(console.log).toHaveBeenCalledTimes(1);
// });


// test('Style start property accepts numbers and strings', () => {
//   console.log = jest.fn();

//   // passing cases
//   const style1 = new Style('font-size', 1, 1, 'em');
//   const style2 = new Style('display', 'block', 'block');

//   // failing cases
//   const style3 = new Style('display', true, 'block');
//   const style4 = new Style('display', [1,2,3], 'block'); 

//   expect(console.log).toHaveBeenCalledTimes(2);
// });


// test('Style end property accepts numbers and strings', () => {
//   console.log = jest.fn();

//   // passing cases
//   const style1 = new Style('font-size', 1, 1, 'em');
//   const style2 = new Style('display', 'block', 'block');

//   // failing cases
//   const style3 = new Style('display', 'block', false);
//   const style4 = new Style('display', 'block', [1,2,3]); 

//   expect(console.log).toHaveBeenCalledTimes(2);
// });


// test('Get Range value returns the expected value', () => {
//   let passing = true;

//   const style = new Style('opacity', 0, 1);

//   if ('0.5' !== style.getRangeValue(0.5)) {
//     passing = false;
//   }

//   if ('0.6' !== style.getRangeValue(0.6)) {
//     passing = false;
//   }

//   const style2 = new Style('top', 500, 1000, 'px');

//   if ('750px' !== style2.getRangeValue(0.5)) {
//     passing = false;
//   }

//   expect(passing).toBe(true);
// });


// test('Get start value', () => {
//   const style = new Style('top', 500, 1000, 'px');

//   const startValue = style.getStartValue();

//   expect(startValue).toBe('500px');
// });


// test('Get end value', () => {
//   const style = new Style('top', 500, 1000, 'px');

//   const endValue = style.getEndValue();

//   expect(endValue).toBe('1000px');
// });


// test('getRangeHexColor', () => {
//   const style = new Style('color', '#FFFFFF', '#000000');

//   const colorRangeValue = style.getRangeHexColor(0.5);

//   expect(colorRangeValue).toBe('#');
// });