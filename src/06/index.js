"use strict";
class CityList {
    #cityList = [];
    #searchedList = [];
    #keyword = null;
    #inputEl;
    #outputEl;
    constructor(api, options = {}, inputEl, outputEl) {
        this.#inputEl = inputEl;
        this.#outputEl = outputEl;
        this.fetchData(api, options);
        this.addListener();
    }
    get cityList() {
        return this.#cityList;
    }
    async fetchData(api, options) {
        try {
            const res = await fetch(api, options);
            const data = await res.json();
            this.#cityList = [...data];
            this.displayList(this.#cityList);
            return;
        }
        catch (error) {
            console.log(this.fetchData.name, error);
        }
    }
    displayList(list) {
        if (!this.#outputEl)
            return;
        this.#outputEl.innerHTML = '';
        const fragment = document.createDocumentFragment();
        list.forEach((item) => {
            const cityName = document.createElement('span');
            cityName.textContent = `${item.city}, ${item.state}`;
            if (this.#keyword) {
                const regex = new RegExp(this.#keyword, 'gi');
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
        this.#outputEl.appendChild(fragment);
    }
    searchingList(keyword) {
        this.#keyword = keyword;
        // this.#searchedList = this.#cityList.filter((item) => {
        //     return item.city.includes(keyword) || item.state.includes(keyword);
        // })
        const regex = new RegExp(this.#keyword, 'gi');
        this.#searchedList = this.#cityList.filter((item) => {
            return item.city.match(regex) || item.state.match(regex);
        });
    }
    addListener() {
        this.#inputEl?.addEventListener('input', (e) => {
            const target = e.target;
            this.searchingList(target.value);
            this.displayList(this.#searchedList);
        });
    }
}
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
