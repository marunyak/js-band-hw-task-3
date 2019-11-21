class Transport {

    constructor(id) {
        this.id = id;
    }

    showId() {
        return this.id;
    }

    showModel() {
        return this.model;
    }

    showProducedYear() {
        return this.producedYear;
    }

    showAvarageSpeed() {
        return this.avarageSpeed;
    }

    showCapacityInPounds(kg = '') {
        return kg?(kg * 2.2).toFixed(1):(this.capacity * 2.2).toFixed(1);
    }
}

export default Transport;
