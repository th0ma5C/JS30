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
var _Mark_markEl, _Mark_targetElList, _Mark_isInit;
class Mark {
    constructor() {
        _Mark_markEl.set(this, void 0);
        _Mark_targetElList.set(this, void 0);
        _Mark_isInit.set(this, true);
        __classPrivateFieldSet(this, _Mark_markEl, document.querySelector('.mark'), "f");
        __classPrivateFieldSet(this, _Mark_targetElList, document.getElementsByTagName('a'), "f");
        this.setListener();
    }
    setListener() {
        document.addEventListener('mouseover', (e) => {
            const target = e.target;
            if (target.tagName !== 'A')
                return;
            this.setMarkPosition(target);
        });
    }
    setMarkPosition(hoverEl) {
        const { width, height, x, y } = hoverEl.getBoundingClientRect();
        if (__classPrivateFieldGet(this, _Mark_isInit, "f")) {
            __classPrivateFieldGet(this, _Mark_markEl, "f").style.transition = 'none';
            __classPrivateFieldSet(this, _Mark_isInit, false, "f");
        }
        else {
            __classPrivateFieldGet(this, _Mark_markEl, "f").style.transition = '';
        }
        __classPrivateFieldGet(this, _Mark_markEl, "f").style.height = `${height}px`;
        __classPrivateFieldGet(this, _Mark_markEl, "f").style.width = `${width}px`;
        __classPrivateFieldGet(this, _Mark_markEl, "f").style.translate = `${x}px ${y}px`;
    }
}
_Mark_markEl = new WeakMap(), _Mark_targetElList = new WeakMap(), _Mark_isInit = new WeakMap();
const marker = new Mark();
/**
 * 透過修改transition: none => ''
 * 使初始化的轉場不會在奇怪的地方發生
 */ 
