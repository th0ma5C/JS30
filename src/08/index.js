"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PenController_canvas, _PenController_ctx, _PenController_penPosition, _PenController_colorInput, _PenController_color, _PenController_widthInput, _PenController_width, _PenController_eraserInput, _PenController_isEraser, _PenController_isDraw;
class PenController {
    constructor(selectors) {
        _PenController_canvas.set(this, void 0);
        _PenController_ctx.set(this, void 0);
        _PenController_penPosition.set(this, null);
        _PenController_colorInput.set(this, void 0);
        _PenController_color.set(this, void 0);
        _PenController_widthInput.set(this, void 0);
        _PenController_width.set(this, void 0);
        _PenController_eraserInput.set(this, void 0);
        _PenController_isEraser.set(this, void 0);
        _PenController_isDraw.set(this, false);
        const { canvas, colorInput, widthInput, eraserInput } = selectors;
        __classPrivateFieldSet(this, _PenController_canvas, document.querySelector(canvas), "f");
        __classPrivateFieldSet(this, _PenController_ctx, __classPrivateFieldGet(this, _PenController_canvas, "f").getContext('2d'), "f");
        __classPrivateFieldGet(this, _PenController_canvas, "f").addEventListener('mousedown', (e) => {
            __classPrivateFieldSet(this, _PenController_isDraw, true, "f");
            this.draw(e);
        });
        __classPrivateFieldGet(this, _PenController_canvas, "f").addEventListener('mouseup', () => __classPrivateFieldSet(this, _PenController_isDraw, false, "f"));
        __classPrivateFieldGet(this, _PenController_canvas, "f").addEventListener('mouseout', () => __classPrivateFieldSet(this, _PenController_isDraw, false, "f"));
        __classPrivateFieldGet(this, _PenController_canvas, "f").addEventListener('mousemove', (e) => {
            this.draw(e);
            this.setPenPosition(e);
        });
        __classPrivateFieldSet(this, _PenController_colorInput, document.querySelector(colorInput), "f");
        __classPrivateFieldSet(this, _PenController_color, __classPrivateFieldGet(this, _PenController_colorInput, "f").value, "f");
        __classPrivateFieldSet(this, _PenController_widthInput, document.querySelector(widthInput), "f");
        __classPrivateFieldSet(this, _PenController_width, __classPrivateFieldGet(this, _PenController_widthInput, "f").value, "f");
        __classPrivateFieldSet(this, _PenController_eraserInput, document.querySelector(eraserInput), "f");
        __classPrivateFieldSet(this, _PenController_isEraser, __classPrivateFieldGet(this, _PenController_eraserInput, "f").checked, "f");
        const input = [__classPrivateFieldGet(this, _PenController_colorInput, "f"), __classPrivateFieldGet(this, _PenController_widthInput, "f"), __classPrivateFieldGet(this, _PenController_eraserInput, "f")];
        input.forEach(item => item.addEventListener('input', this.listenerCallback.bind(this)));
        this.initPen();
    }
    listenerCallback(e) {
        if (!e.target || !__classPrivateFieldGet(this, _PenController_ctx, "f"))
            return;
        const target = e.target;
        switch (target.id) {
            case 'pen':
                __classPrivateFieldSet(this, _PenController_color, target.value, "f");
                break;
            case 'brushWidth':
                __classPrivateFieldSet(this, _PenController_width, target.value, "f");
                break;
            case 'eraserToggle':
                __classPrivateFieldSet(this, _PenController_isEraser, target.checked, "f");
                break;
            default:
                break;
        }
        this.initPen();
    }
    initPen() {
        if (!__classPrivateFieldGet(this, _PenController_ctx, "f"))
            return;
        if (__classPrivateFieldGet(this, _PenController_isEraser, "f")) {
            __classPrivateFieldGet(this, _PenController_ctx, "f").globalCompositeOperation = 'destination-out';
            return;
        }
        __classPrivateFieldGet(this, _PenController_ctx, "f").globalCompositeOperation = 'source-over';
        __classPrivateFieldGet(this, _PenController_ctx, "f").strokeStyle = __classPrivateFieldGet(this, _PenController_color, "f");
        __classPrivateFieldGet(this, _PenController_ctx, "f").lineWidth = Number(__classPrivateFieldGet(this, _PenController_width, "f"));
        __classPrivateFieldGet(this, _PenController_ctx, "f").lineJoin = 'round';
        __classPrivateFieldGet(this, _PenController_ctx, "f").lineCap = 'round';
    }
    setPenPosition(e) {
        __classPrivateFieldSet(this, _PenController_penPosition, {
            x: e.offsetX,
            y: e.offsetY
        }, "f");
    }
    draw(e) {
        if (!__classPrivateFieldGet(this, _PenController_isDraw, "f") || !__classPrivateFieldGet(this, _PenController_ctx, "f") || !__classPrivateFieldGet(this, _PenController_penPosition, "f"))
            return;
        __classPrivateFieldGet(this, _PenController_ctx, "f").beginPath();
        __classPrivateFieldGet(this, _PenController_ctx, "f").moveTo(__classPrivateFieldGet(this, _PenController_penPosition, "f").x, __classPrivateFieldGet(this, _PenController_penPosition, "f").y);
        __classPrivateFieldGet(this, _PenController_ctx, "f").lineTo(e.offsetX, e.offsetY);
        __classPrivateFieldGet(this, _PenController_ctx, "f").stroke();
    }
}
_PenController_canvas = new WeakMap(), _PenController_ctx = new WeakMap(), _PenController_penPosition = new WeakMap(), _PenController_colorInput = new WeakMap(), _PenController_color = new WeakMap(), _PenController_widthInput = new WeakMap(), _PenController_width = new WeakMap(), _PenController_eraserInput = new WeakMap(), _PenController_isEraser = new WeakMap(), _PenController_isDraw = new WeakMap();
const selectors = {
    canvas: '#draw',
    colorInput: '#pen',
    widthInput: '#brushWidth',
    eraserInput: '#eraserToggle'
};
const pen = new PenController(selectors);
/**
 * 先更新位置 後繪製會導致筆觸不連貫
 */ 
