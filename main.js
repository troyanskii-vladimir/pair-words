const getGameFieldData = () => {
  return [
    ['1', '2', '2', '3'],
    ['4', '5', '4', '6'],
    ['7', '3', '8', '8'],
    ['7', '1', '5', '6']
  ]
}

let score = 0;

const gameField = document.querySelector('.game__field');
const gameCards = gameField.querySelectorAll('.game__card');
const scoreElement = document.querySelector('.your__score');


const gameData = getGameFieldData().flat();


const onCardClickHandler = (evt) => {
  choseCard(gameCards, evt.target.dataset);
}

let openCards = new Array;

start();

function refreshScore() {
  scoreElement.textContent = 'Угадал ' + score + ' пар картинок.'
}


function start() {
  if (gameCards.length !== gameData.length) {
    return;
  }

  for (let i = 0; i < gameCards.length; i++) {
    gameCards[i].querySelector('.game__card-img').src = `img/${gameData[i]}.png`;
    gameCards[i].querySelector('.card__front').dataset.id = i + 1;
    gameCards[i].addEventListener('click', onCardClickHandler);
  }
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
      })
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
    if (allCards[i].querySelector('.card__front').dataset.id === cardId.id) {
      allCards[i].classList.add('game__card-open');

      openCards.push(gameData[i]);

      console.log(openCards)

      let test = setTimeout(checkOpenCards, 1000);
    }
  }
}

