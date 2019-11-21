import Ship  from '../Transport/Ship.js';
import Track from '../Transport/Track.js';

class TransportFactory {
    create(type) {
        if (type === 'Ship') {
            return new Ship();
        }

        if (type === 'Track') {
            return new Track();
        }
    }
}

export default TransportFactory;
