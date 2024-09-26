"use strict";
const bands = [
    'The Plot in You',
    'The Devil Wears Prada',
    'Pierce the Veil',
    'Norma Jean',
    'The Bled',
    'Say Anything',
    'The Midway State',
    'We Came as Romans',
    'Counterparts',
    'Oh, Sleeper',
    'A Skylit Drive',
    'Anywhere But Here',
    'An Old Dog'
];
// ignore 'The' 'A' 'An'
// const reg = /^the\b|^an\b|^a\b/i;
const reg = /^(the|an|a)\b/i;
function sortByStart() {
    const result = bands.map((item) => {
        var _a;
        const arr = item.split(' ');
        const start = (_a = arr.find(str => !reg.test(str))) !== null && _a !== void 0 ? _a : '';
        return {
            item,
            start
            // start: Array.from(start)[0].toLowerCase()
        };
    })
        .sort((a, b) => {
        // return (a.start > b.start) ? 1 : -1
        return a.start.localeCompare(b.start);
    })
        .map(item => item.item);
    return result;
}
function createNode() {
    const container = document.querySelector('#bands');
    const fragment = document.createDocumentFragment();
    const list = sortByStart();
    list.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        fragment.appendChild(li);
    });
    container.appendChild(fragment);
}
createNode();
