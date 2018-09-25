const grid = document.querySelector('.game-grid');

const gridCells = document.getElementsByClassName('game-grid-cell');

const cardsList = ['astronaut', 'atom', 'question-mark', 'robot', 'rocket', 'saturn', 'shootingstar', 'telescope', 'ufo'];

const totalCards = 16;

function randomizeCards(cards) {
    let i = 0,
        j = 0,
        temp = null;

    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)),
            temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return(cards);    
}

function attachCards() {
    const randomCards = randomizeCards(cardsList); 
    const gridCell = document.createElement('li');
    for (card of randomCards) {
        let cardName = card;
        for (cell of gridCells) {
            cell.classList.add(cardName);
        }
    }
}