"use strict";
class MouseTracer {
}
const targetText = document.querySelector('h1');
// 定位點
const rect = targetText.getBoundingClientRect();
const x = Math.round(rect.left + (targetText.clientWidth / 2));
const y = Math.round(rect.top + (targetText.clientHeight / 2));
console.log(x, y);
let deltaX = 0, deltaY = 0;
function moveShadow(e) {
    deltaX = e.clientX - x;
    deltaY = e.clientY - y;
    const color = throttleGetColor();
    targetText.style.textShadow = `
    ${deltaX}px ${deltaY}px 0 ${color},
    ${-deltaX}px ${-deltaY}px 0 ${color},
    ${-deltaY}px ${-deltaX}px 0 ${color},
    ${deltaY}px ${deltaX}px 0 ${color}
    `;
}
function throttle() {
    let color = getRandomColor();
    let timer = null;
    return () => {
        if (!timer) {
            timer = setTimeout(() => {
                color = getRandomColor();
                timer = null;
            }, 300);
        }
        return color;
    };
}
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const throttleGetColor = throttle();
document.addEventListener('mousemove', (e) => {
    moveShadow(e);
});
