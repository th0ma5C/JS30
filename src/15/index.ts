interface List {
    form: string,
    list: string
}

interface Item {
    title: string,
    checked: boolean
}

class StorageController {
    #form;
    #list;
    #storageKey: string = 'LOCAL TAPAS';
    #inputContent: Item[] = [];

    constructor(inputSet: List) {
        this.#form = document.querySelector(inputSet.form) as HTMLFormElement;
        this.#list = document.querySelector(inputSet.list) as HTMLUListElement;

        this.initList();
        this.listener();
    }

    listener() {
        // this.#form.addEventListener('submit', (e) => this.setStorage(e));
        // this.#list.addEventListener('click', (e) => this.itemCheck(e));

        this.#form.addEventListener('submit', this.setStorage.bind(this));
        this.#list.addEventListener('click', this.itemCheck.bind(this));
    }

    setStorage(e: SubmitEvent) {
        e.preventDefault();

        const input = this.#form.querySelector('[name=item]') as HTMLInputElement;

        const title = input.value;
        const checked = false;
        this.#inputContent.push({ title, checked });

        localStorage.setItem(this.#storageKey, JSON.stringify(this.#inputContent));

        this.updateList();

        input.value = '';
    }

    getStorage() {
        // const arr = localStorage.getItem(this.#storageKey);
        // this.#inputContent = arr ? JSON.parse(arr) : [];
        try {
            const arr = localStorage.getItem(this.#storageKey);
            this.#inputContent = arr ? (JSON.parse(arr)) as Item[] : [];
        } catch (error) {
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

        this.#inputContent.forEach((item, index) => {
            const checkBox = document.createElement('input');
            checkBox.id = `item${index}`;
            checkBox.dataset.index = index.toString();
            checkBox.type = 'checkbox';
            checkBox.checked = item.checked;

            const label = document.createElement('label');
            label.setAttribute('for', `item${index}`)
            label.textContent = item.title;

            const li = document.createElement('li');
            li.appendChild(checkBox);
            li.appendChild(label);

            fragment.appendChild(li);
        })

        this.#list.innerHTML = '';
        this.#list.appendChild(fragment);
    }

    itemCheck(e: MouseEvent) {
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
        if (!(e.target instanceof HTMLInputElement)) return;

        const target = e.target as HTMLInputElement;
        console.log(target);
        const index = Number(target.dataset.index);
        // const index = Number(target.id.replace(/[^\d]/g, ''));
        this.#inputContent[index].checked = !this.#inputContent[index].checked;
        localStorage.setItem(this.#storageKey, JSON.stringify(this.#inputContent));
    }
}

const list = {
    form: '.add-items',
    list: '.plates'
}

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