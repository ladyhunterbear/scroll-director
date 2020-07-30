
import { CssPropertyType } from './enums';

export class CssStyle {
  private _property: string;
  private _type: string;
  private _initial: string|number;
  private _on: string|number;
  private _final: string|number;

  // public getRangeHexColor(rangePercent: number): string {
  //   let color;

  //   // TODO
    
  //   return color
  // }

  // public getRangeRgbColor(rangePercent: number): string {
  //   let color;
    
  //   // TODO
    
  //   return color;
  // }

  // public getRangeRgbaColor(rangePercent: number): string {
  //   let color;

  //   // TODO

  //   return color;
  // }


  // TODO redo ranged value to handle both initial to on and on to final

  // public getRangeValueIn(rangePercent: number): string {
  //   let propertyValue = '';
  //   return propertyValue;
  // }

  // public getRangeValueOut(rangePercent: number): string {
  //   let propertyValue = '';

  //   return propertyValue;
  // }

  // public getRangeValue(rangePercent: number): string {
  //   let propertyValue;
    
  //   if (this.property.indexOf('color') >= 0) {
  //     // if (this.start.indexOf('#') >= 0) {
  //     //   propertyValue = this.getRangeHexColor(rangePercent);
  //     // } else if (this.start.indexOf('rgb(') >= 0) {
  //     //   propertyValue = this.getRangeRgbColor(rangePercent);
  //     // } else if (this.start.indexOf('rgba') >= 0 ) {
  //     //   propertyValue = this.getRangeRgbaColor(rangePercent);
  //     // }
  //   } else {
  //     if (this.end - this.start > 0 ) {
  //       propertyValue = (((this.end - this.start) * rangePercent) + this.start) + this.type;
  //     } else {
  //       propertyValue = (((this.start - this.end) * rangePercent) + this.end) + this.type;
  //     }
  //   }

  //   return propertyValue;
  // }

  public property(): string {
    return this._property;
  }

  public type(): string {
    return this._type;
  }

  public initial(): string {
    return this._initial + this._type;
  }

  public initialNumericValue(): number {
    return <number>this._initial;
  }

  public on(): string {
    return this._on + this._type;
  }

  public onNumbericValue(): number {
    return <number>this._on;
  }

  public final(): string {
    return this._final + this._type;
  }

  public finalNumericValue(): number {
    return <number>this._final;
  }


  constructor(property: string, type: CssPropertyType, initial: string|number, on: string|number, final: string|number = '') {
    try {
      if (typeof property === 'undefined') {
        throw new Error('Missing style property.');
      }

      this._property = property;
      this._type = type;
      
      this._initial = initial;
      this._on = on;
      this._final = final;

    } catch (e) {
      console.log(e.message);
    }
  }
}