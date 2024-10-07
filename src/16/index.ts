class MouseTracer {

}

const targetText = document.querySelector('h1') as HTMLHeadingElement;
// 定位點
const rect = targetText.getBoundingClientRect();
const x = Math.round(rect.left + (targetText.clientWidth / 2));
const y = Math.round(rect.top + (targetText.clientHeight / 2));
console.log(x, y);
let deltaX = 0, deltaY = 0;

function moveShadow(e: MouseEvent) {
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

function throttle16() {
    let color = getRandomColor();
    let timer: ReturnType<typeof setTimeout> | null = null;
    return () => {
        if (!timer) {
            timer = setTimeout(() => {
                color = getRandomColor();
                timer = null;
            }, 300)
        }
        return color
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


const throttleGetColor = throttle16();

// function cloneBac() {
//     const fragment = document.createDocumentFragment();

//     const clone = document.createElement('div');
//     clone.classList.add('cloneShadow');

//     for (let i = 0; i < 4; i++) {
//         fragment.appendChild(clone);
//     }

//     targetText.appendChild(fragment);
// }


document.addEventListener('mousemove', (e: MouseEvent) => {
    moveShadow(e);
})