import Transport from '../Transport/Transport.js';
import { storage } from '../LocalStorage/LocalStorage.js';

class Ship extends Transport {

    constructor(obj = '') {
        super();
        if (obj !== '') {
            const { id, model, name, producedYear, capacity, averageSpeed, countOfTeam } = obj;
            this.id = id;
            this.model = model;
            this.name = name;
            this.producedYear = producedYear;
            this.capacity = capacity;
            this.averageSpeed = averageSpeed;
            this.countOfTeam = countOfTeam;
        }
    }

    showName() {
        return this.name;
    }

    showCountOfTeam() {
        return this.countOfTeam;
    }

    addShipToStorage(formData) {
        let list = storage.get();
        if (!list.ships) list.ships = [];
        list.ships.push(formData);
        storage.save(list);
    }

    getShipList() {
        const listTransport = storage.get();
        return listTransport.ships || [];
    }

    addShipInCatalog(...args) {
        const itemCatalog = args.map((item) => `<td>${item}</td>`);
        const item = `<tr>${itemCatalog.join('')}</tr>`;
        document.querySelector('.table-transport tbody').innerHTML += item;
    }

}

export default Ship;
