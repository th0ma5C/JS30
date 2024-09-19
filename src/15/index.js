"use strict";
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
var _StorageController_form, _StorageController_list, _StorageController_storageKey, _StorageController_inputContent;
class StorageController {
    constructor(inputSet) {
        _StorageController_form.set(this, void 0);
        _StorageController_list.set(this, void 0);
        _StorageController_storageKey.set(this, 'LOCAL TAPAS');
        _StorageController_inputContent.set(this, []);
        __classPrivateFieldSet(this, _StorageController_form, document.querySelector(inputSet.form), "f");
        __classPrivateFieldSet(this, _StorageController_list, document.querySelector(inputSet.list), "f");
        this.initList();
        this.listener();
    }
    listener() {
        // this.#form.addEventListener('submit', (e) => this.setStorage(e));
        // this.#list.addEventListener('click', (e) => this.itemCheck(e));
        __classPrivateFieldGet(this, _StorageController_form, "f").addEventListener('submit', this.setStorage.bind(this));
        __classPrivateFieldGet(this, _StorageController_list, "f").addEventListener('click', this.itemCheck.bind(this));
    }
    setStorage(e) {
        e.preventDefault();
        const input = __classPrivateFieldGet(this, _StorageController_form, "f").querySelector('[name=item]');
        const title = input.value;
        const checked = false;
        __classPrivateFieldGet(this, _StorageController_inputContent, "f").push({ title, checked });
        localStorage.setItem(__classPrivateFieldGet(this, _StorageController_storageKey, "f"), JSON.stringify(__classPrivateFieldGet(this, _StorageController_inputContent, "f")));
        this.updateList();
        input.value = '';
    }
    getStorage() {
        // const arr = localStorage.getItem(this.#storageKey);
        // this.#inputContent = arr ? JSON.parse(arr) : [];
        try {
            const arr = localStorage.getItem(__classPrivateFieldGet(this, _StorageController_storageKey, "f"));
            __classPrivateFieldSet(this, _StorageController_inputContent, arr ? (JSON.parse(arr)) : [], "f");
        }
        catch (error) {
            console.error(error);
            __classPrivateFieldSet(this, _StorageController_inputContent, [], "f");
        }
    }
    initList() {
        this.getStorage();
        this.updateList();
    }
    updateList() {
        const fragment = document.createDocumentFragment();
        __classPrivateFieldGet(this, _StorageController_inputContent, "f").forEach((item, index) => {
            const checkBox = document.createElement('input');
            checkBox.id = `item${index}`;
            checkBox.dataset.index = index.toString();
            checkBox.type = 'checkbox';
            checkBox.checked = item.checked;
            const label = document.createElement('label');
            label.setAttribute('for', `item${index}`);
            label.textContent = item.title;
            const li = document.createElement('li');
            li.appendChild(checkBox);
            li.appendChild(label);
            fragment.appendChild(li);
        });
        __classPrivateFieldGet(this, _StorageController_list, "f").innerHTML = '';
        __classPrivateFieldGet(this, _StorageController_list, "f").appendChild(fragment);
    }
    itemCheck(e) {
        // let key: string;
        // if (e.target instanceof HTMLLabelElement) {
        //     key = e.target.textContent ?? '';
        // }
        // this.#inputContent.find(item => {
        //     if (item.title == key) {
        //         item.checked = !item.checked;
        //     }
        // })
        // localStorage.setItem(this.#storageKey, JSON.stringify(this.#inputContent));
        if (!(e.target instanceof HTMLInputElement))
            return;
        const target = e.target;
        console.log(target);
        const index = Number(target.dataset.index);
        // const index = Number(target.id.replace(/[^\d]/g, ''));
        __classPrivateFieldGet(this, _StorageController_inputContent, "f")[index].checked = !__classPrivateFieldGet(this, _StorageController_inputContent, "f")[index].checked;
        localStorage.setItem(__classPrivateFieldGet(this, _StorageController_storageKey, "f"), JSON.stringify(__classPrivateFieldGet(this, _StorageController_inputContent, "f")));
    }
}
_StorageController_form = new WeakMap(), _StorageController_list = new WeakMap(), _StorageController_storageKey = new WeakMap(), _StorageController_inputContent = new WeakMap();
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
 *
 */ 
