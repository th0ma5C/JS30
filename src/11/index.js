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
var _VideoPlayer_player, _VideoPlayer_video, _VideoPlayer_progressContainer, _VideoPlayer_progress, _VideoPlayer_playBtn, _VideoPlayer_volume, _VideoPlayer_playbackRate, _VideoPlayer_rewind, _VideoPlayer_forward, _VideoPlayer_isClick;
class VideoPlayer {
    constructor(selectorObj) {
        _VideoPlayer_player.set(this, void 0);
        _VideoPlayer_video.set(this, void 0);
        _VideoPlayer_progressContainer.set(this, void 0);
        _VideoPlayer_progress.set(this, void 0);
        _VideoPlayer_playBtn.set(this, void 0);
        _VideoPlayer_volume.set(this, void 0);
        _VideoPlayer_playbackRate.set(this, void 0);
        _VideoPlayer_rewind.set(this, void 0);
        _VideoPlayer_forward.set(this, void 0);
        _VideoPlayer_isClick.set(this, false);
        const { player, video, progressContainer, progress, playBtn, volume, playbackRate, rewind, forward, } = selectorObj;
        __classPrivateFieldSet(this, _VideoPlayer_player, document.querySelector(player), "f");
        __classPrivateFieldSet(this, _VideoPlayer_video, document.querySelector(video), "f");
        __classPrivateFieldSet(this, _VideoPlayer_progressContainer, document.querySelector(progressContainer), "f");
        __classPrivateFieldSet(this, _VideoPlayer_progress, document.querySelector(progress), "f");
        __classPrivateFieldSet(this, _VideoPlayer_playBtn, document.querySelector(playBtn), "f");
        __classPrivateFieldSet(this, _VideoPlayer_volume, document.querySelector(volume), "f");
        __classPrivateFieldSet(this, _VideoPlayer_playbackRate, document.querySelector(playbackRate), "f");
        __classPrivateFieldSet(this, _VideoPlayer_rewind, document.querySelector(rewind), "f");
        __classPrivateFieldSet(this, _VideoPlayer_forward, document.querySelector(forward), "f");
        __classPrivateFieldSet(this, _VideoPlayer_forward, document.querySelector(forward), "f");
        this.listener();
    }
    togglePlay(e) {
        // e.stopPropagation();
        if (__classPrivateFieldGet(this, _VideoPlayer_video, "f").paused) {
            __classPrivateFieldGet(this, _VideoPlayer_playBtn, "f").innerText = '❚ ❚';
            __classPrivateFieldGet(this, _VideoPlayer_video, "f").play();
            return;
        }
        __classPrivateFieldGet(this, _VideoPlayer_playBtn, "f").innerText = '►';
        __classPrivateFieldGet(this, _VideoPlayer_video, "f").pause();
    }
    handleProgress() {
        const ratio = __classPrivateFieldGet(this, _VideoPlayer_video, "f").currentTime / __classPrivateFieldGet(this, _VideoPlayer_video, "f").duration * 100;
        __classPrivateFieldGet(this, _VideoPlayer_progress, "f").style.flexBasis = `${ratio || 0}%`;
    }
    handleVolume() {
        const volume = __classPrivateFieldGet(this, _VideoPlayer_volume, "f").value;
        __classPrivateFieldGet(this, _VideoPlayer_video, "f").volume = Number(volume);
    }
    handleSpeed() {
        const speed = __classPrivateFieldGet(this, _VideoPlayer_playbackRate, "f").value;
        __classPrivateFieldGet(this, _VideoPlayer_video, "f").playbackRate = Number(speed);
    }
    handleSkip(e) {
        var _a;
        const target = e.target;
        const val = (_a = Number(target.dataset.skip)) !== null && _a !== void 0 ? _a : 0;
        __classPrivateFieldGet(this, _VideoPlayer_video, "f").currentTime += val;
    }
    handleDragTimeBar(e) {
        if (!__classPrivateFieldGet(this, _VideoPlayer_isClick, "f"))
            return;
        const target = e.target;
        const spendPerPixel = __classPrivateFieldGet(this, _VideoPlayer_video, "f").duration / target.clientWidth;
        __classPrivateFieldGet(this, _VideoPlayer_video, "f").currentTime += (e.movementX * spendPerPixel);
        this.handleProgress();
    }
    listener() {
        __classPrivateFieldGet(this, _VideoPlayer_video, "f").addEventListener('click', this.togglePlay.bind(this));
        __classPrivateFieldGet(this, _VideoPlayer_playBtn, "f").addEventListener('click', this.togglePlay.bind(this));
        this.handleProgress();
        __classPrivateFieldGet(this, _VideoPlayer_video, "f").addEventListener('timeupdate', this.handleProgress.bind(this));
        __classPrivateFieldGet(this, _VideoPlayer_volume, "f").addEventListener('change', this.handleVolume.bind(this));
        __classPrivateFieldGet(this, _VideoPlayer_playbackRate, "f").addEventListener('change', this.handleSpeed.bind(this));
        __classPrivateFieldGet(this, _VideoPlayer_rewind, "f").addEventListener('click', this.handleSkip.bind(this));
        __classPrivateFieldGet(this, _VideoPlayer_forward, "f").addEventListener('click', this.handleSkip.bind(this));
        __classPrivateFieldGet(this, _VideoPlayer_progressContainer, "f").addEventListener('mousedown', () => __classPrivateFieldSet(this, _VideoPlayer_isClick, true, "f"));
        __classPrivateFieldGet(this, _VideoPlayer_progressContainer, "f").addEventListener('mousemove', (e) => this.handleDragTimeBar(e));
        __classPrivateFieldGet(this, _VideoPlayer_progressContainer, "f").addEventListener('mouseup', () => __classPrivateFieldSet(this, _VideoPlayer_isClick, false, "f"));
    }
}
_VideoPlayer_player = new WeakMap(), _VideoPlayer_video = new WeakMap(), _VideoPlayer_progressContainer = new WeakMap(), _VideoPlayer_progress = new WeakMap(), _VideoPlayer_playBtn = new WeakMap(), _VideoPlayer_volume = new WeakMap(), _VideoPlayer_playbackRate = new WeakMap(), _VideoPlayer_rewind = new WeakMap(), _VideoPlayer_forward = new WeakMap(), _VideoPlayer_isClick = new WeakMap();
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
