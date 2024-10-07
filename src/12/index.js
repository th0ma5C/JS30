"use strict";
class Konami {
    #code;
    #inputStr = '';
    constructor(password) {
        this.#code = new RegExp(password);
        this.listener();
    }
    verifyPassword() {
        if (this.#code.test(this.#inputStr)) {
            console.log('passed');
            cornify_add();
            return;
        }
        console.log('failed');
    }
    updateInput(e) {
        this.#inputStr += e.key;
        if (this.#inputStr.length > 9) {
            this.#inputStr = this.#inputStr.slice(1);
        }
    }
    listener() {
        document.addEventListener('keyup', (e) => {
            this.updateInput(e);
            this.verifyPassword();
            console.log(this.#inputStr, this.#code);
        });
    }
}
const myKonami = new Konami('tp6u4wj/6');
/**
 * 監聽鍵盤事件，對照設定的password
 */ 
