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
var _Konami_code, _Konami_inputStr;
class Konami {
    constructor(password) {
        _Konami_code.set(this, void 0);
        _Konami_inputStr.set(this, '');
        __classPrivateFieldSet(this, _Konami_code, new RegExp(password), "f");
        this.listener();
    }
    verifyPassword() {
        if (__classPrivateFieldGet(this, _Konami_code, "f").test(__classPrivateFieldGet(this, _Konami_inputStr, "f"))) {
            console.log('passed');
            cornify_add();
            return;
        }
        console.log('failed');
    }
    updateInput(e) {
        __classPrivateFieldSet(this, _Konami_inputStr, __classPrivateFieldGet(this, _Konami_inputStr, "f") + e.key, "f");
        if (__classPrivateFieldGet(this, _Konami_inputStr, "f").length > 9) {
            __classPrivateFieldSet(this, _Konami_inputStr, __classPrivateFieldGet(this, _Konami_inputStr, "f").slice(1), "f");
        }
    }
    listener() {
        document.addEventListener('keyup', (e) => {
            this.updateInput(e);
            this.verifyPassword();
            console.log(__classPrivateFieldGet(this, _Konami_inputStr, "f"), __classPrivateFieldGet(this, _Konami_code, "f"));
        });
    }
}
_Konami_code = new WeakMap(), _Konami_inputStr = new WeakMap();
const myKonami = new Konami('tp6u4wj/6');
/**
 * 監聽鍵盤事件，對照設定的password
 */ 
