import {cost_key} from '../Global/Variables.js';
import TransportFactory from '../Pattern/TransportFactory.js';
import {local_storage} from '../LocalStorage/LocalStorage.js';

class Catalog {

    constructor(to) {
        this.to = to;
    }

    // Add in Catalog rows

    add(...args) {
        let itemCatalog = args.map((item) => `<td>${item}</td>`);
        let item = `<tr>${itemCatalog.join('')}</tr>`;
        document.querySelector(`${this.to} tbody`).innerHTML += item;
    }

    // Render tabels

    static render() {
        const tableTransport = document.querySelector('.table-transport tbody');
        tableTransport.innerHTML = '';
        const factoryTransport = new TransportFactory();
        const trackk  = factoryTransport.create('Track');
        const tracks = trackk.getTruckListAsynAwait();

        tracks.then((result) => {
            if (result) {
                setTimeout(() => {
                    tableTransport.innerHTML += '<tr><td class="table-center" colspan="7">Tracks</td></tr>';
                    result.forEach((item) => {
                        if (item === "Internal error") {
                            tableTransport.innerHTML += '<tr><td class="table-center" colspan="7">Internal error</td></tr>';
                        } else {
                            catalog.add(item.id , item.model, item.licensePlate, item.producedYear, trackk.showCapacityInPounds(item.capacity), item.averageSpeed, item.typeOfGas);
                        }
                    });
                },1000)
            }
            })
            .catch((error) => {
                tableTransport.innerHTML += '<tr><td class="table-center" colspan="7">Tracks</td></tr><tr><td class="table-center" colspan="7">No Items</td></tr>';
            });

        const shipp   = factoryTransport.create('Ship');
        const ships   = shipp.getShipList();
        const catalog = new Catalog('.table-transport');

        if (ships.length) {
            tableTransport.innerHTML += '<tr><td class="table-center" colspan="7">Ships</td></tr>';
            ships.forEach((item) => {
                catalog.add(item.id, item.model, item.name, item.producedYear, shipp.showCapacityInPounds(item.capacity), item.averageSpeed, item.countOfTeam);
            });
        }

        let listCosts = local_storage.get(cost_key);

        document.querySelector('.table-costs tbody').innerHTML = '';
        if (listCosts) {
            listCosts.forEach(({ model: model, cargo: cargo, dist: dist }) => new Catalog('.table-costs').add(model, cargo, dist));
        }
    }

    // Check info in inputs

    static getDataFromForm(formSelector) {
        const inputs = document.querySelectorAll(formSelector + ' input');
        const formData = {};
        inputs.forEach((el) => {
            const name = el.name.split('-')[1];
            const val  = el.value.replace(/(<([^>]+)>)/ig,'');
            formData[name] = val;
        })
        Catalog.resetForm(formSelector);

        return formData;
    }

    // Reset values in form

    static resetForm(formSelector) {
        document.querySelectorAll(formSelector+' input').forEach((item) => item.value = null);
    }

    // Check if object is empty or not

    static isEmpty(obj) {
        for (let key in obj) {
          return false;
        }
        return true;
    }

    // Check if object values are empty or not

    static isValue(obj) {
        for (let key in obj) {
            if (obj[key] === '' || obj[key] === null) return true;
        }
        return false;
    }
}
export default Catalog;
