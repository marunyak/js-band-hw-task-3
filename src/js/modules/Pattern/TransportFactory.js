import Ship  from '../Transport/Ship.js';
import Truck from '../Transport/Truck.js';

class TransportFactory {
    create(type, args = '') {
        if (type === 'Ship') {
            return new Ship(args);
        }

        if (type === 'Truck') {
            return new Truck(args);
        }
    }
}

export default TransportFactory;
