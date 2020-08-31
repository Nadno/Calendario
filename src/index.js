import '../public/styles/style.scss';

const teste = "Caralho shazam";

const h1 = document.createElement('h1');
h1.innerText = teste;
h1.classList.add('title');

document.body.appendChild(h1);