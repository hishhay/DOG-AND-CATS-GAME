const board = document.getElementById('board');
const diceEl = document.getElementById('dice');
const turnEl = document.getElementById('turn');
const rollBtn = document.getElementById('rollBtn');
const winnerEl = document.getElementById('winner');

let dogPos = 0;
let catPos = 0;
let isPlayerTurn = true;

const events = {
  10: +8,    // פינוק
  17: -5,    // קערת מים
  23: +6,
  36: -8,
  47: +10,
  63: -6,
  77: +7,
  85: -9
};

const cells = [];

for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.textContent = i + 1;
  board.appendChild(cell);
  cells.push(cell);
}

function updateBoard() {
  cells.forEach(cell => cell.className = 'cell');
  if (dogPos < 100) cells[dogPos].classList.add('dog');
  if (catPos < 100) cells[catPos].classList.add('cat');
}

function applyEvent(pos) {
  return events[pos + 1] ? pos + events[pos + 1] : pos;
}

function rollDice() {
  return Math.ceil(Math.random() * 6);
}

function handleTurn() {
  if (dogPos >= 99) {
    winnerEl.textContent = "?? ניצחת! הכלב הגיע ראשון!";
    rollBtn.disabled = true;
    return;
  } else if (catPos >= 99) {
    winnerEl.textContent = "?? החתול ניצח!";
    rollBtn.disabled = true;
    return;
  }

  if (isPlayerTurn) {
    const roll = rollDice();
    diceEl.textContent = `?? יצא לך ${roll}`;
    dogPos = Math.min(dogPos + roll, 99);
    dogPos = applyEvent(dogPos);
    updateBoard();
    isPlayerTurn = false;
    turnEl.textContent = 'חתול (מחשב)';
    setTimeout(handleTurn, 1500);
  } else {
    const roll = rollDice();
    diceEl.textContent = `?? החתול זרק ${roll}`;
    catPos = Math.min(catPos + roll, 99);
    catPos = applyEvent(catPos);
    updateBoard();
    isPlayerTurn = true;
    turnEl.textContent = 'אתה (כלב)';
  }
}

rollBtn.addEventListener('click', handleTurn);
updateBoard();