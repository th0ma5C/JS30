class Mark {
    #markEl;
    #targetElList;
    #isInit = true;

    constructor() {
        this.#markEl = document.querySelector('.mark') as HTMLDivElement;
        this.#targetElList = document.getElementsByTagName('a');

        this.setListener()
    }

    setListener() {
        document.addEventListener('mouseover', (e) => {
            const target = e.target as HTMLElement
            if (target.tagName !== 'A') return
            this.setMarkPosition(target);
        })
    }

    setMarkPosition(hoverEl: HTMLElement) {
        const { width, height, x, y } = hoverEl.getBoundingClientRect();

        if (this.#isInit) {
            this.#markEl.style.transition = 'none';
            this.#isInit = false;
        } else {
            this.#markEl.style.transition = '';
        }
        this.#markEl.style.height = `${height}px`;
        this.#markEl.style.width = `${width}px`;
        this.#markEl.style.translate = `${x}px ${y}px`;
    }

}

const marker = new Mark();

/**
 * 透過修改transition: none => ''
 * 使初始化的轉場不會在奇怪的地方發生
 */