"use strict";
class VideoPlayer {
    #player;
    #video;
    #progressContainer;
    #progress;
    #playBtn;
    #volume;
    #playbackRate;
    #rewind;
    #forward;
    #isClick = false;
    constructor(selectorObj) {
        const { player, video, progressContainer, progress, playBtn, volume, playbackRate, rewind, forward, } = selectorObj;
        this.#player = document.querySelector(player);
        this.#video = document.querySelector(video);
        this.#progressContainer = document.querySelector(progressContainer);
        this.#progress = document.querySelector(progress);
        this.#playBtn = document.querySelector(playBtn);
        this.#volume = document.querySelector(volume);
        this.#playbackRate = document.querySelector(playbackRate);
        this.#rewind = document.querySelector(rewind);
        this.#forward = document.querySelector(forward);
        this.#forward = document.querySelector(forward);
        this.listener();
    }
    togglePlay(e) {
        // e.stopPropagation();
        if (this.#video.paused) {
            this.#playBtn.innerText = '❚ ❚';
            this.#video.play();
            return;
        }
        this.#playBtn.innerText = '►';
        this.#video.pause();
    }
    handleProgress() {
        const ratio = this.#video.currentTime / this.#video.duration * 100;
        this.#progress.style.flexBasis = `${ratio || 0}%`;
    }
    handleVolume() {
        const volume = this.#volume.value;
        this.#video.volume = Number(volume);
    }
    handleSpeed() {
        const speed = this.#playbackRate.value;
        this.#video.playbackRate = Number(speed);
    }
    handleSkip(e) {
        const target = e.target;
        const val = Number(target.dataset.skip) ?? 0;
        this.#video.currentTime += val;
    }
    handleDragTimeBar(e) {
        if (!this.#isClick)
            return;
        const target = e.target;
        const spendPerPixel = this.#video.duration / target.clientWidth;
        this.#video.currentTime += (e.movementX * spendPerPixel);
        this.handleProgress();
    }
    listener() {
        this.#video.addEventListener('click', this.togglePlay.bind(this));
        this.#playBtn.addEventListener('click', this.togglePlay.bind(this));
        this.handleProgress();
        this.#video.addEventListener('timeupdate', this.handleProgress.bind(this));
        this.#volume.addEventListener('change', this.handleVolume.bind(this));
        this.#playbackRate.addEventListener('change', this.handleSpeed.bind(this));
        this.#rewind.addEventListener('click', this.handleSkip.bind(this));
        this.#forward.addEventListener('click', this.handleSkip.bind(this));
        this.#progressContainer.addEventListener('mousedown', () => this.#isClick = true);
        this.#progressContainer.addEventListener('mousemove', (e) => this.handleDragTimeBar(e));
        this.#progressContainer.addEventListener('mouseup', () => this.#isClick = false);
    }
}
const selectorObj = {
    player: '.player',
    video: '.player__video',
    progressContainer: '.progress',
    progress: '.progress__filled',
    playBtn: '.toggle',
    volume: "input[name='volume']",
    playbackRate: "input[name='playbackRate']",
    rewind: '.rewind',
    forward: '.forward',
};
const plyer = new VideoPlayer(selectorObj);
/**
 * HTML video控制
 * play, pause: 控制開始暫停
 * currentTime: 現在時間，可用+-控制
 * duration: 總時長
 * volume: 音量，可用+-控制
 * playbackRate: 播放速度，可用+-控制
 */ 
