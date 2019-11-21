import Transport from '../Transport/Transport.js';
import {local_storage} from '../LocalStorage/LocalStorage.js';

class Ship extends Transport {

    constructor(id) {
        super(id);
        if (id) {
            this.result = local_storage.get();
            this.result = this.result.ships.find((item) => item.id === this.id);
            let { iddd, model, name, producedYear, capacity, averageSpeed, countOfTeam } = this.result;
            this.model = model;
            this.name = name;
            this.producedYear = producedYear;
            this.capacity = capacity;
            this.averageSpeed = averageSpeed;
            this.countOfTeam = countOfTeam;
        }
    }

    showAvarageSpeed() {
        return this.avarageSpeed;
    }

    getShipList() {
        let listTransport = local_storage.get();
        return listTransport.ships || [];
    }
}

export default Ship;
