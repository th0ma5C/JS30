// 在你的 TypeScript 文件頂部添加以下宣告
declare function cornify_add(options?: { y?: boolean; younicorns?: boolean }): void;

class Konami {
    #code;
    #inputStr: string = '';

    constructor(password: string) {
        this.#code = new RegExp(password);
        this.listener();
    }

    verifyPassword() {
        if (this.#code.test(this.#inputStr)) {
            console.log('passed');
            cornify_add();
            return
        }
        console.log('failed');
    }

    updateInput(e: KeyboardEvent) {
        this.#inputStr += e.key;
        if (this.#inputStr.length > 9) {
            this.#inputStr = this.#inputStr.slice(1);
        }
    }

    listener() {
        document.addEventListener('keyup', (e: KeyboardEvent) => {
            this.updateInput(e);
            this.verifyPassword();
            console.log(this.#inputStr, this.#code);
        })
    }
}

const myKonami = new Konami('tp6u4wj/6');


/**
 * 監聽鍵盤事件，對照設定的password
 */