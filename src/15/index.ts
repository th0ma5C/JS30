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
    #isEditing = false;
    #searchInput = document.querySelector('#searchInput') as HTMLInputElement;
    #searchWord = '';

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
        this.#list.addEventListener('click', this.deleteItem.bind(this));
        this.#list.addEventListener('click', this.editItem.bind(this));
        this.#searchInput.addEventListener('input', this.handleSearch.bind(this));
    }

    verifyInput(input: string) {
        let timer;
        if (input.trim() !== '') return true
        if (timer) clearTimeout(timer);

        const popover = this.#form.querySelector('.popover') as HTMLElement;
        popover.showPopover();
        timer = setTimeout(() => {
            popover.hidePopover()
        }, 2000);
        return false
    }

    setStorage(e: SubmitEvent) {
        e.preventDefault();

        const input = this.#form.querySelector('[name=item]') as HTMLInputElement;

        const title = input.value;
        const checked = false;
        if (!this.verifyInput(title)) return input.value = '';

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

        const showList: Item[] = this.#inputContent.filter(item => {
            return item.title.indexOf(this.#searchWord) !== -1
        });

        showList.forEach((item, index) => {
            const checkBox = document.createElement('input');
            checkBox.id = `item${index}`;
            checkBox.dataset.index = index.toString();
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

            const li = document.createElement('li');
            li.appendChild(checkBox);
            li.appendChild(label);
            li.appendChild(editBtn);
            li.appendChild(span);

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
        if (!(e.target instanceof HTMLInputElement) || this.#isEditing) return;
        const target = e.target as HTMLInputElement;
        const index = Number(target.dataset.index);
        // const index = Number(target.id.replace(/[^\d]/g, ''));
        this.#inputContent[index].checked = !this.#inputContent[index].checked;
        localStorage.setItem(this.#storageKey, JSON.stringify(this.#inputContent));
    }

    deleteItem(e: MouseEvent) {
        if (!(e.target instanceof HTMLSpanElement) || !e.target.classList.contains('delete')) return;

        const target = e.target.parentElement?.querySelector('input') as HTMLInputElement;
        if (target.checked) {
            this.#inputContent = this.#inputContent.filter((item, index) => {
                return index !== Number(target.dataset.index)
            })
            console.log(this.#inputContent);
            localStorage.setItem(this.#storageKey, JSON.stringify(this.#inputContent));
        }
        this.updateList();
    }

    editItem(e: MouseEvent) {
        if (!(e.target instanceof HTMLButtonElement) ||
            !e.target.classList.contains('editBtn')
        ) return;
        this.#isEditing = true;

        const li = e.target.parentElement as HTMLElement;
        const label = li.querySelector('label') as HTMLLabelElement;
        const key = Number(li.querySelector('input')?.dataset.index);

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

        const editBtn = document.querySelector('.editBtn') as HTMLButtonElement;
        editBtn.hidden = true;

        input.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            completeBtn.textContent = target.value ? '完成' : '取消'
        })

        completeBtn.addEventListener('click', () => {
            completeBtn.remove();
            this.#isEditing = false;
            editBtn.hidden = false;
            const text = input.value.trim();
            if (!text) {
                label.textContent = originText;
                return
            }
            this.#inputContent[key].title = text;
            localStorage.setItem(this.#storageKey, JSON.stringify(this.#inputContent));
            this.updateList();
        })
    }

    handleSearch(e: Event) {
        const target = e.target as HTMLInputElement;
        this.#searchWord = target.value.trim();
        this.updateList();
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
 * todo 添加唯一ID讓增刪改正常運行
 */