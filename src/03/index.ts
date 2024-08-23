class ImgController {
    #root_style = document.documentElement.style;
    #input: NodeListOf<HTMLInputElement>;

    constructor(selector: string) {
        this.#input = document.querySelectorAll(selector);
    }

    // setInputVar() {
    //     this.#input.forEach((el) => {
    //         el.addEventListener('input', ((e) => {
    //             if (!e.target) return
    //             const target = e.target as HTMLInputElement
    //             const { name, value } = target;
    //             const unit = target.dataset.sizing ?? ''

    //             this.#root_style.setProperty(`--${name}`, value + unit)
    //         }))
    //     })
    // }

    setInputVar() {
        this.#input.forEach((el) => {
            el.addEventListener('input', this.handleInput.bind(this));
        });
    }

    handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        if (!target) return;

        const { name, value } = target;
        const unit = target.dataset.sizing ?? '';

        this.#root_style.setProperty(`--${name}`, value + unit);
    }
}

let imgController = new ImgController('.controls input');

imgController.setInputVar()

// console.log(window.getComputedStyle(document.documentElement).getPropertyValue('--size'));