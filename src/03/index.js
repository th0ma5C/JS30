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
var _ImgController_root_style, _ImgController_input;
class ImgController {
    constructor(selector) {
        _ImgController_root_style.set(this, document.documentElement.style);
        _ImgController_input.set(this, void 0);
        __classPrivateFieldSet(this, _ImgController_input, document.querySelectorAll(selector), "f");
    }
    // setInputVar() {
    //     this.#input.forEach((el) => {
    //         el.addEventListener('input', ((e) => {
    //             if (!e.target) return
    //             const target = e.target as HTMLInputElement
    //             const { name, value } = target;
    //             const unit = target.dataset.sizing ?? ''
    //             this.#root_style.setProperty(`--${name}`, value + unit)
    //         }))
    //     })
    // }
    setInputVar() {
        __classPrivateFieldGet(this, _ImgController_input, "f").forEach((el) => {
            el.addEventListener('input', this.handleInput.bind(this));
        });
    }
    handleInput(e) {
        var _a;
        const target = e.target;
        if (!target)
            return;
        const { name, value } = target;
        const unit = (_a = target.dataset.sizing) !== null && _a !== void 0 ? _a : '';
        __classPrivateFieldGet(this, _ImgController_root_style, "f").setProperty(`--${name}`, value + unit);
    }
}
_ImgController_root_style = new WeakMap(), _ImgController_input = new WeakMap();
let imgController = new ImgController('.controls input');
imgController.setInputVar();
// console.log(window.getComputedStyle(document.documentElement).getPropertyValue('--size'));
