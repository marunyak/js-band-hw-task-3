class LocalStorage {

    constructor (){
        if (typeof LocalStorage.instance === 'object') {
            return LocalStorage.instance;
        }
        LocalStorage.instance = this;
        let prefix = 'JS-Band-';
        this.transport_key = prefix + 'Transport';
        return this;
    }

    save(arr) {
        localStorage.setItem(this.transport_key, JSON.stringify(arr));
    }

    get() {
        return JSON.parse(localStorage.getItem(this.transport_key)) || {};
    }
}

const local_storage = new LocalStorage();

export  {local_storage};
