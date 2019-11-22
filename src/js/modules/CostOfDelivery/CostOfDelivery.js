import {storage} from '../LocalStorage/LocalStorage.js';

class CostOfDelivery {

    setItem(formData) {
        let list = storage.get();
        if (!list.costs) list.costs = [];
        list.costs.push(formData);
        storage.save(list);
    }

    getItem() {
        return storage.get();
    }

    addCostInCatalog(...args) {
        const itemCatalog = args.map((item) => `<td>${item}</td>`);
        const item = `<tr>${itemCatalog.join('')}</tr>`;
        document.querySelector('.table-costs tbody').innerHTML += item;
    }
}
export default CostOfDelivery;
