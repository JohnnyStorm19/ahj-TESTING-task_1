import './cardWidget.css';
import { isValidCard, cardSystem } from '../ValidityFunctions/validCard';

export default class CardWidget {
    constructor(parentEl) {
        this.parentEl = parentEl;
        this.form = null;
        this.input = null;
        this.paySystemsContainer = null;
        this.messageContainer = this.parentEl.querySelector('.message_container');
        this.messageEl = this.messageContainer.querySelector('.message');

        this.onSubmit = this.onSubmit.bind(this);
        this.onInput = this.onInput.bind(this);
    }

    static getPaySystemsMarkup() {
        return `
            <div class="paysystems-container">
                <div class="paysystem paysystem_visa"></div>
                <div class="paysystem paysystem_mir"></div>
                <div class="paysystem paysystem_discover"></div>
                <div class="paysystem paysystem_jcb"></div>
                <div class="paysystem paysystem_maestro"></div>
                <div class="paysystem paysystem_mastercard"></div>
            </div>`
    }

    static getInputMarkup() {
        return `
            <form class="form">
                <input class="input" type="text">
                <button class="btn">Click to Validate</button>
            </form>`
    }

    bindToDOM() {
        const cardWidget = document.createElement('div');
        cardWidget.classList.add('cardWidget');

        const paySystemsMarkup = CardWidget.getPaySystemsMarkup();
        const inputWithButtonMarkup = CardWidget.getInputMarkup();

        this.parentEl.prepend(cardWidget);
        cardWidget.insertAdjacentHTML('beforeend', paySystemsMarkup);
        cardWidget.insertAdjacentHTML('beforeend', inputWithButtonMarkup);

        this.form = this.parentEl.querySelector('.form');
        this.paySystemsContainer = this.parentEl.querySelector('.paysystems-container');
        this.input = this.form.querySelector('.input');

        this.form.addEventListener('submit', this.onSubmit);
        this.input.addEventListener('input', this.onInput);

    }

    onSubmit(e) {
        e.preventDefault();
        const cardNumber = this.input.value;
        const system = cardSystem(cardNumber);

        this.messageContainer = this.parentEl.querySelector('.message_container');
        this.messageEl = this.messageContainer.querySelector('.message');

        this.messageContainer.style.visibility = 'visible';

        [...this.paySystemsContainer.querySelectorAll('.paysystem')].forEach(el => {
            if (el.classList.contains(`paysystem_${system.toLowerCase()}`)) {
                el.classList.add('paysystem_valid');
            }
        });

        if (isValidCard(cardNumber)) {
            this.messageEl.textContent = 'Your card is valid';
            return;
        }
        this.messageEl.textContent = 'Your card is invalid';
    }
    onInput() {
        this.messageContainer.style.visibility = 'hidden';
        this.madeInvalid();
    }
    madeInvalid() {
        [...this.paySystemsContainer.querySelectorAll('.paysystem')].forEach(el => {
            if (el.classList.contains('paysystem_valid')) {
                el.classList.remove('paysystem_valid');
            }
        })
    }
}