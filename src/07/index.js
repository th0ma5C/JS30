"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ArrTool_year;
const guys = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];
const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];
// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
// Array.prototype.every() // is everyone 19 or older?
// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423
class ArrTool {
    constructor() {
        _ArrTool_year.set(this, new Date().getFullYear());
    }
    anyAbove19(arr) {
        return arr.some(item => (__classPrivateFieldGet(this, _ArrTool_year, "f") - item.year) >= 19);
    }
    everyAbove19(arr) {
        return arr.every(item => (__classPrivateFieldGet(this, _ArrTool_year, "f") - item.year) >= 19);
    }
    findID_823423(arr) {
        return arr.find(item => {
            if (item.id === 823423)
                return item.text;
        });
    }
    deleteCommentWithID_823423(arr) {
        const ans = [...arr];
        const target = ans.findIndex(item => item.id === 823423);
        ans.splice(target, 1);
        return ans;
    }
}
_ArrTool_year = new WeakMap();
const tool = new ArrTool();
console.log(tool.anyAbove19(guys));
console.log(tool.everyAbove19(guys));
console.log(tool.findID_823423(comments));
console.log(tool.deleteCommentWithID_823423(comments));
/**
 * arr.some() 若陣列中有任一元素符合條件返回true
 *
 * arr.every() 若陣列中每個元素都符合條件就回傳true
 *
 * arr.find() 找出陣列中第一個符合條件的元素
 *
 * arr.findIndex() 找出陣列中第一個符合條件的鍵
 *
 * arr.slice(start, end) 回傳一原陣列的鍵從 str 到 end 淺拷貝
 *
 * arr.splice(start, deleteCount, item1, item2, ...itemN) 移除或替換原陣列中的元素
 */ 
