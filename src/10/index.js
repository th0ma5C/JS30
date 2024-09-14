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
var _Checkbox_inputList;
class Checkbox {
    constructor(selectors) {
        _Checkbox_inputList.set(this, void 0);
        __classPrivateFieldSet(this, _Checkbox_inputList, [...document.querySelectorAll(selectors)], "f");
        this.addListener();
    }
    getScope(a, b) {
        return [Math.min(a, b), Math.max(a, b)];
    }
    addListener() {
        let lastInput = null;
        __classPrivateFieldGet(this, _Checkbox_inputList, "f").forEach((item) => {
            item.addEventListener('click', (e) => {
                const target = e.target;
                if (e.shiftKey && lastInput) {
                    const [start, end] = this.getScope(__classPrivateFieldGet(this, _Checkbox_inputList, "f").indexOf(target), __classPrivateFieldGet(this, _Checkbox_inputList, "f").indexOf(lastInput));
                    const action = target.checked;
                    __classPrivateFieldGet(this, _Checkbox_inputList, "f").forEach((item, index) => {
                        if (index > start && index < end) {
                            item.checked = action;
                        }
                    });
                }
                lastInput = target;
            });
        });
    }
}
_Checkbox_inputList = new WeakMap();
const checkboxInput = new Checkbox('input');
/**
 * 取得當前input列表，並添加監聽器
 * 如果有按shift且非第一次勾選，計算兩勾選的範圍
 * 宣告當前動作為範圍勾選還是範圍取消
 * 對範圍內input進行動作
 */ 
