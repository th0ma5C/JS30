"use strict";
class VideoController {
    #video;
    #speedBar;
    #bar;
    constructor(selector) {
        this.#video = document.querySelector(selector);
        this.#speedBar = document.querySelector('.speed');
        this.#bar = document.querySelector('.speed-bar');
        this.addListener();
    }
    getBarScope() {
        const height = this.#speedBar.clientHeight;
        return height;
    }
    addListener() {
        const height = this.getBarScope();
        this.#speedBar.addEventListener('mousemove', (e) => {
            const target = e.currentTarget;
            const currCoord = height - (e.pageY - target.offsetTop);
            const ratio = (currCoord / height);
            this.#bar.style.height = `${ratio * 100}%`;
            let speed = (ratio * 4).toFixed(1);
            if (speed == '0.0')
                speed = '0.1';
            this.#bar.textContent = `${speed}x`;
            this.#video.playbackRate = Number(speed);
        });
    }
}
const speedController = new VideoController('.flex');
