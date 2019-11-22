import '../css/main.css';
import Catalog from './modules/Catalog/Catalog.js';
import Form from './modules/Form/Form.js';

const root  = document.querySelector('#root');
const ship  = document.querySelector('.create-transport-ship');
const truck = document.querySelector('.create-transport-truck');
const costDelivery = document.querySelector('.create-cost-delivery');

Catalog.render();

document.querySelector('.create-item').addEventListener('click', (e) => {
    const elem = e.target;
    const show = 'show';

    if (elem.classList.contains('ship')) {
        ship.classList.toggle(show);
    } else if (elem.classList.contains('truck')) {
        truck.classList.toggle(show);
    } else if (elem.classList.contains('cost')) {
        costDelivery.classList.toggle(show);
    }
    root.classList.toggle('opacity');
    document.body.classList.toggle('stop-scrolling');
});

document.body.addEventListener('click', (e) => {
    let elem = e.target;

    if (elem.classList.contains('cancel')) {
        Form.cancel(elem);
    } else if (elem.classList.contains('save')) {
        new Catalog().saveInCatalog(elem);
        Form.cancel(elem);
    }
});
