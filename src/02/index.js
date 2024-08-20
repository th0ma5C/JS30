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
var _Clock_hoursDeg, _Clock_minDeg, _Clock_secDeg, _Clock_hourEL, _Clock_minEl, _Clock_secondEl;
class Clock {
    constructor() {
        _Clock_hoursDeg.set(this, void 0);
        _Clock_minDeg.set(this, void 0);
        _Clock_secDeg.set(this, void 0);
        _Clock_hourEL.set(this, document.querySelector('.hour-hand'));
        _Clock_minEl.set(this, document.querySelector('.min-hand'));
        _Clock_secondEl.set(this, document.querySelector('.second-hand'));
        let time = new Date();
        __classPrivateFieldSet(this, _Clock_secDeg, time.getSeconds() * 6 + 90, "f");
        __classPrivateFieldSet(this, _Clock_minDeg, time.getMinutes() * 6 + (time.getSeconds() * 0.1) + 90, "f");
        __classPrivateFieldSet(this, _Clock_hoursDeg, time.getHours() * 30 + (time.getMinutes() * 0.5) + 90, "f");
        __classPrivateFieldGet(this, _Clock_hourEL, "f").style.transform = `translate(-100%, -50%)  rotate(${__classPrivateFieldGet(this, _Clock_hoursDeg, "f")}deg)`;
        __classPrivateFieldGet(this, _Clock_minEl, "f").style.transform = `translate(-100%, -50%)  rotate(${__classPrivateFieldGet(this, _Clock_minDeg, "f")}deg)`;
        __classPrivateFieldGet(this, _Clock_secondEl, "f").style.transform = `translate(-100%, -50%)  rotate(${__classPrivateFieldGet(this, _Clock_secDeg, "f")}deg)`;
    }
    updateTime() {
        __classPrivateFieldSet(this, _Clock_secDeg, __classPrivateFieldGet(this, _Clock_secDeg, "f") + 0.6, "f");
        __classPrivateFieldSet(this, _Clock_minDeg, __classPrivateFieldGet(this, _Clock_minDeg, "f") + 6 / 600, "f");
        __classPrivateFieldSet(this, _Clock_hoursDeg, __classPrivateFieldGet(this, _Clock_hoursDeg, "f") + 6 / 36000, "f");
        this.updateStyle();
    }
    updateStyle() {
        __classPrivateFieldGet(this, _Clock_hourEL, "f").style.transform = `translate(-100%, -50%)  rotate(${__classPrivateFieldGet(this, _Clock_hoursDeg, "f")}deg)`;
        __classPrivateFieldGet(this, _Clock_minEl, "f").style.transform = `translate(-100%, -50%)  rotate(${__classPrivateFieldGet(this, _Clock_minDeg, "f")}deg)`;
        __classPrivateFieldGet(this, _Clock_secondEl, "f").style.transform = `translate(-100%, -50%)  rotate(${__classPrivateFieldGet(this, _Clock_secDeg, "f")}deg)`;
    }
}
_Clock_hoursDeg = new WeakMap(), _Clock_minDeg = new WeakMap(), _Clock_secDeg = new WeakMap(), _Clock_hourEL = new WeakMap(), _Clock_minEl = new WeakMap(), _Clock_secondEl = new WeakMap();
const clock = new Clock();
// const updateClock = () => {
//     clock.updateTime();
// };
// setInterval(() => {
//     updateClock()
// }, 100);
let lastTime = 0;
const interval = 100;
function update(time) {
    if (time - lastTime >= interval) {
        lastTime = time;
        clock.updateTime();
        // console.log('Interval reached:', time);
    }
    requestAnimationFrame(update);
}
requestAnimationFrame(update);
