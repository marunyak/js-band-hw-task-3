import Transport from './Transport.js';
import { storage } from '../LocalStorage/LocalStorage.js';

class Truck extends Transport {

    constructor(obj = '') {
        super();
        if (obj !== '') {
            const { id, model, licensePlate, producedYear, capacity, averageSpeed, typeOfGas } = obj;
            this.id = id;
            this.model = model;
            this.licensePlate = licensePlate;
            this.producedYear = producedYear;
            this.capacity = capacity;
            this.averageSpeed = averageSpeed;
            this.typeOfGas = typeOfGas;
        }
    }

    showLicensePlate() {
        return this.licensePlate;
    }

    showTypeOfGas() {
        return this.typeOfGas;
    }

    addTruckInCatalog(...args) {
        const itemCatalog = args.map((item) => `<td>${item}</td>`);
        const item = `<tr>${itemCatalog.join('')}</tr>`;
        document.querySelector('.table-transport tbody').innerHTML += item;
    }

    addTruckToStorage(formData) {
        let list = storage.get();
        if (!list.trucks) list.trucks = [];
        list.trucks.push(formData);
        storage.save(list);
    }

    getTruckIdsCallback(callback) {
        setTimeout(() => {
            let listTransport = storage.get();
            if (listTransport.trucks) {
                listTransport = listTransport.trucks.map((item) => item.id);
            } else listTransport = [];
            callback(listTransport);
        }, 1000)
    }

    getTruckIds() {
        return new Promise((resolve => {
            this.getTruckIdsCallback(result => resolve(result));
        }));
    }

    getTruckByIdCallback(id, callback) {
        setTimeout(() => {
            const isError = Math.ceil(Math.random()*1000) < 100;
            if (isError) {
                return callback(undefined, 'Internal error');
            }

            let listTransport = storage.get();
            let {idd,
                   model,
                   licensePlate,
                   producedYear,
                   capacity,
                   averageSpeed,
                   typeOfGas
                } = listTransport.trucks.find((item) => id === item.id);

            callback({
                id,
                model: `${model} truck ${id}`,
                licensePlate,
                producedYear,
                capacity,
                averageSpeed,
                typeOfGas,
            });
        })
    }

    getTruckById(id) {
        return new Promise((resolve, reject) => {
            this.getTruckByIdCallback(id, (result, error = '') => {
                if (error) reject(error);
                resolve(result);
            });
        });
    }

    getTruckListCallback(callback) {
        const list = this.getTruckIds();
        let arr = [];
        list.then((result) => {
            result.forEach((item) => {
                const firstAttempt = this.getTruckById(item);
                firstAttempt.then((result1) => arr.push(result1))
                            .catch((error1) => {
                                const secondAttempt = this.getTruckById(item);
                                secondAttempt.then((result2) => arr.push(result2))
                                            .catch((error2) => arr.push(error2));
                            });
            });
            callback(arr);
        })
        .catch((error) => callback(arr, 'Internal error'));
    }

    getTruckListPromise() {
        return new Promise(((resolve, reject) => {
            this.getTruckListCallback((result, error = '') => {
                if (error) reject(result);
                resolve(result);
            });
        }))
    }

    async getTruckListAsynAwait() {
        return await this.getTruckListPromise();
    }

}

export default Truck;
