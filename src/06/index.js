"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CityList_cityList, _CityList_searchedList, _CityList_keyword, _CityList_inputEl, _CityList_outputEl;
class CityList {
    constructor(api, options = {}, inputEl, outputEl) {
        _CityList_cityList.set(this, []);
        _CityList_searchedList.set(this, []);
        _CityList_keyword.set(this, null);
        _CityList_inputEl.set(this, void 0);
        _CityList_outputEl.set(this, void 0);
        __classPrivateFieldSet(this, _CityList_inputEl, inputEl, "f");
        __classPrivateFieldSet(this, _CityList_outputEl, outputEl, "f");
        this.fetchData(api, options);
        this.addListener();
    }
    get cityList() {
        return __classPrivateFieldGet(this, _CityList_cityList, "f");
    }
    fetchData(api, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(api, options);
                const data = yield res.json();
                __classPrivateFieldSet(this, _CityList_cityList, [...data], "f");
                this.displayList(__classPrivateFieldGet(this, _CityList_cityList, "f"));
                return;
            }
            catch (error) {
                console.log(this.fetchData.name, error);
            }
        });
    }
    displayList(list) {
        if (!__classPrivateFieldGet(this, _CityList_outputEl, "f"))
            return;
        __classPrivateFieldGet(this, _CityList_outputEl, "f").innerHTML = '';
        const fragment = document.createDocumentFragment();
        list.forEach((item) => {
            const cityName = document.createElement('span');
            cityName.textContent = `${item.city}, ${item.state}`;
            if (__classPrivateFieldGet(this, _CityList_keyword, "f")) {
                const regex = new RegExp(__classPrivateFieldGet(this, _CityList_keyword, "f"), 'gi');
                cityName.innerHTML = cityName.innerHTML.replace(regex, (match) => {
                    return `<span class="hl">${match}</span>`;
                });
            }
            cityName.className = 'name';
            const population = document.createElement('span');
            const formatNum = Number(item.population).toLocaleString();
            population.textContent = `${formatNum}`;
            population.className = 'population';
            const li = document.createElement('li');
            li.appendChild(cityName);
            li.appendChild(population);
            fragment.appendChild(li);
        });
        __classPrivateFieldGet(this, _CityList_outputEl, "f").appendChild(fragment);
    }
    searchingList(keyword) {
        __classPrivateFieldSet(this, _CityList_keyword, keyword, "f");
        // this.#searchedList = this.#cityList.filter((item) => {
        //     return item.city.includes(keyword) || item.state.includes(keyword);
        // })
        const regex = new RegExp(__classPrivateFieldGet(this, _CityList_keyword, "f"), 'gi');
        __classPrivateFieldSet(this, _CityList_searchedList, __classPrivateFieldGet(this, _CityList_cityList, "f").filter((item) => {
            return item.city.match(regex) || item.state.match(regex);
        }), "f");
    }
    addListener() {
        var _a;
        (_a = __classPrivateFieldGet(this, _CityList_inputEl, "f")) === null || _a === void 0 ? void 0 : _a.addEventListener('input', (e) => {
            const target = e.target;
            this.searchingList(target.value);
            this.displayList(__classPrivateFieldGet(this, _CityList_searchedList, "f"));
        });
    }
}
_CityList_cityList = new WeakMap(), _CityList_searchedList = new WeakMap(), _CityList_keyword = new WeakMap(), _CityList_inputEl = new WeakMap(), _CityList_outputEl = new WeakMap();
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const cityList = new CityList(endpoint, {}, searchInput, suggestions);
/**
 * 正則前瞻用法
 * string.replace()第二個參數可使用函式
 * string.includes無法辨別大小寫
 * document.createDocumentFragment() 的使用
 */ 
