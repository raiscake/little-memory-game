// Declare variables

const grid = document.querySelector('.game-grid');

const gridCells = document.getElementsByClassName('game-grid-cell');

const gridCellSingle = document.querySelector('.game-grid-cell');

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
    for (let i = 0; i < gridCells.length; i++) {
        let cell = gridCells[i];
        cell.setAttribute('type', randomCards[i]);
    }
}

attachDeck();

let flippedCards = [];

function flipCard() {
    let cardIcon = this.getAttribute('type');
    this.classList.add(cardIcon);
    if ((this.hasAttribute('matched')) || (this.hasAttribute('flipped'))) {
       return false;
    }
    else {
        this.setAttribute('flipped', true);
        this.classList.remove('face-down');
        flippedCards.push(this);
    }
}

function matchCards() {
    if (flippedCards.length == 2) {
        console.log("is it a match?");
        const firstCard = flippedCards[0],
            secondCard = flippedCards[1];
        if (firstCard.type === secondCard.type) {
            console.log('yes!');
            firstCard.classList.remove('face-down');
            firstCard.classList.add('matched');
            firstCard.setAttribute('matched', true);

            secondCard.classList.remove('face-down');
            secondCard.classList.add('matched');
            secondCard.setAttribute('matched', true);
        }
        else {
            console.log('nope :(');
            setTimeout(function(){
                firstCard.classList.add('face-down');
                firstCard.removeAttribute('flipped');
                secondCard.classList.add('face-down');
                secondCard.removeAttribute('flipped');
            }, 750);
            
        }
        flippedCards = [];
    }
}

// Add listeners
for (let i = 0; i < gridCells.length; i++) {
    let cell = gridCells[i];
    cell.addEventListener("click", flipCard, false);
    cell.addEventListener("click", matchCards);
}