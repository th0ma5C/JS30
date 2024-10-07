class VideoController {
    #video;
    #speedBar;
    #bar

    constructor(selector: string) {
        this.#video = document.querySelector(selector) as HTMLVideoElement;
        this.#speedBar = document.querySelector('.speed') as HTMLDivElement;
        this.#bar = document.querySelector('.speed-bar') as HTMLDivElement;

        this.addListener()
    }

    getBarScope() {
        const height = this.#speedBar.clientHeight;
        return height
    }

    addListener() {
        const height = this.getBarScope();

        this.#speedBar.addEventListener('mousemove', (e) => {
            const target = e.currentTarget as HTMLElement;
            const currCoord = height - (e.pageY - target.offsetTop);
            const ratio = (currCoord / height);
            this.#bar.style.height = `${ratio * 100}%`;

            let speed = (ratio * 4).toFixed(1);
            if (speed == '0.0') speed = '0.1';
            this.#bar.textContent = `${speed}x`;

            this.#video.playbackRate = Number(speed);
        },)
    }
}

const speedController = new VideoController('.flex')