"use strict";
class PenController {
    #canvas;
    #ctx;
    #penPosition = null;
    #colorInput;
    #color;
    #widthInput;
    #width;
    #eraserInput;
    #isEraser;
    #isDraw = false;
    constructor(selectors) {
        const { canvas, colorInput, widthInput, eraserInput } = selectors;
        this.#canvas = document.querySelector(canvas);
        this.#ctx = this.#canvas.getContext('2d');
        this.#canvas.addEventListener('mousedown', (e) => {
            this.#isDraw = true;
            this.draw(e);
        });
        this.#canvas.addEventListener('mouseup', () => this.#isDraw = false);
        this.#canvas.addEventListener('mouseout', () => this.#isDraw = false);
        this.#canvas.addEventListener('mousemove', (e) => {
            this.draw(e);
            this.setPenPosition(e);
        });
        this.#colorInput = document.querySelector(colorInput);
        this.#color = this.#colorInput.value;
        this.#widthInput = document.querySelector(widthInput);
        this.#width = this.#widthInput.value;
        this.#eraserInput = document.querySelector(eraserInput);
        this.#isEraser = this.#eraserInput.checked;
        const input = [this.#colorInput, this.#widthInput, this.#eraserInput];
        input.forEach(item => item.addEventListener('input', this.listenerCallback.bind(this)));
        this.initPen();
    }
    listenerCallback(e) {
        if (!e.target || !this.#ctx)
            return;
        const target = e.target;
        switch (target.id) {
            case 'pen':
                this.#color = target.value;
                break;
            case 'brushWidth':
                this.#width = target.value;
                break;
            case 'eraserToggle':
                this.#isEraser = target.checked;
                break;
            default:
                break;
        }
        this.initPen();
    }
    initPen() {
        if (!this.#ctx)
            return;
        if (this.#isEraser) {
            this.#ctx.globalCompositeOperation = 'destination-out';
            return;
        }
        this.#ctx.globalCompositeOperation = 'source-over';
        this.#ctx.strokeStyle = this.#color;
        this.#ctx.lineWidth = Number(this.#width);
        this.#ctx.lineJoin = 'round';
        this.#ctx.lineCap = 'round';
    }
    setPenPosition(e) {
        this.#penPosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    }
    draw(e) {
        if (!this.#isDraw || !this.#ctx || !this.#penPosition)
            return;
        this.#ctx.beginPath();
        this.#ctx.moveTo(this.#penPosition.x, this.#penPosition.y);
        this.#ctx.lineTo(e.offsetX, e.offsetY);
        this.#ctx.stroke();
    }
}
const selectors = {
    canvas: '#draw',
    colorInput: '#pen',
    widthInput: '#brushWidth',
    eraserInput: '#eraserToggle'
};
const pen = new PenController(selectors);
/**
 * 先更新位置 後繪製會導致筆觸不連貫
 */ 
