import Transport from '../Transport/Transport.js';
import {local_storage} from '../LocalStorage/LocalStorage.js';

class Track extends Transport {

    constructor(id = '') {
        super(id);
        if (id) {
            this.result = local_storage.get();
            this.result = this.result.tracks.find((item) => item.id === this.id);
            let { idd, model, licensePlate, producedYear, capacity, averageSpeed, typeOfGas } = this.result;
            this.model = model;
            this.licensePlate = licensePlate;
            this.producedYear = producedYear;
            this.capacity = capacity;
            this.averageSpeed = averageSpeed;
            this.typeOfGas = typeOfGas;
        }
    }

    showAvarageSpeed() {
        return this.avarageSpeed;
    }

    getTruckIdsCallback(callback) {
        setTimeout(() => {
            let listTransport = local_storage.get();
            if (listTransport.tracks) {
                listTransport = listTransport.tracks.map((item) => item.id);
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
                return callback(undefined, "Internal error");
            }

            const listTransport = local_storage.get();
            const {idd,
                   model,
                   licensePlate,
                   producedYear,
                   capacity,
                   averageSpeed,
                   typeOfGas
                } = listTransport.tracks.find((item) => id == item.id);

            callback({
                id: id,
                model: `${model} truck ${id}`,
                licensePlate: licensePlate,
                producedYear: producedYear,
                capacity: capacity,
                averageSpeed: averageSpeed,
                typeOfGas: typeOfGas
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
        list.then((result) => {
            let arr = [];
            result.forEach((item) => {
                //first attempt
                let truckId1 = this.getTruckById(item);
                truckId1.then((result1) => arr.push(result1))
                        .catch((error1) => {
                            //second attempt
                            let truckId2 = this.getTruckById(item);
                            truckId2.then((result2) => arr.push(result2))
                                    .catch((error2) => arr.push(error2));
                        });
            });
            callback(arr);
        })
        .catch((error) => callback(arr, "Internal error"));
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

export default Track;
