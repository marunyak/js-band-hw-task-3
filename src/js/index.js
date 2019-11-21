import '../css/main.css';
import Catalog from './modules/Catalog/Catalog.js';
import Buttons from './modules/Catalog/Buttons.js';

const root  = document.querySelector('#root');
const ship  = document.querySelector('.create-transport-ship');
const track = document.querySelector('.create-transport-track');
const costDelivery = document.querySelector('.create-cost-delivery');

Catalog.render();

document.querySelector('.create-item').addEventListener('click', (e) => {
    let elem = e.target;
    if (elem.classList.contains('ship')) {
        ship.classList.toggle('show');
    } else if (elem.classList.contains('track')) {
        track.classList.toggle('show');
    } else if (elem.classList.contains('cost')) {
        costDelivery.classList.toggle('show');
    }
    root.classList.toggle('opacity');
    document.body.classList.toggle('stop-scrolling');
});

document.body.addEventListener('click', (e) => {
    let elem = e.target;
    if (elem.classList.contains('cancel')) {
        let button = new Buttons(root);
        button.cancel(elem);
    }
    else if (elem.classList.contains('save')) {
        let button = new Buttons(root);
        button.save(elem);
        button.cancel(elem);
    }
});
