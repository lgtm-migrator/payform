export default class InitScript {
    constructor(className) {
        this.element = document.querySelector(`.${className}`);
        if (!this.element) {
            this.element = {};
            console.error(`Init script tag must contain ${className} class`);
        }
    }

    getParams() {
        const dataSet = this.element.dataset;
        return {
            key: dataSet.key || {},
            invoiceId: dataSet.invoiceId || {},
            orderId: dataSet.orderId,
            endpointInit: dataSet.endpointInit || {},
            endpointEvents: dataSet.endpointEvents || {},
            buttonColor: dataSet.buttonColor,
            logo: dataSet.logo,
            name: dataSet.name
        }
    }
}
