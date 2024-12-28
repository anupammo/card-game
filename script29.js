const gameBoard = document.getElementById('gameBoard');
const biddingSection = document.getElementById('biddingSection');
const trumpSuitSection = document.getElementById('trumpSuitSection');
const scoreBoard = document.getElementById('scoreBoard');
const cardsArray = [
    'A♠', 'A♠', 'K♠', 'K♠', 'Q♠', 'Q♠', 'J♠', 'J♠', '10♠', '10♠', '9♠', '9♠',
    'A♣', 'A♣', 'K♣', 'K♣', 'Q♣', 'Q♣', 'J♣', 'J♣', '10♣', '10♣', '9♣', '9♣',
    'J♥', 'J♦', 'J♠', 'J♣'
];

let flippedCards = [];
let matchedCards = [];
let trumpSuit = '';

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
}

function flipCard() {
    if (flippedCards.length === 2) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.textContent = '';
            card2.classList.remove('flipped');
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

function biddingPhase() {
    // Implement bidding logic here
    biddingSection.innerHTML = '<p>Bidding phase: Players bid to determine the trump suit.</p>';
}

function setTrumpSuit(suit) {
    trumpSuit = suit;
    trumpSuitSection.innerHTML = `<p>Trump suit is set to ${trumpSuit}</p>`;
}

function scoreGame() {
    // Implement scoring logic here
    scoreBoard.innerHTML = '<p>Scoring phase: Calculate scores based on tricks won.</p>';
}

function initGame() {
    const shuffledCards = shuffle(cardsArray);
    shuffledCards.forEach(cardValue => createCard(cardValue));
    biddingPhase();
}

initGame();
