const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

// function makeGreen() {
//     const p = document.querySelector('p');
//     p.style.color = '#BADA55';
//     p.style.fontSize = '50px';
// }

// Regular
console.log('Hello console');

// Interpolated
console.log('Hello I am a %s string', '✅');
/**
 * 佔位符用法
 * %s：字符串
 * %d 或 %i：整數
 * %f：浮點數
 * %o：物件（object）
 * %j：JSON
 */


// Styled
console.log('%c I am some great text', 'font-size:50px; background:red; text-shadow: 10px 10px 0 blue')
/**
 * %c：可以應用CSS
 */


// warning!
console.warn('alert');

// Error :|
console.error('error');

// Info
console.info('this is info');
/**
 * 在一些瀏覽器的控制台中，console.info 可能會比 console.log 的輸出帶有不同的圖標或樣式。
 */


// Testing
const p = document.querySelector('p');
console.assert(p?.classList.contains('ouch'), "that's wrong");
/**
 * console.assert(expression, message)會進行條件判斷
 * 若表達式結果為true，不會輸出訊息
 * 不符合時輸出錯誤訊息
 */


// clearing
console.clear();


// Viewing DOM Elements
console.log(p);
console.dir(p);
/**
 * 使用 console.dir 可以幫助開發者更深入地了解對象的結構和內容
 */
console.clear();


// Grouping together
dogs.forEach((dog) => {
    console.groupCollapsed(`${dog.name}`);
    console.log(dog.name);
    console.groupEnd();
})

// counting
console.count('1')
console.count('1')
console.count('2')
console.count('1')
console.count('1')
console.count('2')
console.count('1')


// timing
console.time('record');

setTimeout(() => {
    console.timeEnd('record');
}, 2000);


console.table(dogs);

