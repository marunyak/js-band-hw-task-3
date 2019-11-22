class Form {

    static cancel(elem) {
        const element = elem.parentElement
                            .parentElement
                            .parentElement;
        const ship = 'create-transport-ship';
        const truck = 'create-transport-truck';
        const cost = 'create-cost-delivery';

        element.classList.toggle('show');
        if (element.classList.contains(ship)) {
            Form.resetForm('.' + ship);
        } else if (element.classList.contains(truck)) {
            Form.resetForm('.' + truck);
        } else if (element.classList.contains(cost)) {
            Form.resetForm('.' + cost);
        }
        document.querySelector('#root').classList.toggle('opacity');
        document.body.classList.toggle('stop-scrolling');
    }

    static resetForm(formSelector) {
        document.querySelectorAll(formSelector + ' input').forEach((item) => item.value = null);
    }

    static isValueSet(obj) {
        for (let key in obj) {
            if (obj[key] === '' || obj[key] === null) return true;
        }
        return false;
    }

    static isEmpty(obj) {
        for (let key in obj) {
          return false;
        }
        return true;
    }

}
export default Form;
