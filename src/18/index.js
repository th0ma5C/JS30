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
/**
 * Nodelist轉成Array
  let a = Array.from(li).map(item => item.dataset.time) ;
  let b = [...li].map(item => item.dataset.time) ;
  let c = [].map.call(li,item => item.dataset.time) ;
  let d = [].map.apply(li,[item => item.dataset.time]) ;


//字串轉成數字

const [mins, secs] = timeCode.split(':').map(parseFloat);
return (mins * 60) + secs;

const [mins, secs] = timeCode.split(':');
return (mins * 60) + secs * 1;

//數字計算
No1
let sec = seconds % 60 ;
let min = (seconds - sec) / 60 ;
let hour =  (seconds - min * 60 - sec) / (60 * 60);
min = min % 60;

console.log(`${hour}:${min}:${sec}`)

No2
let sec = seconds % 60 ;
let min = ((seconds - sec) / 60) % 60 ;
let hour =  (seconds - min * 60 - sec) / (60 * 60);

console.log(`${hour}:${min}:${sec}`)

No3
const hour = Math.floor(seconds / 3600);
seconds = seconds % 3600;

const min = Math.floor(seconds / 60);
seconds = seconds % 60;

console.log(hour, min, seconds);
 */ 
