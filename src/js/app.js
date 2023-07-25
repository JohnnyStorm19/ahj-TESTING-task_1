import CardWidget from "./components/CardWidget/CardWidget";


const container = document.querySelector('.container');
const cardWidget = new CardWidget(container);
cardWidget.bindToDOM();