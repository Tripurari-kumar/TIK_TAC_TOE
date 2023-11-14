const X_CLASS= 'x';
const CIRCLE_CLASS= 'circle';
const WINNING_COMBINATIONS=[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [0, 3, 6],
  [2, 5, 8]
]
let circleTurn;
const cellElements= document.querySelectorAll('[data-cell]');
const WinningMessageTextElement= document.querySelector('[data-winning-message-text]')
const board= document.getElementById('board');
const winningMessage= document.getElementById('winningMessage');
const reStart=document.getElementById('restartButton');

reStart.addEventListener('click',()=>{
  startGame()
})

startGame();

function startGame(){
  circleTurn=false;
  cellElements.forEach(cell => {
    //only does a click event once 
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, {once:true});
  });
  setBoardsHoverClass();
  winningMessage.classList.remove('show');
}

function handleClick(e){
 //place  mark
 //check for win
 //check for draw
 //non of them has happened then switch turn 
 const cell= e.target;
 const currentClass= circleTurn ? CIRCLE_CLASS: X_CLASS;

 placeMark(cell, currentClass);
 if(checkWin(currentClass)){
   console.log('winner');
   endGame(false);
 } else if(isDraw()){
  endGame(true);
 }else{
  swapTurns();
  setBoardsHoverClass();
 }
}

function isDraw(){
  return [...cellElements].every(cell=> cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS))
}

function endGame(draw){
  if(draw){
    WinningMessageTextElement.innerText='Draw!';
  }else{
    WinningMessageTextElement.innerText=`${circleTurn ? "'O's Wins!" : "X's Wins!"}`;
  }
  winningMessage.classList.add('show');
}


function checkWin(currentClass){
  return WINNING_COMBINATIONS.some((combination)=>{
    return combination.every( index =>{
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function placeMark(cell, currentClass){
  cell.classList.add(currentClass);
}

function swapTurns(){
  circleTurn= !circleTurn;
}

function setBoardsHoverClass(){
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if(circleTurn){
    board.classList.add(CIRCLE_CLASS);
  }else{
    board.classList.add(X_CLASS);
  }
}