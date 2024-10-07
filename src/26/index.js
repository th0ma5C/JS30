"use strict";
const bg = document.querySelector('.dropdownBackground');
const ul = document.querySelector('.cool');
const nav26 = document.querySelector('.top');
const { x: nav26X, y: nav26Y } = nav26.getBoundingClientRect();
let initShow = false;
let currLI = null;
function getBgPosition(target) {
    const dropDown = target.querySelector('.dropdown');
    const { x, y, width, height } = dropDown.getBoundingClientRect();
    if (!initShow) {
        bg.style.transition = 'opacity 0.1s';
        initShow = true;
    }
    else {
        bg.style.transition = '';
    }
    bg.style.opacity = '1';
    bg.style.width = `${width}px`;
    bg.style.height = `${height}px`;
    bg.style.top = `${y - nav26Y}px`;
    bg.style.left = `${x}px`;
}
ul.addEventListener('mouseover', (e) => {
    if (currLI)
        return;
    let target = e.target.closest('li');
    if (!target)
        return;
    if (!ul.contains(target))
        return;
    currLI = target;
    console.log(currLI);
    getBgPosition(target);
});
ul.addEventListener('mouseout', (e) => {
    if (!currLI)
        return;
    let relate = e.relatedTarget;
    while (relate) {
        if (relate == currLI)
            return;
        relate = relate.parentNode;
    }
    bg.style.opacity = '0';
    currLI = null;
});
