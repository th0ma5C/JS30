const liList = document.querySelectorAll('li')

// console.log(liList);

const arr = Array.from(liList);

let timeSum = arr.reduce((accu, curr) => {
    const dataTime = curr.dataset.time ?? '0:0'
    const [min, sec] = dataTime.split(':') ?? [0, 0];
    const tSec = 60 * Number(min) + Number(sec)

    return accu += tSec
}, 0)

console.log(timeSum);

const hr = Math.floor(timeSum / 3600);
timeSum -= hr * 3600
const min = Math.floor(timeSum / 60);
timeSum -= min * 60
const sec = timeSum

console.log(hr, min, sec);