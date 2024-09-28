const video = document.querySelector('.player') as HTMLVideoElement;
const canvas = document.querySelector('.photo') as HTMLCanvasElement;

const strip = document.querySelector('.strip') as HTMLElement;
const snap = document.querySelector('.snap') as HTMLAudioElement;

class WebCam {
    #videoEl;
    #strip = document.querySelector('.strip') as HTMLElement;


    constructor(selector: string) {
        this.#videoEl = document.querySelector(selector) as HTMLVideoElement;
        this.initCam();
        // this.#videoEl.addEventListener('loadedmetadata', () => {
        // })
    }

    initCam() {
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream) => {
            this.#videoEl.srcObject = stream;
            this.#videoEl.play();
        }).catch((err) => {
            console.log(err);
        })
    }

    setIntoCanvas(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (!ctx) throw Error('missing canvas ctx');

        const width = this.#videoEl.videoWidth;
        const height = this.#videoEl.videoHeight;
        canvas.width = width;
        canvas.height = height;

        return setInterval(() => {
            ctx.drawImage(this.#videoEl, 0, 0, width, height);
            // let pixels = ctx.getImageData(0, 0, width, height);
            // ctx.putImageData(pixels, 0, 0);
        }, 16)
    }

    takePhoto(canvas: HTMLCanvasElement) {
        const data = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = data;
        link.setAttribute('download', 'img');
        link.innerHTML = `<img src="${data}"/>`;
        this.#strip.insertBefore(link, this.#strip.firstChild);
    }

    getColorInput() {

    }

    setColorInput() {

    }
}

// const Cam = new WebCam('.player');

video.addEventListener('loadedmetadata', () => {
    // Cam.setIntoCanvas(canvas);
})

function takePhoto() {
    // Cam.takePhoto(canvas);
}

/**
 * 實作功能
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
 */