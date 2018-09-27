// Declare fixed variables

const grid = document.querySelector('.game-grid');

const gridCells = document.getElementsByClassName('game-grid-cell');

const gridCellSingle = document.querySelector('.game-grid-cell');

const cardsList = ['astronaut', 'atom', 'robot', 'rocket', 'saturn', 'shootingstar', 'telescope', 'ufo'];

const totalCards = cardsList.length * 2;

const moveCounter = document.getElementById('moves-counter');

// Declare game variables

let flippedCards = [];
let matchedCards = 0;
let moveCount = 0;

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

// Add flip card functionality
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
    moveCount++;
    moveCounter.textContent = moveCount;
}

// Add matching logic
function matchCards() {
    // Check if 2 cards are flipped
    if (flippedCards.length == 2) {
        const firstCard = flippedCards[0],
            secondCard = flippedCards[1];
        
        // If cards match...    
        if (firstCard.type === secondCard.type) {
            // set classes and attr for first card
            firstCard.classList.remove('face-down');
            firstCard.classList.add('matched');
            firstCard.setAttribute('matched', true);

            // set classes and attr for second card
            secondCard.classList.remove('face-down');
            secondCard.classList.add('matched');
            secondCard.setAttribute('matched', true);

            matchedCards += 2;
        }
        // If cards don't match..
        else {
            setTimeout(function(){
                // flip down first card
                firstCard.classList.add('face-down');
                firstCard.removeAttribute('flipped');

                // flip down second card
                secondCard.classList.add('face-down');
                secondCard.removeAttribute('flipped');
            }, 750);
            
        }

        // Empty flipped cards array
        flippedCards = [];
    }
    // Safety measure in case more cards get flipped in one turn
    else if (flippedCards.length > 2) {
        console.log('I don\'t know how you did this but congrats on breaking my code?');
        flippedCards = [];
    }   
}

// When all cards are matched...


function finishGame() {
    if (matchedCards == totalCards) {
        console.log("you matched all the cards. grats!");
    }
}

// Start the game!
attachDeck();

// Add listeners
for (let i = 0; i < gridCells.length; i++) {
    let cell = gridCells[i];
    cell.addEventListener("click", flipCard);
    cell.addEventListener("click", matchCards);
    cell.addEventListener("click", finishGame);
}