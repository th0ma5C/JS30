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
var _ClickReflector_elementArr;
class ClickReflector {
    constructor(selector) {
        _ClickReflector_elementArr.set(this, void 0);
        __classPrivateFieldSet(this, _ClickReflector_elementArr, document.querySelectorAll(selector), "f");
        this.addListener();
    }
    toggleOpen(e) {
        if (!e)
            return;
        console.log(e.currentTarget);
        const target = e.currentTarget;
        target.classList.toggle('open');
    }
    addListener() {
        __classPrivateFieldGet(this, _ClickReflector_elementArr, "f").forEach((el) => {
            console.log(el);
            el.addEventListener('click', this.toggleOpen);
        });
    }
}
_ClickReflector_elementArr = new WeakMap();
const panelsClickReflector = new ClickReflector('.panel');
// const controller = new AbortController();
// const signal = controller.signal;
// function handleClick(event) {
//     console.log('Clicked:', event.target);
// }
// document.querySelector('.panel').addEventListener('click', handleClick, { signal });
// // 在页面跳转或其他合适时机调用 abort 来移除监听器
// controller.abort(); // 移除所有与该 signal 关联的监听器
