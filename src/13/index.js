"use strict";
// function debounce(func, wait = 20, immediate = true) {
//     var timeout;
//     return function () {
//         var context = this, args = arguments;
//         var later = function () {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         };
//         var callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//     };
// }
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
var _ImgSlide_img;
class ImgSlide {
    constructor(selector) {
        _ImgSlide_img.set(this, void 0);
        __classPrivateFieldSet(this, _ImgSlide_img, document.querySelectorAll(selector), "f");
        this.observer();
    }
    setImgClass(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
            else {
                entry.target.classList.remove('active');
            }
        });
    }
    observer() {
        const options = {
            root: null,
            rootMargin: ' 0% 0% -20% 0%',
            threshold: 0
        };
        const observer = new IntersectionObserver(this.setImgClass.bind(this), options);
        if (__classPrivateFieldGet(this, _ImgSlide_img, "f").length != 0) {
            __classPrivateFieldGet(this, _ImgSlide_img, "f").forEach(el => {
                observer.observe(el);
            });
        }
    }
}
_ImgSlide_img = new WeakMap();
function debounce(fn, limit) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, limit);
    };
}
const imgScroll = new ImgSlide('img');
// debounce(imgScroll.observer, 50);
/**
 * 監測圖片是否進入視口，並加上 or 移除樣式
 * 1. css scroll driven animation 實現
 * 2. intersection observer 實現
 */ 
