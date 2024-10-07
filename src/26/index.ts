const bg = document.querySelector('.dropdownBackground') as HTMLDivElement;
const ul = document.querySelector('.cool') as HTMLUListElement;
const nav26 = document.querySelector('.top') as HTMLElement;
const { x: nav26X, y: nav26Y } = nav26.getBoundingClientRect();
let initShow = false;
let currLI: HTMLElement | null = null;

function getBgPosition(target: HTMLElement) {
    const dropDown = target.querySelector('.dropdown') as HTMLUListElement;
    const { x, y, width, height } = dropDown.getBoundingClientRect();
    if (!initShow) {
        bg.style.transition = 'opacity 0.1s';
        initShow = true;
    } else {
        bg.style.transition = '';
    }
    bg.style.opacity = '1';
    bg.style.width = `${width}px`;
    bg.style.height = `${height}px`;
    bg.style.top = `${y - nav26Y}px`;
    bg.style.left = `${x}px`;
}

ul.addEventListener('mouseover', (e) => {
    if (currLI) return
    let target = (e.target as HTMLElement).closest('li');
    if (!target) return
    if (!ul.contains(target)) return
    currLI = target;
    console.log(currLI);
    getBgPosition(target);
})

ul.addEventListener('mouseout', (e) => {
    if (!currLI) return
    let relate = e.relatedTarget as HTMLElement;
    while (relate) {
        if (relate == currLI) return
        relate = relate.parentNode as HTMLElement;
    }

    bg.style.opacity = '0';
    currLI = null;
})