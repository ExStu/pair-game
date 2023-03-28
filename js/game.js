import Card from './card.js'

let button = document.getElementById('start-btn');
let input = document.getElementById('input');

const gameSetup = () => {

  let res = input.value;

  if((!(res % 2 == 0)) || (res.length == 0)) {
    res = 4;
  }

  game(document.getElementById('game'), (res * res));
}

button.addEventListener('click', gameSetup);

function game (container, cardsQty) {
  console.log(cardsQty)
  let lostOverlay = document.getElementById('game-over');
  let displayTimer = document.getElementById('timer');
  let cardsArrMix = [],
      cardsArr = [],
      firstCard = null,
      secondCard = null,
      interval,
      timeout;

  const clearGame = () => {
    input.value = ''
    displayTimer.textContent = ''
    overlay.classList.remove('overlay--visible');
    lostOverlay.classList.remove('game-over--visible')
    stopConfetti();

    container.innerHTML = ''
    cardsArrMix = [],
    cardsArr = [],
    firstCard = null,
    secondCard = null;

    button.disabled = false;
    gameStart()

    // game (container, cardsQty)
  }

  let clearBtn = document.getElementById('clear-btn');

  clearBtn.addEventListener('click', clearGame);

  const gameOver = () => {
    lostOverlay.classList.add('game-over--visible');
    let timeout = setTimeout(clearGame, 5000)
  }

  function startTimer (seconds) {
    let count = seconds;

    const interval = setInterval(() => {
      displayTimer.textContent = `Time left: ${count} s`;
      // console.log(count)
      count--;

      if(count < 0 || document.querySelectorAll('.card.success').length == cardsArrMix.length) {
        clearInterval(interval);
        // console.log('stopped')
      }

      if (count == 0) {
        let timeout = setTimeout(gameOver, 1000);
      }
    }, 1000)
  }

  startTimer(60)

  for (let i = 1; i <= cardsQty / 2; i++) {
    cardsArrMix.push(i);
    cardsArrMix.push(i);
  }

  for (let i = cardsArrMix.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cardsArrMix[i], cardsArrMix[j]] = [cardsArrMix[j], cardsArrMix[i]];
  }

  for (const cardNum of cardsArrMix) {
    cardsArr.push(new Card(container, cardNum, flip))
  }

  let allCards = document.querySelectorAll('.card');
  if (cardsArr.length == 4) {
    for (const gameCard of allCards) {
      gameCard.classList.add('width-2');
      gameCard.classList.add('height-2');
    }
  } else if (cardsArr.length == 16) {
    for (const gameCard of allCards) {
      gameCard.classList.add('width-4');
      gameCard.classList.add('height-4');
    }
  } else if (cardsArr.length == 36) {
    for (const gameCard of allCards) {
      gameCard.classList.add('width-6');
      gameCard.classList.add('height-6');
    }
  } else if (cardsArr.length == 64) {
    for (const gameCard of allCards) {
      gameCard.classList.add('width-8');
      gameCard.classList.add('height-8');
    }
  } else if (cardsArr.length == 100) {
    for (const gameCard of allCards) {
      gameCard.classList.add('width-10');
      gameCard.classList.add('height-10');
    }
  }

  function flip(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number != secondCard.number) {
        firstCard.open = false
        secondCard.open = false
        firstCard = null
        secondCard = null
      }
    }

    if (firstCard == null) {
      firstCard = card;
    } else if (secondCard == null) {
      secondCard = card;
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.success = true
        secondCard.success = true
        firstCard = null
        secondCard = null
      }
    }

    const celebration = () => {
      let overlay = document.getElementById('overlay');
      overlay.classList.add('overlay--visible');
      startConfetti();
    }

    if (document.querySelectorAll('.card.success').length == cardsArrMix.length) {
      timeout = setTimeout(celebration, 500);
      timeout = setTimeout(clearGame, 6000);
    }
  }
}