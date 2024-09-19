"use strict";
// start with strings, numbers and booleans
// let age = 100;
// let age2 = age;
// console.log(age, age2);
// age = 200;
// console.log(age, age2);
// let name = 'Wes';
// let name2 = name;
// console.log(name, name2);
// name = 'wesley';
// console.log(name, name2);
// Let's say we have an array
// const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
// console.log(players);
// and we want to make a copy of it.
// const team = players;
// console.log(players, team);
// You might think we can just do something like this:
// team[3] = 'Lux';
// console.log(players, team);
// however what happens when we update that array?
// now here is the problem!
// oh no - we have edited the original array too!
// Why? It's because that is an array reference, not an array copy. They both point to the same array!
// So, how do we fix this? We take a copy instead!
// const team2 = players.slice();
// console.log(team2);
// one way
// or create a new array and concat the old one in
// const team3 = [].concat(players);
// console.log(team3);
// or use the new ES6 Spread
// const team4 = [...players];
// team4[3] = 'heeee hawww';
// console.log(team4);
// const team5 = Array.from(players);
// console.log(team5);
// now when we update it, the original one isn't changed
// team5[3] = 'cool'
// console.log(team5);
// The same thing goes for objects, let's say we have a person object
// with Objects
const person = {
    name: 'Wes Bos',
    age: 80
};
console.log(person);
// and think we make a copy:
const captain = person;
// captain.number = 99;
// how do we take a copy instead?
// const cap2 = Object.assign({}, person, { number: 99, age: 12 });
// console.log(cap2);
// We will hopefully soon see the object ...spread
const cap3 = Object.assign({}, person);
console.log(cap3);
// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
const wes = {
    name: 'Wes',
    age: 100,
    social: {
        twitter: '@wesbos',
        facebook: 'wesbos.developer'
    }
};
console.clear();
console.log(wes);
const dev = Object.assign({}, wes);
console.log(dev);
const dev2 = JSON.parse(JSON.stringify(wes));
console.log(dev2);
/**
 * 陣列、物件的淺拷貝與深拷貝
 * *淺拷貝只複製物件或陣列的第一層屬性或元素，如果屬性或元素是引用類型（如物件或陣列），則複製的是它們的引用。
 *
 * 淺拷貝
 * 1.Object.assign()
 * 2.展開運算符(...)
 * 陣列: slice()、concat()、展開運算符、Array.from()
 *
 * 深拷貝
 * 1.JSON.parse(JSON.stringify())
 *  *遞迴資料結構﹔JSON.stringify() 無法處理遞迴資料結構(裡面包含了自己的參考)
 *  *內建型別﹔JSON.stringify() 無法處理 JS 一些內建型別例如 Map, Set, Date, RegExp, ArrayBuffer
 *  *函式﹔JSON.stringify() 無法處理函式
 * 2.structuredClone(value)
 *  *Prototypes﹔如果您使用 structuredClone() 複製某類別物件實例 Class Instance 您只會取得單純的物件不會包涵 prototype 的部分
 *  *Function﹔如果您的物件包涵了函式則會被移除
 *  *不可複製﹔有些值是不可複製的例如 Error 和 DOM 節點
 * 3.手寫遞迴拷貝
 * 4.Lodash 的 _.cloneDeep()
 */ 
