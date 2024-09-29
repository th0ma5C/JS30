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
var _WebCam_videoEl, _WebCam_strip, _WebCam_rgbState;
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
class WebCam {
    constructor(selector) {
        _WebCam_videoEl.set(this, void 0);
        _WebCam_strip.set(this, document.querySelector('.strip'));
        _WebCam_rgbState.set(this, { temp: 0, tint: 0, filter: 'origin' });
        __classPrivateFieldSet(this, _WebCam_videoEl, document.querySelector(selector), "f");
        this.initCam();
        // this.#videoEl.addEventListener('loadedmetadata', () => {
        // })
        // this.getRGBInput()
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
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx)
            throw Error('missing canvas ctx');
        const width = __classPrivateFieldGet(this, _WebCam_videoEl, "f").videoWidth;
        const height = __classPrivateFieldGet(this, _WebCam_videoEl, "f").videoHeight;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(__classPrivateFieldGet(this, _WebCam_videoEl, "f"), 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = this.setColor(pixels);
        ctx.putImageData(pixels, 0, 0);
        requestAnimationFrame(this.setIntoCanvas.bind(this, canvas));
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
        const rgbContainer = document.querySelector('.rgb');
        rgbContainer.querySelectorAll('input').forEach(input => {
            const elName = input.name;
            const val = Number(input.value);
            __classPrivateFieldGet(this, _WebCam_rgbState, "f")[elName] = val;
        });
        const filter = document.querySelector('.imgFilter');
        filter.querySelectorAll('input').forEach(input => {
            if (!input.checked)
                return;
            const val = input.value;
            __classPrivateFieldGet(this, _WebCam_rgbState, "f").filter = val;
        });
    }
    adjustState(r, g, b) {
        const { temp, tint } = __classPrivateFieldGet(this, _WebCam_rgbState, "f");
        const newR = r + temp * 50;
        const newB = b - temp * 50;
        const newG = g + tint * 50;
        return [
            Math.max(0, Math.min(255, newR)),
            Math.max(0, Math.min(255, newG)),
            Math.max(0, Math.min(255, newB))
        ];
    }
    grayScale(imageData) {
        for (let i = 0; i < imageData.data.length; i += 4) {
            const red = imageData.data[i];
            const green = imageData.data[i + 1];
            const blue = imageData.data[i + 2];
            const avg = (red + green + blue) / 3;
            imageData.data[i] = avg; // Red
            imageData.data[i + 1] = avg; // Green
            imageData.data[i + 2] = avg; // Blue
        }
    }
    inverted(imageData) {
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = 255 - imageData.data[i]; // Red
            imageData.data[i + 1] = 255 - imageData.data[i + 1]; // Green
            imageData.data[i + 2] = 255 - imageData.data[i + 2]; // Blue
        }
    }
    applyFilter(imageData) {
        switch (__classPrivateFieldGet(this, _WebCam_rgbState, "f").filter) {
            case 'grayscale':
                this.grayScale(imageData);
                break;
            case 'inverted':
                this.inverted(imageData);
                break;
            default:
                break;
        }
    }
    setColor(target) {
        this.getColorInput();
        for (let i = 0; i < target.data.length; i += 4) {
            const red = target.data[i];
            const green = target.data[i + 1];
            const blue = target.data[i + 2];
            const [newR, newG, newB] = this.adjustState(red, green, blue);
            target.data[i] = newR;
            target.data[i + 1] = newG;
            target.data[i + 2] = newB;
        }
        this.applyFilter(target);
        return target;
    }
}
_WebCam_videoEl = new WeakMap(), _WebCam_strip = new WeakMap(), _WebCam_rgbState = new WeakMap();
const Cam = new WebCam('.player');
video.addEventListener('loadedmetadata', () => {
    Cam.setIntoCanvas(canvas);
});
function takePhoto() {
    // Cam.takePhoto(canvas);
}
const rgbContainer = document.querySelector('.rgb');
console.dir(rgbContainer);
/**
 * 實作功能
 * webcam投影
 * 並改變影像輸出
*/ 
