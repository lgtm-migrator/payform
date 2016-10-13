export default class Form {
    constructor() {
        this.element = document.querySelector('#payform');

        this.email = $('#email');
        this.cardHolder = $('#card-holder');

        this.cardNumber = $('#card-number');
        this.cardNumber.payment('formatCardNumber');

        this.expDate = $('#exp-date');
        this.expDate.payment('formatCardExpiry');

        this.cvv = $('#cvv');
        this.cvv.payment('formatCardCVC');

        $.fn.toggleInputError = function (isError) {
            this.parent('.payform--group').toggleClass('payform--field__error', isError);
        };
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }

    getEmail() {
        return this.email.val();
    }

    getCardHolder() {
        return this.cardHolder.val();
    }

    getCardNumber() {
        return this.cardNumber.val();
    }

    validateCardNumber() {
        const isValid = $.payment.validateCardNumber(this.getCardNumber());
        this.cardNumber.toggleInputError(!isValid);
        return isValid;
    }

    getExpDate() {
        return this.expDate.val();
    }

    validateExpDate() {
        const isValid = $.payment.validateCardExpiry(this.getExpDate());
        this.expDate.toggleInputError(!isValid);
        return isValid;
    }

    getCvv() {
        return this.cvv.val();
    }

    validateCvv() {
        const isValid = $.payment.validateCardCVC(this.getCvv());
        this.expDate.toggleInputError(!isValid);
        return isValid;
    }

    validate() {
        return this.validateCardNumber() && this.validateExpDate() && this.validateCvv();
    }
}
