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
var _WebCam_videoEl, _WebCam_strip;
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
class WebCam {
    constructor(selector) {
        _WebCam_videoEl.set(this, void 0);
        _WebCam_strip.set(this, document.querySelector('.strip'));
        __classPrivateFieldSet(this, _WebCam_videoEl, document.querySelector(selector), "f");
        this.initCam();
        // this.#videoEl.addEventListener('loadedmetadata', () => {
        // })
    }
    initCam() {
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream) => {
            __classPrivateFieldGet(this, _WebCam_videoEl, "f").srcObject = stream;
            __classPrivateFieldGet(this, _WebCam_videoEl, "f").play();
        }).catch((err) => {
            console.log(err);
        });
    }
    setIntoCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx)
            throw Error('missing canvas ctx');
        const width = __classPrivateFieldGet(this, _WebCam_videoEl, "f").videoWidth;
        const height = __classPrivateFieldGet(this, _WebCam_videoEl, "f").videoHeight;
        canvas.width = width;
        canvas.height = height;
        return setInterval(() => {
            ctx.drawImage(__classPrivateFieldGet(this, _WebCam_videoEl, "f"), 0, 0, width, height);
            // let pixels = ctx.getImageData(0, 0, width, height);
            // ctx.putImageData(pixels, 0, 0);
        }, 16);
    }
    takePhoto(canvas) {
        const data = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = data;
        link.setAttribute('download', 'img');
        link.innerHTML = `<img src="${data}"/>`;
        __classPrivateFieldGet(this, _WebCam_strip, "f").insertBefore(link, __classPrivateFieldGet(this, _WebCam_strip, "f").firstChild);
    }
    getColorInput() {
    }
    setColorInput() {
    }
}
_WebCam_videoEl = new WeakMap(), _WebCam_strip = new WeakMap();
// const Cam = new WebCam('.player');
video.addEventListener('loadedmetadata', () => {
    // Cam.setIntoCanvas(canvas);
});
function takePhoto() {
    // Cam.takePhoto(canvas);
}
