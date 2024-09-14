class Checkbox {
    #inputList;

    constructor(selectors: string) {
        this.#inputList = [...document.querySelectorAll(selectors) as NodeListOf<HTMLInputElement>];
        this.addListener();
    }

    getScope(a: number, b: number) {
        return [Math.min(a, b), Math.max(a, b)]
    }

    addListener() {
        let lastInput: HTMLInputElement | null = null;

        this.#inputList.forEach((item) => {
            item.addEventListener('click', (e: MouseEvent) => {
                const target = e.target as HTMLInputElement;

                if (e.shiftKey && lastInput) {
                    const [start, end] = this.getScope(
                        this.#inputList.indexOf(target),
                        this.#inputList.indexOf(lastInput)
                    )

                    const action = target.checked;

                    this.#inputList.forEach((item, index) => {
                        if (index > start && index < end) {
                            item.checked = action;

                        }
                    })
                }

                lastInput = target;
            })
        })
    }

}

const checkboxInput = new Checkbox('input');

/**
 * 取得當前input列表，並添加監聽器
 * 如果有按shift且非第一次勾選，計算兩勾選的範圍
 * 宣告當前動作為範圍勾選還是範圍取消
 * 對範圍內input進行動作
 */