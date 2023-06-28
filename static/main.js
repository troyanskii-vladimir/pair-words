var socket = io();
const getGameFieldData = () => {
    return [
        ['1', '2', '2', '3'],
        ['4', '5', '4', '6'],
        ['7', '3', '8', '8'],
        ['7', '1', '5', '6']
    ]
}


//Отправка и задание имени игрока
const form = document.querySelector('.register')

form.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const formData = new FormData(form);
  const name = formData.get('playerName');

  socket.emit('name', name)
  form.classList.add('disable');
})

socket.on('name', (name) => {
  setPlayerName(name);
})

const firstName = document.querySelector('.player-1__name__data');
const secondName = document.querySelector('.player-2__name__data');

function setPlayerName(name) {
  if (firstName.textContent === 'Null') {
    firstName.textContent = name;
  } else {
    secondName.textContent = name;
  }
}


//Задание состояние активности игрока


//Обработка клика по карточкам
const gameField = document.querySelector('.game__field');
const gameCards = gameField.querySelectorAll('.game__card');
const gameData = getGameFieldData().flat();


let score = 0;
let activePlayer = true;

const onCardClickHandler = (evt) => {
    socket.emit('chat message', evt.target.dataset.id)
}

socket.on('chat message', (clickedId) => {
    choseCard(gameCards, clickedId);
})

let openCards = new Array;

start();

function start() {
  for (let i = 0; i < gameCards.length; i++) {
    gameCards[i].querySelector('.game__card-img').src = `img/${gameData[i]}.png`;
    gameCards[i].querySelector('.card__front').dataset.id = i + 1;
    gameCards[i].addEventListener('click', onCardClickHandler);
  }
  return;
}

function checkOpenCards() {
if (openCards.length === 2) {
if (openCards[0] === openCards[1]) {
score += 1;
refreshScore();
console.log(score);
const openCardsElements = gameField.querySelectorAll('.game__card-open');
openCardsElements.forEach((elemente) => {
elemente.classList.add('scored');
elemente.classList.remove('game__card-open');
});
openCards = [];
} else {
const openCardsElements = gameField.querySelectorAll('.game__card-open');
openCardsElements.forEach((elemente) => {
elemente.classList.remove('game__card-open');
})
openCards = [];
}
}
}

function choseCard(allCards, cardId) {
for (let i = 0; i < allCards.length; i++) {
if (allCards[i].querySelector('.card__front').dataset.id === cardId) {
allCards[i].classList.add('game__card-open');

openCards.push(gameData[i]);

setTimeout(checkOpenCards, 1000);
}
}
}
