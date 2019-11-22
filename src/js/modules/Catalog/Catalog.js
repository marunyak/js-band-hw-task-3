import TransportFactory from '../Pattern/TransportFactory.js';
import CostOfDelivery from '../CostOfDelivery/CostOfDelivery.js';
import Form from '../Form/Form.js';

class Catalog {

    static render() {
        const tableTransport = document.querySelector('.table-transport tbody');
        const tableCosts = document.querySelector('.table-costs tbody');
        const factoryTransport = new TransportFactory();
        const createTruck = factoryTransport.create('Truck');
        const trucks = createTruck.getTruckListAsynAwait();
        const createShip = factoryTransport.create('Ship');
        const ships = createShip.getShipList();
        let listCosts = new CostOfDelivery().getItem();

        listCosts = listCosts.costs || [];
        tableTransport.innerHTML = '';
        tableCosts.innerHTML = '';

        trucks.then((result) => {
                if (result !== '') {
                    setTimeout(() => {
                        tableTransport.innerHTML += '<tr><td class="table-center" colspan="7">Trucks</td></tr>';
                        result.forEach((item) => {
                            if (item === 'Internal error') {
                                tableTransport.innerHTML += '<tr><td class="table-center" colspan="7">Internal error</td></tr>';
                            } else {
                                const truck = new TransportFactory().create('Truck', item);
                                truck.addTruckInCatalog(truck.showId(),
                                                        truck.showModel(),
                                                        truck.showLicensePlate(),
                                                        truck.showProducedYear(),
                                                        truck.showCapacityInPounds(),
                                                        truck.showAvarageSpeed(),
                                                        truck.showTypeOfGas())
                            }
                        });
                    }, 1000);
                }
                })
              .catch((error) => {
                    tableTransport.innerHTML += '<tr><td class="table-center" colspan="7">Trucks</td></tr><tr><td class="table-center" colspan="7">No Items</td></tr>';
               });

        if (ships.length > 0) {
            tableTransport.innerHTML += '<tr><td class="table-center" colspan="7">Ships</td></tr>';
            ships.forEach((item) => {
                const ship = new TransportFactory().create('Ship', item);
                ship.addShipInCatalog(ship.showId(),
                                      ship.showModel(),
                                      ship.showName(),
                                      ship.showProducedYear(),
                                      ship.showCapacityInPounds(),
                                      ship.showAvarageSpeed(),
                                      ship.showCountOfTeam());
            });
        }

        if (listCosts.length > 0) {
            listCosts.forEach(({ model, cargo, dist }) => new CostOfDelivery().addCostInCatalog(model, cargo, dist));
        }
    }

    saveInCatalog(elem) {
        const element = elem.parentElement
                            .parentElement
                            .parentElement;
        const ship = 'create-transport-ship';
        const truck = 'create-transport-truck';
        const cost = 'create-cost-delivery';

        if (element.classList.contains(ship)) {
            const newShip =  new TransportFactory().create('Ship');
            const formData = Catalog.getDataFromForm('.' + ship);
            if (Form.isEmpty(formData) || Form.isValueSet(formData)) return;
            newShip.addShipToStorage(formData);
        } else if (element.classList.contains(truck)) {
            const newTruck =  new TransportFactory().create('Truck');
            const formData  = Catalog.getDataFromForm('.' + truck);
            if (Form.isEmpty(formData) || Form.isValueSet(formData)) return;
            newTruck.addTruckToStorage(formData);
        } else if (element.classList.contains(cost)) {
            const formData  = Catalog.getDataFromForm('.' + cost);
            if (Form.isEmpty(formData) || Form.isValueSet(formData)) return;
            new CostOfDelivery().setItem(formData);
        }
        Catalog.render();
    }

    static getDataFromForm(formSelector) {
        const inputs = document.querySelectorAll(formSelector + ' input');
        const formData = {};

        inputs.forEach((item) => {
            const name = item.name.split('-')[1];
            const value = item.value.replace(/(<([^>]+)>)/ig, '');
            formData[name] = value;
        })
        Form.resetForm(formSelector);
        return formData;
    }
}
export default Catalog;
