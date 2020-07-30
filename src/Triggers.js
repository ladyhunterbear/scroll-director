'use strict';
exports.__esModule = true;
var enums_1 = require("./enums");
var CssStyle_1 = require("./CssStyle");
var CssClass_1 = require("./CssClass");
/**
* Trigger class
*
*/
var Trigger = /** @class */ (function () {
    /**
     *
     * @param target string An HtmlElement ID, class, tag name, or data attribute.
     *
     */
    function Trigger(target) {
        var _this = this;
        this._triggerType = enums_1.TriggerType.threshold; // the type of trigger this is.
        this._actionType = enums_1.ActionType["class"]; // the type of action to perform.
        this._basis = enums_1.Side.bottom; // which side of the viewport to base calculations from.
        this._focus = enums_1.Side.top; // the side of the target _element from which to base calculations.
        this._direction = enums_1.Direction.vertical; //
        this._offset = 0; // Percent of viewport from basis.
        this._range = 0; // Percent of viewport from focus.
        this._callback = function () {
            var props = Object.assign(_this._callbackProps, { _triggerState: _this._state, _triggerRangePercent: _this._thresholdCurrentPercent });
            _this._callbackFunction(props);
        };
        try {
            if (typeof target === 'undefined')
                throw new Error('Missing target');
            var targetNameStartsWith = target.charAt(0);
            var el = void 0;
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
            }
            else {
                console.warn("Invalid trigger target: '" + target + "'");
            }
        }
        catch (e) {
            console.warn(e.message);
        }
    }
    Trigger.prototype._setThresholdCurrentPercent = function (min, max) {
        switch (this._state) {
            case enums_1.TriggerState.initial:
                this._thresholdCurrentPercent = 0;
                break;
            case enums_1.TriggerState.on:
                min = min < 0 ? min * -1 : min;
                this._thresholdCurrentPercent = ((1 - (max / (min + max))) > 1) ? 1 : 1 - (max / (min + max));
                break;
            case enums_1.TriggerState.final:
                this._thresholdCurrentPercent = 100;
                break;
        }
    };
    Trigger.prototype.element = function () {
        return this._element;
    };
    Trigger.prototype.triggerType = function () {
        return this._triggerType;
    };
    ;
    Trigger.prototype.actionType = function () {
        return this._actionType;
    };
    ;
    // TODO rename to thresholdMin
    Trigger.prototype.thresholdMin = function () {
        return this._thresholdMin;
    };
    // TODO rename to thresholdMax
    Trigger.prototype.thresholdMax = function () {
        return this._thresholdMax;
    };
    // TODO rename to threshold()
    Trigger.prototype.threshold = function () {
        return this._thresholdMin;
    };
    Trigger.prototype.top = function () {
        return this._element.getBoundingClientRect().top;
    };
    Trigger.prototype.bottom = function () {
        return this._element.getBoundingClientRect().bottom;
    };
    Trigger.prototype.left = function () {
        return this._element.getBoundingClientRect().left;
    };
    Trigger.prototype.right = function () {
        return this._element.getBoundingClientRect().right;
    };
    Trigger.prototype.state = function () {
        return this._state;
    };
    /**
     * Set the side of the viewport from which to base scroll calculations.
     *
     * @param _basis Side
     */
    Trigger.prototype.basis = function (basis) {
        if (basis === void 0) { basis = enums_1.Side.bottom; }
        if (Object.values(enums_1.Side).includes(basis))
            this._basis = basis;
        this.update();
        return this;
    };
    /**
     * Set the side of the _element from which to base scroll calculations.
     *
     *
     * @param _focus Side
     */
    Trigger.prototype.focus = function (focus) {
        if (focus === void 0) { focus = enums_1.Side.top; }
        if (Object.values(enums_1.Side).includes(focus))
            this._focus = focus;
        this.update();
        return this;
    };
    /**
     * Set amount of offset to add to the scroll calculations.
     * Offset is set in viewport height or width values and converted dynamically to pixels.
     *
     * @param _offset number
     */
    Trigger.prototype.offset = function (offset) {
        if (offset === void 0) { offset = 0; }
        if (typeof offset !== 'number')
            console.warn('Invalid optional \'offset\' property. Expected number.');
        if (offset > 0)
            this._offset = offset;
        this.update();
        return this;
    };
    /**
     * Set the range through which a style or class effect should take place.
     * Range is set in viewport height or width values and converted dynamically to pixels.
     *
     * @param _range number
     */
    Trigger.prototype.range = function (rangeValue) {
        if (rangeValue === void 0) { rangeValue = 100; }
        if (typeof rangeValue !== 'number' && rangeValue > 0) {
            // TODO add error message
            this._range = 100;
            return this;
        }
        this._triggerType = enums_1.TriggerType.range;
        this._range = rangeValue;
        this.update();
        return this;
    };
    Trigger.prototype.dynamicStyle = function (property, initial, final, type) {
        if (type === void 0) { type = enums_1.CssPropertyType.none; }
        var cssStyle = new CssStyle_1.CssStyle(property, type, initial, final, final);
        this._style = cssStyle;
        this._triggerType = enums_1.TriggerType.dynamic;
        this._actionType = enums_1.ActionType.style;
        return this;
    };
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
    Trigger.prototype.direction = function (direction) {
        if (direction === void 0) { direction = enums_1.Direction.vertical; }
        var cleanDirectionValue = direction.charAt(0).toUpperCase() + direction.slice(1);
        if (cleanDirectionValue in enums_1.Direction)
            this._direction = enums_1.Direction[cleanDirectionValue];
        return this;
    };
    /**
     * Add a CSS property to modify inline.
     */
    Trigger.prototype.style = function (property, initial, on, final, type) {
        if (final === void 0) { final = ''; }
        if (type === void 0) { type = enums_1.CssPropertyType.none; }
        final = (typeof final === 'string' && final.length == 0) ? initial : final;
        var cssStyle = new CssStyle_1.CssStyle(property, type, initial, on, final);
        this._style = cssStyle;
        this._actionType = enums_1.ActionType.style;
        return this;
    };
    /**
     * Add a CSS class to toggle on (and optionally off)
     */
    Trigger.prototype["class"] = function (initial, on, final) {
        if (final === void 0) { final = ''; }
        final = (final.length == 0) ? initial : final;
        var cssClass = new CssClass_1.CssClass(initial, on, final);
        this._class = cssClass;
        this._actionType = enums_1.ActionType["class"];
        return this;
    };
    /**
     * Add a custom callback to perform dependent on Trigger state.
     *
     * @param callback function
     * @param props object
     */
    Trigger.prototype["do"] = function (callback, props) {
        if (props === void 0) { props = {}; }
        this._callbackFunction = callback;
        this._callbackProps = props;
        this._actionType = enums_1.ActionType.custom;
        return this;
    };
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
    Trigger.prototype.height = function () {
        return this.bottom() - this.top();
    };
    // TODO... only perform the trigger action once... then self destruct...
    Trigger.prototype.once = function () { };
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
    Trigger.prototype._toggleClass = function () {
        if (typeof this._class === 'undefined') {
            return;
        }
        if (this._element.classList.contains(this._class[this._state])) {
            return;
        }
        for (var state in this._class) {
            console.log('class in CssClass: ' + state + ' / ' + this._class[this._state]);
            if (this._element.classList.contains(this._class[state])) {
                this._element.classList.remove(this._class[state]);
            }
        }
        this._element.classList.add(this._class[this._state]);
    };
    Trigger.prototype._toggleStyle = function () {
        this._element.style[this._style.property()] = this._style[this._state]();
    };
    Trigger.prototype._dynamicStyle = function () {
        if (this._thresholdMax <= 0) {
            this._element.style[this._style.property()] = this._style.final();
        }
        else if (this._thresholdMin <= 0 && this._thresholdMax > 0) {
            this._element.style[this._style.property()] =
                (this._style.initialNumericValue() +
                    ((this._style.finalNumericValue() - this._style.initialNumericValue()) *
                        this._thresholdCurrentPercent)) + this._style.type();
        }
        else if (this._thresholdMin > 0) {
            this._element.style[this._style.property()] = this._style.initial();
        }
    };
    Trigger.prototype.setup = function () {
        // removed edge numbers
        // TODO : add get methods for changing values...
        this.update();
    };
    Trigger.prototype._setState = function () {
        if (this._thresholdMin > 0) {
            this._state = enums_1.TriggerState.initial;
        }
        else if (this._triggerType === enums_1.TriggerType.threshold && this._thresholdMin < 0) {
            this._state = enums_1.TriggerState.on;
        }
        else if ((this._triggerType === enums_1.TriggerType.range || this._triggerType === enums_1.TriggerType.dynamic) &&
            this._thresholdMin <= 0 && this._thresholdMax >= 0) {
            this._state = enums_1.TriggerState.on;
        }
        else if (this._triggerType === enums_1.TriggerType.scroll) {
            // TODO
        }
        else if (this._thresholdMax < 0) {
            this._state = enums_1.TriggerState.final;
        }
    };
    Trigger.prototype.update = function () {
        console.info('update');
        this._offsetPx = window.innerHeight * this._offset / 100;
        this._rangePx = window.innerHeight * this._range / 100;
        switch (this._basis) {
            case enums_1.Side.bottom:
                switch (this._focus) {
                    case enums_1.Side.top:
                        this._thresholdMin = this.top() - window.innerHeight + this._offsetPx;
                        this._thresholdMax = this.top() - window.innerHeight + this._offsetPx + this._rangePx;
                        break;
                    case enums_1.Side.bottom:
                        this._thresholdMin = this.bottom() - window.innerHeight + this._offsetPx;
                        this._thresholdMax = this.bottom() - window.innerHeight + this._offsetPx + this._rangePx;
                        break;
                    case enums_1.Side.y:
                        this._thresholdMin = this.top() - window.innerHeight + this._offsetPx;
                        this._thresholdMax = this.bottom() - window.innerHeight + this._offsetPx + this._rangePx;
                        break;
                }
                this._setThresholdCurrentPercent(this._thresholdMin, this._thresholdMax);
                break;
            case enums_1.Side.top: // basis
                switch (this._focus) {
                    case enums_1.Side.top:
                        this._thresholdMin = this.top() - this._offsetPx - this._rangePx;
                        this._thresholdMax = this.top() - this._offsetPx;
                        break;
                    case enums_1.Side.bottom:
                        this._thresholdMin = this.bottom() - this._offsetPx - this._rangePx;
                        this._thresholdMax = this.bottom() - this._offsetPx;
                        break;
                    case enums_1.Side.y:
                        this._thresholdMin = this.top() - this._offsetPx - this._rangePx;
                        this._thresholdMax = this.bottom() - this._offsetPx;
                        break;
                }
                this._setThresholdCurrentPercent(this._thresholdMax, this._thresholdMin);
                break;
        } // endswitch _basis
        this._setState();
        switch (this._triggerType) {
            case enums_1.TriggerType.threshold:
                switch (this._actionType) {
                    case enums_1.ActionType["class"]:
                        this._toggleClass();
                        break;
                    case enums_1.ActionType.style:
                        this._toggleStyle();
                        break;
                    case enums_1.ActionType.custom:
                        this._callback();
                        break;
                }
                break;
            case enums_1.TriggerType.range:
                switch (this._actionType) {
                    case enums_1.ActionType["class"]:
                        this._toggleClass();
                        break;
                    case enums_1.ActionType.style:
                        this._toggleStyle();
                        break;
                    case enums_1.ActionType.custom:
                        this._callback();
                        break;
                }
                break;
            case enums_1.TriggerType.dynamic:
                switch (this._actionType) {
                    case enums_1.ActionType["class"]:
                        // this._toggleClass();
                        // What would a dynamic class look like?
                        break;
                    case enums_1.ActionType.style:
                        this._dynamicStyle();
                        break;
                    case enums_1.ActionType.custom:
                        this._callback();
                        break;
                }
                break;
        }
    };
    return Trigger;
}());
exports.Trigger = Trigger;
