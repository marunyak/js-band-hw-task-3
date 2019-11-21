import {cost_key} from '../Global/Variables.js';

class LocalStorage {

    constructor (){
        if (typeof LocalStorage.instance === 'object') {
            return LocalStorage.instance;
        }
        LocalStorage.instance = this;
        this.cost_key = cost_key;
        return this;
    }

    save(arr, name) {
        localStorage.setItem(name, JSON.stringify(arr));
    }

    get(name) {
        let a = name === this.cost_key?[]:{};
        return JSON.parse(localStorage.getItem(name)) || a;
    }
}

const local_storage = new LocalStorage();

export  {local_storage};
