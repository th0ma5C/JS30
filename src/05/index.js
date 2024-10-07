"use strict";
class ClickReflector {
    #elementArr;
    constructor(selector) {
        this.#elementArr = document.querySelectorAll(selector);
        this.addListener();
    }
    toggleOpen(e) {
        if (!e)
            return;
        console.log(e.currentTarget);
        const target = e.currentTarget;
        target.classList.toggle('open');
    }
    addListener() {
        this.#elementArr.forEach((el) => {
            console.log(el);
            el.addEventListener('click', this.toggleOpen);
        });
    }
}
const panelsClickReflector = new ClickReflector('.panel');
// const controller = new AbortController();
// const signal = controller.signal;
// function handleClick(event) {
//     console.log('Clicked:', event.target);
// }
// document.querySelector('.panel').addEventListener('click', handleClick, { signal });
// // 在页面跳转或其他合适时机调用 abort 来移除监听器
// controller.abort(); // 移除所有与该 signal 关联的监听器
