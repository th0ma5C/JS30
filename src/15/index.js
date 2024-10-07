"use strict";
class StorageController {
    #form;
    #list;
    #storageKey = 'LOCAL TAPAS';
    #inputContent = [];
    #isEditing = false;
    #searchInput = document.querySelector('#searchInput');
    #searchWord = '';
    constructor(inputSet) {
        this.#form = document.querySelector(inputSet.form);
        this.#list = document.querySelector(inputSet.list);
        this.initList();
        this.listener();
    }
    listener() {
        this.#form.addEventListener('submit', this.setStorage.bind(this));
        this.#list.addEventListener('click', this.itemCheck.bind(this));
        this.#list.addEventListener('click', this.deleteItem.bind(this));
        this.#list.addEventListener('click', this.editItem.bind(this));
        this.#searchInput.addEventListener('input', this.handleSearch.bind(this));
    }
    verifyInput(input) {
        let timer;
        if (input.trim() !== '')
            return true;
        if (timer)
            clearTimeout(timer);
        const popover = this.#form.querySelector('.popover');
        popover.showPopover();
        timer = setTimeout(() => {
            popover.hidePopover();
        }, 2000);
        return false;
    }
    setStorage(e) {
        e.preventDefault();
        const input = this.#form.querySelector('[name=item]');
        const title = input.value;
        const checked = false;
        const time = new Date().toLocaleString();
        const id = Date.now();
        if (!this.verifyInput(title))
            return input.value = '';
        this.#inputContent.push({ title, checked, time, id });
        localStorage.setItem(this.#storageKey, JSON.stringify(this.#inputContent));
        this.updateList();
        input.value = '';
    }
    getStorage() {
        try {
            const arr = localStorage.getItem(this.#storageKey);
            this.#inputContent = arr ? (JSON.parse(arr)) : [];
        }
        catch (error) {
            console.error(error);
            this.#inputContent = [];
        }
    }
    initList() {
        this.getStorage();
        this.updateList();
    }
    updateList() {
        const fragment = document.createDocumentFragment();
        const showList = this.#inputContent.filter(item => {
            return item.title.indexOf(this.#searchWord) !== -1;
        });
        showList.forEach((item, index) => {
            const checkBox = document.createElement('input');
            checkBox.id = `item${index}`;
            checkBox.dataset.index = item.id.toString();
            checkBox.type = 'checkbox';
            checkBox.checked = item.checked;
            const label = document.createElement('label');
            label.setAttribute('for', `item${index}`);
            label.textContent = item.title;
            const editBtn = document.createElement('button');
            editBtn.textContent = '編輯';
            editBtn.classList.add('editBtn');
            const span = document.createElement('span');
            span.textContent = '❌';
            span.classList.add('delete');
            const timeEl = document.createElement('span');
            timeEl.textContent = item.time;
            timeEl.classList.add('timestamp');
            const li = document.createElement('li');
            li.appendChild(checkBox);
            li.appendChild(label);
            li.appendChild(timeEl);
            li.appendChild(editBtn);
            li.appendChild(span);
            fragment.appendChild(li);
        });
        this.#list.innerHTML = '';
        this.#list.appendChild(fragment);
    }
    itemCheck(e) {
        if (!(e.target instanceof HTMLInputElement) || this.#isEditing)
            return;
        const target = e.target;
        const id = Number(target.dataset.index);
        const item = this.#inputContent.find(item => item.id === id);
        if (!item)
            return;
        item.checked = target.checked;
        localStorage.setItem(this.#storageKey, JSON.stringify(this.#inputContent));
    }
    deleteItem(e) {
        if (!(e.target instanceof HTMLSpanElement) || !e.target.classList.contains('delete'))
            return;
        const li = e.target.parentElement;
        const checkBox = li.querySelector('input');
        const id = Number(checkBox.dataset.index);
        if (!checkBox.checked)
            return;
        this.#inputContent = this.#inputContent.filter(item => item.id !== id);
        localStorage.setItem(this.#storageKey, JSON.stringify(this.#inputContent));
        this.updateList();
    }
    editItem(e) {
        if (!(e.target instanceof HTMLButtonElement) ||
            !e.target.classList.contains('editBtn'))
            return;
        this.#isEditing = true;
        const li = e.target.parentElement;
        const label = li.querySelector('label');
        const checkBox = li.querySelector('input');
        const id = Number(checkBox.dataset.index);
        const originText = label.textContent;
        label.textContent = '';
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = originText ?? '';
        input.classList.add('editInput');
        const completeBtn = document.createElement('button');
        completeBtn.textContent = '取消';
        completeBtn.classList.add('completeBtn');
        li.insertBefore(completeBtn, li.querySelector('span'));
        label.appendChild(input);
        // label.appendChild(completeBtn);
        const editBtn = document.querySelector('.editBtn');
        editBtn.hidden = true;
        input.addEventListener('input', (e) => {
            const target = e.target;
            completeBtn.textContent = target.value ? '完成' : '取消';
        });
        completeBtn.addEventListener('click', () => {
            completeBtn.remove();
            this.#isEditing = false;
            editBtn.hidden = false;
            const text = input.value.trim();
            if (!text)
                return label.textContent = originText;
            const item = this.#inputContent.find(item => item.id === id);
            if (!item)
                return;
            item.title = text;
            localStorage.setItem(this.#storageKey, JSON.stringify(this.#inputContent));
            this.updateList();
        });
    }
    handleSearch(e) {
        const target = e.target;
        this.#searchWord = target.value.trim();
        this.updateList();
    }
}
const list = {
    form: '.add-items',
    list: '.plates'
};
const useStorage = new StorageController(list);
/**
 * ?如何在updateList不用每次清空list
 * 實現局部更新的幾種方式：
 * 只更新變更的項：比較目前的 inputContent 和 DOM 中已有的清單項，找到需要修改的項目並更新，避免清空整個 innerHTML。
 * 透過 diff 演算法進行更新：手動實作類似虛擬 DOM 的機制，只更新那些發生變化的元素。
 * 保持現有的 DOM 結構：新增或刪除項目時，只操作新增的或需要刪除的部分。
 * ---------------------------------
 * 添加唯一ID讓增刪改正常運行
 */ 
