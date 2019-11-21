import CostOfDelivery  from '../CostOfDelivery/CostOfDelivery.js';
import {local_storage} from '../LocalStorage/LocalStorage.js';
import Catalog         from './Catalog.js';

class Buttons {

    constructor (root) {
        this.root = root;
    }

    //Save all values from input in LocalStorage

    save(elem) {
        let nameElement = elem.parentElement.parentElement.parentElement;
        if (nameElement.classList.contains('create-transport-ship')) {
            const formData = Catalog.getDataFromForm('.create-transport-ship');
            if (Catalog.isEmpty(formData) || Catalog.isValue(formData)) return;
            let list   = local_storage.get();

            if (!list.ships) list['ships'] = [];
            list.ships.push(formData);
            local_storage.save(list);

            Catalog.render();
        }
        else if (nameElement.classList.contains('create-transport-track')) {
            const formData = Catalog.getDataFromForm('.create-transport-track');
            if (Catalog.isEmpty(formData) || Catalog.isValue(formData)) return;
            let list   = local_storage.get();

            if (!list.tracks) list['tracks'] = [];
            list.tracks.push(formData);
            local_storage.save(list);

            Catalog.render();
        }
        else if (nameElement.classList.contains('create-cost-delivery')) {
            const formData = Catalog.getDataFromForm('.create-cost-delivery');
            if (Catalog.isEmpty(formData) || Catalog.isValue(formData)) return;
            new CostOfDelivery().setItem(formData);

            Catalog.render();
        }
    }

    //Cancel form

    cancel(elem) {
        let nameElement = elem.parentElement
                              .parentElement
                              .parentElement;

        nameElement.classList.toggle('show');
        if (nameElement.classList.contains('create-transport-ship'))       Catalog.resetForm('.create-transport-ship');
        else if (nameElement.classList.contains('create-transport-track')) Catalog.resetForm('.create-transport-track');
        else if (nameElement.classList.contains('create-cost-delivery'))   Catalog.resetForm('.create-cost-delivery');
        this.root.classList.toggle('opacity');
        document.body.classList.toggle('stop-scrolling');
    }
}
export default Buttons;
