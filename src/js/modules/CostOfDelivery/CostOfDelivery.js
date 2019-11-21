import {cost_key}      from '../Global/Variables.js';
import {local_storage} from '../LocalStorage/LocalStorage.js';

class CostOfDelivery {

    setItem(formData) {
        let list = local_storage.get(cost_key);
        list.push(formData);
        local_storage.save(list, cost_key);
    }

    getItem() {
        return local_storage.get(cost_key);
    }

}
export default CostOfDelivery;
