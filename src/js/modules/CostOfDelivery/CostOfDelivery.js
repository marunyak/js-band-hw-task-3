import {local_storage} from '../LocalStorage/LocalStorage.js';

class CostOfDelivery {

    setItem(formData) {
        let list = local_storage.get();
        if (!list.costs) list['costs'] = [];
        list.costs.push(formData);
        local_storage.save(list);
    }

    getItem() {
        return local_storage.get();
    }

}
export default CostOfDelivery;
