"use strict";
exports.__esModule = true;
var CssStyle = /** @class */ (function () {
    function CssStyle(property, type, initial, on, final) {
        if (final === void 0) { final = ''; }
        try {
            if (typeof property === 'undefined') {
                throw new Error('Missing style property.');
            }
            this._property = property;
            this._type = type;
            this._initial = initial;
            this._on = on;
            this._final = final;
        }
        catch (e) {
            console.log(e.message);
        }
    }
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
    CssStyle.prototype.property = function () {
        return this._property;
    };
    CssStyle.prototype.type = function () {
        return this._type;
    };
    CssStyle.prototype.initial = function () {
        return this._initial + this._type;
    };
    CssStyle.prototype.initialNumericValue = function () {
        return this._initial;
    };
    CssStyle.prototype.on = function () {
        return this._on + this._type;
    };
    CssStyle.prototype.onNumbericValue = function () {
        return this._on;
    };
    CssStyle.prototype.final = function () {
        return this._final + this._type;
    };
    CssStyle.prototype.finalNumericValue = function () {
        return this._final;
    };
    return CssStyle;
}());
exports.CssStyle = CssStyle;
