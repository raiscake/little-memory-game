// Declare game grid variables

const grid = document.querySelector('.game-grid');
const gridCells = document.getElementsByClassName('game-grid-cell');
const gridCellSingle = document.querySelector('.game-grid-cell');
const cardsList = ['astronaut', 'atom', 'robot', 'rocket', 'saturn', 'shootingstar', 'telescope', 'ufo'];
const totalCards = cardsList.length * 2;

// Declare game proper variables

let flippedCards = [];
let matchedCards = 0;
let moveCount = 0;

// Declare game stats variables

const moveCounter = document.getElementById('moves-counter');
const victoryModal = document.querySelector('.victory-modal');

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
    for (let i = 0; i < gridCells.length; i++) {
        let cell = gridCells[i];
        cell.setAttribute('type', randomCards[i]);
    }
}

// Add timer
const minsTimer = document.getElementById('timer-minutes');
const secsTimer = document.getElementById('timer-seconds');

let secs = 0,
    mins = 0,
    time;

function setTimer() {
    time = setInterval(function(){
        secs++;
        if (secs == 60) {
            mins++;
            secs = 0;
        }
        secsTimer.textContent = secs;
        minsTimer.textContent = mins;
    }, 1000)
}

// Add flip card functionality w/ timer and move counter
function flipCard() {
    let cardIcon = this.getAttribute('type');
    this.classList.add(cardIcon);

    // Ignore card if already matched or flipped up
    if ((this.hasAttribute('matched')) || (this.hasAttribute('flipped'))) {
       return false;
    }

    // Otherwise, flip it up and add to array
    else {
        this.setAttribute('flipped', true);
        this.classList.remove('face-down');
        flippedCards.push(this);
    }

    // Start timer if moves = 0
    if (moveCount == 0) {
        setTimer();
    }

    // Add to move counter
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
        clearInterval(time);
        victoryModal.classList.add('enabled');
    }
}

// Add rating system
const starCounter = document.querySelector('.game-stats-rating');
const starIcon = document.getElementsByClassName('rating-star');

function checkRating() {
    // Start with 5 stars
    // If between than 17 moves and 20 moves, remove one star
    if ((moveCount >= 17) && (moveCount <= 20)) {
        starIcon[4].classList.add('disabled');
    }
    // Between 21 and 24, remove one more star
    else if ((moveCount >= 21) && (moveCount <= 24)) {
        starIcon[3].classList.add('disabled');
    }
    // Between 25 and 28, remove one more star
    else if ((moveCount >= 25) && (moveCount <= 28)) {
        starIcon[2].classList.add('disabled');
    }
    // 29 onwards, remove one more star
    else if (moveCount >= 29) {
        starIcon[1].classList.add('disabled');
    }
}

// Start the game!
attachDeck();

for (let i = 0; i < gridCells.length; i++) {
    let cell = gridCells[i];
    cell.addEventListener("click", flipCard);
    cell.addEventListener("click", matchCards);
    cell.addEventListener("click", checkRating);
    cell.addEventListener("click", finishGame);
}

// Reset the game
const resetButton = document.querySelector('.reset-button');

function resetGame() {
    // Remove victory modal
    victoryModal.classList.remove('enabled');

    // Reset match variables
    flippedCards = [];
    matchedCards = 0;

    // Reset move counter
    moveCount = 0;
    moveCounter.textContent = 0;

    // Reset timer
    secs = 0;
    mins = 0,
    time = 0;

    secsTimer.textContent = 0;
    minsTimer.textContent = 0;    

    // Reset rating
    for (icon of starIcon) {
        icon.classList.remove('disabled');
    }

    // Flip down cards
    for (cell of gridCells) {
        cell.removeAttribute('matched');
        cell.removeAttribute('flipped');
        cell.className ='game-grid-cell';
    }

    // Reset deck
    attachDeck();    
}

resetButton.addEventListener('click', resetGame);