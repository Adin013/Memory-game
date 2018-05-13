// cards array
const cardsArray = [{
    'name': 'sun',
    'img': 'img/sun.png',
  },
  {
    'name': 'moon',
    'img': 'img/moon.png',
  },
  {
    'name': 'star',
    'img': 'img/star.png',
  },
  {
    
    'name': 'cloud',
    'img': 'img/cloud.png',
  },
  {
    
    'name': 'tree',
    'img': 'img/tree.png',
  },
  {
    
    'name': 'tree1',
    'img': 'img/tree1.png',
  },
  {
    
    'name': 'tree2',
    'img': 'img/tree2.png',
  },
  {
    
    'name': 'tree3',
    'img': 'img/tree3.png',
  },
  {
    
    'name': 'grass',
    'img': 'img/grass.jpg',
  },
  {
    
    'name': 'flower',
    'img': 'img/flower.png',
  },
   {
    
    'name': 'drop',
    'img': 'img/drop.png',
  },
   {
    
    'name': 'leaf',
    'img': 'img/leaf.png',
  },
];
// variables for star icons
const stars = document.querySelectorAll(".star");
let starsList = document.querySelectorAll(".stars li");
//variables for moves
let countMoves = 0;
let moves = document.querySelector(".moves");
let movesNumber = document.querySelector("#moves-number");
// close icon in modal
let closeicon = document.querySelector(".close");
// declare modal
let modal = document.getElementById("popup1")
//game timer
let status = 0; //0:stop 1:running
let time = 0;
//start timer on first click or startButton                    
function start(){
  status = 1;
  timer(); 
}
//stopButton
function stop(){
  status = 0;
  if (number === 12){
    finalTime = document.getElementById('timerLabel').innerHTML;
    // show congratulations modal
    modal.classList.add("show");
    // declare star rating variable
    let starRating = document.querySelector(".stars").innerHTML;
    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = countMoves+' moves';
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    //closeicon on modal
    closeModal();
    stop();
  }  
}
//resetButton
function reset(){
  status = 0;
  time = 0;
  let firstGuess = '';
  document.getElementById('timerLabel').innerHTML = '00:00:00';
  location.reload();
}
//game timer
function timer(){
  if(status == 1){
    setTimeout(function(){
      time++;
      let min = Math.floor(time/100/60);
      let sec = Math.floor(time/100);
      let mSec = time % 100;  
      if(min < 10) {
        min = "0" + min;
      }
      if(sec >= 60) {
        sec = sec % 60;
      }
      if(sec < 10) {
        sec = "0" + sec;
      }
      document.getElementById('timerLabel').innerHTML = min + ":" + sec + ":" + mSec;
      timer();
    }, 10);
  }
}
//shuffles cards
let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
//createElement(section)in grid
//add grid to game
const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item.name;
  const front = document.createElement('div');
  front.classList.add('front');
  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item.img})`;
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});
//when cards match
const match = () => {
  let choiced = document.querySelectorAll('.choiced');
  choiced.forEach(card => {
    card.classList.add('match');
  });
}
number = 0;
const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  let choiced = document.querySelectorAll('.choiced');
  choiced.forEach(card => {
    card.classList.remove('choiced');
  });
};
grid.addEventListener('click', function (event) {
  let clicked = event.target;
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('choiced')) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      // count player's moves
      // setting rates based on moves
      countMoves++;
      movesNumber.innerHTML = countMoves;
      if(countMoves>=15&&countMoves<=22) {
        if(countMoves>=18&&countMoves<=27) {
        for( i= 0; i < 3; i++){
          if(i > 1){
            stars[i].style.visibility = "collapse";
          }
        }
      }else if(countMoves>=28&&countMoves<=34) {
        for( i= 0; i < 3; i++){
          if(i > 0){
            stars[i].style.visibility = "collapse";
          }
        }
  }
  firstGuess = clicked.parentNode.dataset.name;
  console.log(firstGuess);
  clicked.parentNode.classList.add('choiced');
  start();
  } else {
    secondGuess = clicked.parentNode.dataset.name;
    console.log(secondGuess);
    clicked.parentNode.classList.add('choiced');
  }
  if (firstGuess !== '' && secondGuess !== '') {
    if (firstGuess === secondGuess) {
      number++;
      setTimeout(match, delay);
      setTimeout(resetGuesses, delay);
      //when all cards match
      if (number === 12) {
        stop();
        console.log(number);
      }
    } else {
      setTimeout(resetGuesses, delay);
    }
  }
    previousTarget = clicked;
  }
});
//close icon on modal
function closeModal(){
  closeicon.addEventListener("click", function(e){
    modal.classList.remove("show");
    reset();
  });
}
// play Again 
function playAgain(){
  modal.classList.remove("show");
  reset();
}
//add event listeners to each card
for (let i = 0; i < 12; i++){
  card = cards[i];
  card.addEventListener("click",stop);
};

