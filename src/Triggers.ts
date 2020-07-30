'use strict';

import { 
  TriggerType, 
  ActionType, 
  Side, 
  ViewportPosition,
  Direction,
  TriggerState,
  CssPropertyType
} from './enums';

import { CssStyle } from './CssStyle';
import { CssClass } from './CssClass';


interface TriggerInterface {
  element(): any;

  triggerType(): TriggerType;
  actionType(): ActionType;

  state(): TriggerState;
  
  // modifiers
  basis(_basis: Side): Trigger;
  focus(_focus: Side): Trigger;
  offset(_offset: number): Trigger;
  range(_rangeValue: number): Trigger;
  direction(_direction: Direction): Trigger;
  style(property: string, initialValue: string|number, endValue: string|number, suffix: string): Trigger;
  class(initial: string, on: string, final: string): Trigger;
  do(callback: Function, props: object): Trigger;
  once(): void;
  

  // test
  update: Function;  


}


/**
* Trigger class
* 
*/
export class Trigger implements TriggerInterface {  
  private _element: any; // HTMLElement target

  private _triggerType: TriggerType = TriggerType.threshold; // the type of trigger this is.

  private _actionType: ActionType = ActionType.class; // the type of action to perform.
  private _state: TriggerState; // machine state of trigger: to-trigger (true) or trigger (false).
  
  private _basis: Side = Side.bottom; // which side of the viewport to base calculations from.
  private _focus: Side = Side.top; // the side of the target _element from which to base calculations.
  private _direction: Direction = Direction.vertical; //

  private _offset: number = 0; // Percent of viewport from basis.
  private _offsetPx: number; // Number of pixels from basis.
  
  private _range: number = 0; // Percent of viewport from focus.
  private _rangePx: number; // Number of pixels from focus.
    
  private _thresholdMin: number;
  private _thresholdMax: number;
  private _thresholdCurrentPercent: number;

  private _style: CssStyle;
  private _class: CssClass;

  
  private _callbackFunction : Function;
  private _callbackProps: object;


  private _callback: Function = () => {
    const props = Object.assign(this._callbackProps, { _triggerState: this._state, _triggerRangePercent: this._thresholdCurrentPercent });
    this._callbackFunction(props);
  };

  
  private _setThresholdCurrentPercent(min, max): void {
    switch (this._state) {
      case TriggerState.initial:
        this._thresholdCurrentPercent = 0;
      break;

      case TriggerState.on:
        min = min < 0 ? min * -1 : min;
        this._thresholdCurrentPercent = ((1 - (max / (min + max))) > 1) ? 1 : 1 - (max / (min + max)); 
      break;

      case TriggerState.final:
        this._thresholdCurrentPercent = 100;
      break;
    }
  }


  public element(): any {
    return this._element;
  }


  public triggerType(): TriggerType {
    return this._triggerType;
  };


  public actionType(): ActionType {
    return this._actionType;
  };


  // TODO rename to thresholdMin
  public thresholdMin(): number {
    return this._thresholdMin;
  }


  // TODO rename to thresholdMax
  public thresholdMax(): number {
    return this._thresholdMax;
  }


  // TODO rename to threshold()
  public threshold(): number {
    return this._thresholdMin;
  }


  public top(): number {
    return this._element.getBoundingClientRect().top;
  }


  public bottom(): number {
    return this._element.getBoundingClientRect().bottom;
  }


  public left(): number {
    return this._element.getBoundingClientRect().left;
  }


  public right(): number {
    return this._element.getBoundingClientRect().right;
  }


  public state(): TriggerState {
    return this._state;
  }


  /**
   * Set the side of the viewport from which to base scroll calculations.
   * 
   * @param _basis Side
   */
  public basis(basis: Side = Side.bottom) {
    if (Object.values(Side).includes(basis)) this._basis = basis;
    
    this.update();

    return this;
  }


  /**
   * Set the side of the _element from which to base scroll calculations.
   * 
   * 
   * @param _focus Side
   */
  public focus(focus: Side = Side.top) {
    if (Object.values(Side).includes(focus)) this._focus = focus;

    this.update();

    return this;
  }


  /**
   * Set amount of offset to add to the scroll calculations.  
   * Offset is set in viewport height or width values and converted dynamically to pixels.
   * 
   * @param _offset number 
   */
  public offset(offset: number = 0): Trigger {
    if (typeof  offset !== 'number')
      console.warn('Invalid optional \'offset\' property. Expected number.');

    if ( offset > 0) this._offset = offset;

    this.update();

    return this;
  }


  public target(target: string): Trigger {

    return this;
  }


  /**
   * Set the range through which a style or class effect should take place.
   * Range is set in viewport height or width values and converted dynamically to pixels.
   * 
   * @param _range number
   */
  public range(rangeValue: number = 100): Trigger {   
    if (typeof rangeValue !== 'number' && rangeValue > 0) {
      // TODO add error message
      this._range = 100;
      return this;
    }

    this._triggerType = TriggerType.range;
    this._range = rangeValue; 

    this.update();

    return this;
  }

  public dynamicStyle(property: string, initial: number, final: number,  type: CssPropertyType = CssPropertyType.none): Trigger {
    const cssStyle = new CssStyle(property, type, initial, final, final);
    this._style = cssStyle;
    this._triggerType = TriggerType.dynamic;
    this._actionType = ActionType.style;

    return this;
  }


// consider for future use...?
  // private _dynamicColor(hex1: string, hex2: string): string {
  //   let color1 = [];
  //   let color2 = [];

  //   color1['r'] = parseInt(hex1.substr(0,2), 16);
  //   color1['g'] = parseInt(hex1.substr(0,2), 16);
  //   color1['b'] = parseInt(hex1.substr(0,2), 16);

  //   color2['r'] = parseInt(hex2.substr(0,2), 16);
  //   color2['g'] = parseInt(hex2.substr(0,2), 16);
  //   color2['b'] = parseInt(hex2.substr(0,2), 16);

  //   const color = [];
  //   color['r'] = color1['r'] + ((color2['r'] - color1['r']) * this._thresholdCurrentPercent);
  //   color['g'] = color1['g'] + ((color2['g'] - color1['g']) * this._thresholdCurrentPercent);
  //   color['b'] = color1['b'] + ((color2['b'] - color1['b']) * this._thresholdCurrentPercent);

  //   return '#' + color['r'].toString(16) + color['g'].toString(16) + color['b'].toString(16);
  // }


  /**
   * Set the direction through which the conditions will be true from one of Direction enum:
   * - Vertical (scrolling both up and down)
   * - Horizontal (scroll side to side)
   * - Up
   * - Down
   * - Left
   * - Right
   * 
   * @param _direction Direction
   */
  public direction(direction: Direction = Direction.vertical) {
     const cleanDirectionValue = direction.charAt(0).toUpperCase() + direction.slice(1);

    if (cleanDirectionValue in Direction)
      this._direction = Direction[cleanDirectionValue];

    return this;
  }


  /**
   * Add a CSS property to modify inline. 
   */
  public style(property: string, initial: string|number, on: string|number, final: string|number = '', type: CssPropertyType = CssPropertyType.none): Trigger {
    final = (typeof final === 'string' && final.length == 0) ? initial : final;
    const cssStyle = new CssStyle(property, type, initial, on, final);
    this._style = cssStyle;
    this._actionType = ActionType.style;

    return this;
  }

  
  /**
   * Add a CSS class to toggle on (and optionally off)
   */
  public class(initial: string, on: string, final: string = ''): Trigger {
    final = (final.length == 0) ? initial : final;
    const cssClass = new CssClass(initial, on, final);
    this._class = cssClass;
    this._actionType = ActionType.class;

    return this;
  }

  
  /**
   * Add a custom callback to perform dependent on Trigger state.
   * 
   * @param callback function
   * @param props object
   */
  public do(callback: Function, props: object = {}) {
    this._callbackFunction = callback;
    this._callbackProps = props;
    this._actionType = ActionType.custom;

    return this;
  }


  /**
   *
   * @param scrollAmount number
   */
  // public scroll(scrollAmount: number = 0) {
  //   if (scrollAmount > 0) {
  //     this._offset = scrollAmount;
  //     this._triggerType = TriggerType.scroll;
  //   }

  //   return this;
  // }


  public height(): number {
    return this.bottom() - this.top();
  }


  // TODO... only perform the trigger action once... then self destruct...
  public once(): void {}
 

  // public action(): void {
  //   const _state = this._state;
  //   this.update();

  //   switch (this._triggerType) {
  //     case TriggerType.threshold:
  //       if (this._thresholdMin <= 0) {
  //         this._state = TriggerState.initial;
  //       } else {
  //         this._state = TriggerState.on;
  //       }
  //     break

  //     case TriggerType.range :
  //       if (this._thresholdMin > 0) {
  //         this._state = TriggerState.initial;
  //       } else if (this._thresholdMin <= 0 && this._thresholdMax >= 0) {
  //         this._state = TriggerState.on;
  //       } else if (this._thresholdMax < 0) {
  //         this._state = TriggerState.final;
  //       }
  //     break;

  //     case TriggerType.dynamic :
  //       if (this._thresholdMin > 0) {
  //         this._state = TriggerState.initial;
  //       } else if (this._thresholdMin <= 0 && this._thresholdMax >= 0) {
  //         this._state = TriggerState.on;
  //       } else if (this._thresholdMax < 0) {
  //         this._state = TriggerState.final;
  //       }
  //     break;

  //     case TriggerType.scroll :
  //       // TODO
  //     break;
  //   }

  //   if (_state !== this._state) this.update();
  // }
  

  // TODO add condition...

  private _toggleClass(): void {  
    if (typeof this._class === 'undefined') {
      return; 
    }

    if (this._element.classList.contains(this._class[this._state])) {
      return;
    }

    for (let state in this._class) {
      console.log('class in CssClass: ' + state + ' / ' + this._class[this._state]);
      if (this._element.classList.contains(this._class[state])) {
        this._element.classList.remove(this._class[state]);
      }
    }
    
    this._element.classList.add(this._class[this._state]);
  }


  private _toggleStyle(): void {
    this._element.style[this._style.property()] = this._style[this._state]();
  }


  private _dynamicStyle(): void {
    if (this._thresholdMax <= 0) {
      this._element.style[this._style.property()] = this._style.final();
    } else if (this._thresholdMin <= 0 && this._thresholdMax > 0) {
      this._element.style[this._style.property()] = 
        (this._style.initialNumericValue() + 
          ((this._style.finalNumericValue() - this._style.initialNumericValue()) * 
            this._thresholdCurrentPercent)) + this._style.type();
    } else if (this._thresholdMin > 0) {
      this._element.style[this._style.property()] = this._style.initial();
    }
  }


  private setup(): void {
    
    // removed edge numbers

    // TODO : add get methods for changing values...
    this.update();
  }

  
  private _setState(): void {
    if (this._thresholdMin > 0) {
      this._state = TriggerState.initial;
    } else if (this._triggerType === TriggerType.threshold && this._thresholdMin < 0) {
      this._state = TriggerState.on;
    } else if ((this._triggerType === TriggerType.range || this._triggerType === TriggerType.dynamic) && 
        this._thresholdMin <=0 && this._thresholdMax >= 0) {
      this._state = TriggerState.on;
    } else if (this._triggerType === TriggerType.scroll) {
      // TODO
    } else if (this._thresholdMax < 0) {
      this._state = TriggerState.final;
    }
  }


  public update(): void {
    console.info('update');
    this._offsetPx = window.innerHeight * this._offset / 100;
    this._rangePx = window.innerHeight * this._range / 100;

    switch (this._basis) {
      case Side.bottom:
        switch (this._focus) {      
          case Side.top:
            this._thresholdMin = this.top() - window.innerHeight + this._offsetPx; 
            this._thresholdMax = this.top() - window.innerHeight + this._offsetPx + this._rangePx;
          break;

          case Side.bottom:
            this._thresholdMin = this.bottom() - window.innerHeight + this._offsetPx;
            this._thresholdMax = this.bottom() - window.innerHeight + this._offsetPx + this._rangePx;
          break;

          case Side.y:
            this._thresholdMin = this.top() - window.innerHeight + this._offsetPx;
            this._thresholdMax = this.bottom() - window.innerHeight + this._offsetPx + this._rangePx;
          break;
        }

        this._setThresholdCurrentPercent(this._thresholdMin, this._thresholdMax);
      break;

      case Side.top: // basis
        switch (this._focus) {
          case Side.top:
            this._thresholdMin = this.top() - this._offsetPx - this._rangePx;
            this._thresholdMax = this.top() - this._offsetPx;
          break;
          
          case Side.bottom:
            this._thresholdMin = this.bottom() - this._offsetPx - this._rangePx;
            this._thresholdMax = this.bottom() - this._offsetPx;
          break;

          case Side.y:
            this._thresholdMin = this.top() - this._offsetPx - this._rangePx;
            this._thresholdMax = this.bottom() - this._offsetPx;
          break;
        }

        this._setThresholdCurrentPercent(this._thresholdMax, this._thresholdMin);
      break;
    } // endswitch _basis

    this._setState();


    switch (this._triggerType) {
      case TriggerType.threshold:
        switch (this._actionType) {
          case ActionType.class:
            this._toggleClass();
          break;

          case ActionType.style:
            this._toggleStyle();
          break;

          case ActionType.custom:
            this._callback();
          break;
        }
      break;
      
      case TriggerType.range:
        switch (this._actionType) {
          case ActionType.class:
            this._toggleClass();
          break;

          case ActionType.style:
            this._toggleStyle();
          break;

          case ActionType.custom:
            this._callback();
          break;
        }
      break;

      case TriggerType.dynamic:
        switch (this._actionType) {
          case ActionType.class:
            // this._toggleClass();
            // What would a dynamic class look like?
          break;

          case ActionType.style:
            this._dynamicStyle();
          break;

          case ActionType.custom:
            this._callback();
          break;
        }
      break;
    }
  }
    


	/**
	 * 
	 * @param target string An HtmlElement ID, class, tag name, or data attribute.
	 * 
	 */
	public constructor(target: string) {
    try {
      if (typeof target === 'undefined') 
        throw new Error('Missing target');

      const targetNameStartsWith = target.charAt(0);
      let el: any;

      // TODO - how to handle when target is an array of elements!

      // TODO - consider adding ability to set target element to be different than trigger element?  OR should that just be left to custom callbacks?

      switch (targetNameStartsWith) {
        case '#': // _element ID
          el = document.getElementById(target.substring(1, target.length));
        break;
        case '.': // CSS class
          el = document.getElementsByClassName(target.substring(1, target.length));
        break;
        case '[': // data attribute
          el = document.querySelectorAll(target);
        break;
        default: // HTML tag
          el = document.getElementsByTagName(target);
        break;
      }
      
      if (el) {
        this._element = el;
        this.setup();
      } else {
        console.warn(`Invalid trigger target: '${target}'`);
      }
    } catch (e) {
      console.warn(e.message);
    }
  }
}
