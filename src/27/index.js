"use strict";
class Cursor {
    #targetEl;
    // #startCoord: number | null = null;
    // #endCoord: number | null = null;
    #isClicking = false;
    constructor(selector) {
        this.#targetEl = document.querySelector(selector);
        this.addListener();
    }
    addListener() {
        if (!this.#targetEl)
            return;
        this.#targetEl.onmousedown = (e) => this.onMousedown(e);
        this.#targetEl.onmousemove = (e) => this.onMousemove(e);
        this.#targetEl.onmouseup = (e) => this.onMouseup(e);
        this.#targetEl.onmouseleave = (e) => this.onMouseup(e);
    }
    onMousedown(e) {
        this.#isClicking = true;
        this.#targetEl.classList.add('active');
    }
    onMousemove(e) {
        if (!this.#isClicking)
            return;
        const delta = e.movementX;
        this.#targetEl.scrollBy(-delta * 3, 0);
    }
    onMouseup(e) {
        this.#isClicking = false;
        this.#targetEl.classList.remove('active');
    }
}
const slideDrag = new Cursor('.items');
/**
 * 若不使用movementX
 * onMousedown紀錄開始位置
 * onMousemove當前位置減去開始位置後滾動，最後更新開始位置
 */ 
