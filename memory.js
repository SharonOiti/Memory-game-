const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'red', 'blue', 'green', 'yellow', 'purple'];
const shuffledColors = shuffle(colors);
const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    shuffledColors.forEach(color => {
        const card = document.createElement('div');
        card.classList.add('card', color);
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

function handleCardClick(event) {
    if (lockBoard) return;
    const clickedCard = event.target;

    if (clickedCard === firstCard) return;

    clickedCard.style.backgroundColor = clickedCard.classList[1];

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.classList[1] === secondCard.classList[1];

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.style.backgroundColor = '#ccc';
        secondCard.style.backgroundColor = '#ccc';

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

createBoard();
