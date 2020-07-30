# scroll-director

A lightweight, mobile responsive, developer friendly, performant module for binding events to an element's position within the viewport.  

__Version:__ 0.0.2 *alpha*

__PLEASE NOTE:__ 
*The inspiration of scroll director was to easily recreate the scroll-based events seen on sites like Apple (https://www.apple.com/iphone-11-pro/).  It seeks to provide a simple, cpu-friendly, and consistent way of quickly adding powerful callbacks to create simple state-machine based transformations or for developers to attach custom callbacks.*

*Using scroll directory a developer can quickly do things like the following:*

- *toggle a between two classes (initial and on) based on whether an elements side is before or after a threshold.*
- *toggle a between up to three classes (initial, on, and final) depending on whether an element is before, within, or after a given ranged span of the viewport.*
- *dynamically calculate a style property's value based on an elements position within an range span of the viewport.*
- *call a custom callback based on an elements position relative to a viewport, or in the case of a range span, a callback with percentage position with that span passed as property to the callback.*
- *and more...*

***This project is in the early stages of development.  Documentation is placeholder only.***




## Triggers

Scroll Director allows you to quickly add three types of event bindings to objects based on their position within the Viewport.  There are four *Trigger Types* available: 

- __Threshold__: Triggered when the specified edge of the element (top, right, bottom, left) crosses a set threshold within the viewport (top, right, bottom, left).
- __Range__: Triggered while an element is within a vertical range span of the viewport.
- __Dyanmic Range__: Triggered while an element is within a veritcal or horizontal range of the viewport *and* based on the percentage the element has scrolled within that range.
- __Scroll:__ Triggered after the viewport or element has scrolled a given amount.


## Events

There are three types of events that can be triggered:

- __Class:__ toggle between classes.
- __Style:__ toggle between styles values, or dynamically adjust style value.
- __Custom:__ perform a custom callback of your own making.


## Triggers + Events

Different trigger types and event (class, style, custom) provide a wide range of behaviours.



### Threshold

- __Threshold + Class:__ toggle a class on and off when it passes the viewport threshold.
- __Threshold + Style:__ toggle a style on and off when it passes the viewport threshold.
- __Threshold + Custom:__ trigger a custom action when it passes the viewport threshold.

### Range

- __Range + Class:__ toggle a class on (and back off) while it's within the threshold min and threshold max range.
- __Range + Style:__ toggle a class on (and back off) while it's within the threshold min and threshold max range.
- __Range + Custom:__ trigger a custom action while it's within the threshold min and threshold max range.

### Dynamic Range

- __DynamicRange + Class:__ _Same behaviour as Range + Class... what else can it do?_
- __DynamicRange + Style:__ adjust a style based on the percentage scroll position within the min/max range.
- __DynmaicRange + Custom:__ trigger a custom function and provide it the percentage scroll position within the min/max range.

### Scroll

- __Scroll + Class:__ toggle a class on and off based on the absolute scroll amount.
- __Scroll + Style:__ toggle a style property on and off based on the absolute scroll percentage
- __Scroll + Custom:__ trigger a custom function based on the absolute scroll position.


## Modifiers

Scroll director utilizing chaining to provide developers a more user friendly API than simply passing a large object. In this way, you would add an element as a target and then pass the specific modifiers you wish to change or adjust the behaviour.

For instance:

`const SD = new ScrollDirector(); // instantiate a scroll director object`

`SD.add('#example').class('ex__class--off', 'ex__class--on').offset(10);`

So what's happening here?  First we're telling the browser to watch an element with the ID 'example'. Because we've specified this only as a .class() type, the tigger type will be a threshold, a line drawn horizontally (default) or vertically across the viewport.  In this case the threshold will be calculated as 10vh from the bottom of the viewport. In this case, the element with the ID 'example' will be given a class of .ex__class--off if the top is below the threshold, and will change to .ex__class--on when the top crosses or is above that threshold.


### Basis 
The _basis_ is the side of the viewport from which to calculate the trigger threshold.  This can be either the viewport's bottom (default), top, left, or right sides.

`.basis('top') // will set the threshold origin to be calculated from the top of the viewport.`

### Offset
The _offset_ is an amount in *vh* (currently only supports vertical calculations) from the basis from which to calculation the thresholdMin.

`.offset(10) // will adjust the a default threshold from the bottom of the viewport to being 10vh from the bottom of the viewport.`

### Focus
The _focus_ is the side of the element from which to calculate.  This can be one of top (default), bottom, left, or right.

`.focus('bottom') // will change the side of the element that will trigger at the threshold from top to bottom.



## API:
.add(target: any)

.class(initial: string, in: string, final: string = '')

.style(initial: string, in: string, final: string = '')

.range(viewportPercentage: number)

.offset(viewportPercentage: number)

.dynamicRange()

.focus(side: Side)

.basis(side: Side)

.direction(direction: Direction)

.do(callback: Function)


## Example

SD.add(target).scroll(100).direction('toBottom').once()

