interface ControllerSelector {
    canvas: string,
    colorInput: string,
    widthInput: string,
    eraserInput: string

}

interface PenPosition {
    x: number,
    y: number
}

class PenController {
    #canvas;
    #ctx;
    #penPosition: PenPosition | null = null;
    #colorInput;
    #color
    #widthInput;
    #width;
    #eraserInput;
    #isEraser;
    #isDraw = false;

    constructor(selectors: ControllerSelector) {
        const { canvas, colorInput, widthInput, eraserInput } = selectors;

        this.#canvas = document.querySelector(canvas) as HTMLCanvasElement;
        this.#ctx = this.#canvas.getContext('2d');

        this.#canvas.addEventListener('mousedown', (e) => {
            this.#isDraw = true;
            this.draw(e);
        })
        this.#canvas.addEventListener('mouseup', () => this.#isDraw = false)
        this.#canvas.addEventListener('mouseout', () => this.#isDraw = false)

        this.#canvas.addEventListener('mousemove', (e) => {
            this.draw(e);
            this.setPenPosition(e);
        });

        this.#colorInput = document.querySelector(colorInput) as HTMLInputElement;
        this.#color = this.#colorInput.value;

        this.#widthInput = document.querySelector(widthInput) as HTMLInputElement;
        this.#width = this.#widthInput.value;

        this.#eraserInput = document.querySelector(eraserInput) as HTMLInputElement;
        this.#isEraser = this.#eraserInput.checked;

        const input = [this.#colorInput, this.#widthInput, this.#eraserInput];
        input.forEach(item => item.addEventListener('input', this.listenerCallback.bind(this)))

        this.initPen();
    }

    listenerCallback(e: Event) {
        if (!e.target || !this.#ctx) return;
        const target = e.target as HTMLInputElement;
        switch (target.id) {
            case 'pen':
                this.#color = target.value;
                break;

            case 'brushWidth':
                this.#width = target.value;
                break;

            case 'eraserToggle':
                this.#isEraser = target.checked
                break;

            default:
                break;
        }

        this.initPen();
    }

    initPen() {
        if (!this.#ctx) return;
        if (this.#isEraser) {
            this.#ctx.globalCompositeOperation = 'destination-out';
            return
        }
        this.#ctx.globalCompositeOperation = 'source-over';
        this.#ctx.strokeStyle = this.#color;
        this.#ctx.lineWidth = Number(this.#width);
        this.#ctx.lineJoin = 'round';
        this.#ctx.lineCap = 'round';
    }

    setPenPosition(e: MouseEvent) {
        this.#penPosition = {
            x: e.offsetX,
            y: e.offsetY
        }
    }

    draw(e: MouseEvent) {
        if (!this.#isDraw || !this.#ctx || !this.#penPosition) return;

        this.#ctx.beginPath();
        this.#ctx.moveTo(this.#penPosition.x, this.#penPosition.y);
        this.#ctx.lineTo(e.offsetX, e.offsetY);
        this.#ctx.stroke();
    }
}

const selectors: ControllerSelector = {
    canvas: '#draw',
    colorInput: '#pen',
    widthInput: '#brushWidth',
    eraserInput: '#eraserToggle'
}

const pen = new PenController(selectors);

/**
 * 先更新位置 後繪製會導致筆觸不連貫
 */