"use strict";
const liList = document.querySelectorAll('li');
// console.log(liList);
const arr = Array.from(liList);
let timeSum = arr.reduce((accu, curr) => {
    var _a, _b;
    const dataTime = (_a = curr.dataset.time) !== null && _a !== void 0 ? _a : '0:0';
    const [min, sec] = (_b = dataTime.split(':')) !== null && _b !== void 0 ? _b : [0, 0];
    const tSec = 60 * Number(min) + Number(sec);
    return accu += tSec;
}, 0);
console.log(timeSum);
const hr = Math.floor(timeSum / 3600);
timeSum -= hr * 3600;
const min = Math.floor(timeSum / 60);
timeSum -= min * 60;
const sec = timeSum;
console.log(hr, min, sec);
