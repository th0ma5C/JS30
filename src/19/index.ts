const video = document.querySelector('.player') as HTMLVideoElement;
const canvas = document.querySelector('.photo') as HTMLCanvasElement;

const strip = document.querySelector('.strip') as HTMLElement;
const snap = document.querySelector('.snap') as HTMLAudioElement;

interface RgbState {
    temp: number,
    tint: number,
    filter: string
}
class WebCam {
    #videoEl;
    #strip = document.querySelector('.strip') as HTMLElement;
    #rgbState: RgbState = { temp: 0, tint: 0, filter: 'origin' };

    constructor(selector: string) {
        this.#videoEl = document.querySelector(selector) as HTMLVideoElement;
        this.initCam();
        // this.#videoEl.addEventListener('loadedmetadata', () => {
        // })
        // this.getRGBInput()
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
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) throw Error('missing canvas ctx');

        const width = this.#videoEl.videoWidth;
        const height = this.#videoEl.videoHeight;
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(this.#videoEl, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = this.setColor(pixels);
        ctx.putImageData(pixels, 0, 0);

        requestAnimationFrame(this.setIntoCanvas.bind(this, canvas));
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
        const rgbContainer = document.querySelector('.rgb') as HTMLDivElement;
        rgbContainer.querySelectorAll('input').forEach(input => {
            const elName = input.name as 'temp' | 'tint';
            const val = Number(input.value);
            this.#rgbState[elName] = val;
        })

        const filter = document.querySelector('.imgFilter') as HTMLFieldSetElement;
        filter.querySelectorAll('input').forEach(input => {
            if (!input.checked) return
            const val = input.value;
            this.#rgbState.filter = val;
        })
    }

    adjustState(r: number, g: number, b: number) {
        const { temp, tint } = this.#rgbState;
        const newR = r + temp * 50;
        const newB = b - temp * 50;
        const newG = g + tint * 50;
        return [
            Math.max(0, Math.min(255, newR)),
            Math.max(0, Math.min(255, newG)),
            Math.max(0, Math.min(255, newB))
        ];
    }

    grayScale(imageData: ImageData) {
        for (let i = 0; i < imageData.data.length; i += 4) {
            const red = imageData.data[i];
            const green = imageData.data[i + 1];
            const blue = imageData.data[i + 2];

            const avg = (red + green + blue) / 3;

            imageData.data[i] = avg;     // Red
            imageData.data[i + 1] = avg; // Green
            imageData.data[i + 2] = avg; // Blue
        }
    }

    inverted(imageData: ImageData) {
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = 255 - imageData.data[i];       // Red
            imageData.data[i + 1] = 255 - imageData.data[i + 1]; // Green
            imageData.data[i + 2] = 255 - imageData.data[i + 2]; // Blue
        }
    }

    applyFilter(imageData: ImageData) {
        switch (this.#rgbState.filter) {
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

    setColor(target: ImageData) {
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

        return target
    }
}

const Cam = new WebCam('.player');

video.addEventListener('loadedmetadata', () => {
    Cam.setIntoCanvas(canvas);
})

function takePhoto() {
    // Cam.takePhoto(canvas);
}

const rgbContainer = document.querySelector('.rgb') as HTMLDivElement;
console.dir(rgbContainer);
/**
 * 實作功能
 * webcam投影
 * 並改變影像輸出
*/