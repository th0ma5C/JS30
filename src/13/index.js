"use strict";
// function debounce(func, wait = 20, immediate = true) {
//     var timeout;
//     return function () {
//         var context = this, args = arguments;
//         var later = function () {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         };
//         var callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//     };
// }
class ImgSlide {
    #img;
    constructor(selector) {
        this.#img = document.querySelectorAll(selector);
        this.observer();
    }
    setImgClass(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
            else {
                entry.target.classList.remove('active');
            }
        });
    }
    observer() {
        const options = {
            root: null,
            rootMargin: ' 0% 0% -20% 0%',
            threshold: 0
        };
        const observer = new IntersectionObserver(this.setImgClass.bind(this), options);
        if (this.#img.length != 0) {
            this.#img.forEach(el => {
                observer.observe(el);
            });
        }
    }
}
function debounce(fn, limit) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, limit);
    };
}
const imgScroll = new ImgSlide('img');
// debounce(imgScroll.observer, 50);
/**
 * 監測圖片是否進入視口，並加上 or 移除樣式
 * 1. css scroll driven animation 實現
 * 2. intersection observer 實現
 */ 
