"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var _Compass_lng, _Compass_lat;
class Compass {
    constructor(selectors) {
        _Compass_lng.set(this, null);
        _Compass_lat.set(this, null);
        this.setPositionContent(selectors);
        this.watchPosition(selectors);
    }
    getCurrPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                return reject(new Error('geolocation is not supported'));
            }
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                resolve(position);
            }, (err) => {
                reject(err);
            });
        });
    }
    setPositionContent(selectors) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const lng = document.querySelector(selectors.lng);
            const lat = document.querySelector(selectors.lat);
            try {
                const position = yield this.getCurrPosition();
                __classPrivateFieldSet(this, _Compass_lat, position.coords.latitude, "f");
                __classPrivateFieldSet(this, _Compass_lng, position.coords.longitude, "f");
            }
            catch (error) {
                console.log(error);
            }
            lng.textContent = (_b = (_a = __classPrivateFieldGet(this, _Compass_lng, "f")) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '-';
            lat.textContent = (_d = (_c = __classPrivateFieldGet(this, _Compass_lat, "f")) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '-';
        });
    }
    watchPosition(selectors) {
        const speed = document.querySelector(selectors.speed);
        const compassPinter = document.querySelector(selectors.compass);
        navigator.geolocation.watchPosition((position) => {
            var _a, _b;
            speed.textContent = (_b = (_a = position.coords.speed) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '0';
            compassPinter.style.transform = `rotate${position.coords.heading}deg`;
        }, (err) => {
            console.log(err);
        });
    }
}
_Compass_lng = new WeakMap(), _Compass_lat = new WeakMap();
const coordinate = {
    lng: '.longitude',
    lat: '.latitude',
    speed: '.speed-value',
    compass: '.compassPinter'
};
const compass = new Compass(coordinate);
// compass.setPositionContent(coordinate);
