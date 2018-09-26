// Declare variables

const grid = document.querySelector('.game-grid');

const gridCells = document.getElementsByClassName('game-grid-cell');

const cardsList = ['astronaut', 'atom', 'robot', 'rocket', 'saturn', 'shootingstar', 'telescope', 'ufo'];

const totalCards = cardsList.length * 2;

// Make a full deck of cards
function makeCardDeck(cards) {
    let pair = cardsList.slice(0),
        deck = cardsList.concat(pair);
     return deck;   
}

const cardDeck = makeCardDeck(cardsList);

// Shuffle deck
function randomizeDeck(deck) {
    let i = 0,
        j = 0,
        temp = null;

    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)),
            temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return(deck);    
}

// Attach deck to game grid
function attachDeck() {
    const randomCards = randomizeDeck(cardDeck);
    let i = 0; 
    for (cell of gridCells) {
        cell.setAttribute('type', randomCards[i]);
        i++;
    }
//    for (card of randomCards) {
//        let cardName = card;
//        for (cell of gridCells) {
//            cell.classList.add(cardName);
//        }
//  }
}

attachDeck();

// Add event listener
for (cell of gridCells) {
    let cardIcon = cell.getAttribute('type');
    cell.addEventListener('click', function() {
        console.log('clicked');
        this.classList.add(cardIcon); 
    });
}