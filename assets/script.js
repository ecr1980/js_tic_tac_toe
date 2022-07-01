const gameboard = (function() {
  let gameboardArray = new Array(9);
  let turnCount = 1;

  function makeBoard() {
    let gameboardDiv = document.getElementById("gameboard");
    for (let i = 0; i <= 8; i++) {
      let newDiv = document.createElement('div')
      gameboardDiv.appendChild(newDiv)
      newDiv.classList.add("gameboard-cell")
      newDiv.setAttribute("id", `gameboard-cell-${i}`)
      newDiv.innerHTML = ""
      gameboardArray[i] = ""
      let turnDisplay = document.getElementById('message-display')
      turnDisplay.innerHTML = `It's ${player.getPlayer()}'s turn!`
      newDiv.addEventListener('click', function() {changeBoard(i)}, {once: true });
      addButtons();
    }
  }

  function addButtons() {
    const addNameButton = document.getElementById('submit');
    const skipAddingNames = document.getElementById('skip');

    addNameButton.addEventListener('click', () => {player.playerName()}, {once: true});
    skipAddingNames.addEventListener('click', () => {toggleShowInput()});
  }

  function deleteBoard() {
    let gameboardDiv = document.getElementById("gameboard");
    gameboardDiv.innerHTML = "";
  }

  function reset() {
    deleteBoard();
    makeBoard();
    turnCount = 1;
    nameField = document.getElementById('name-inputs')
    nameField.hidden = false
  }

  function changeBoard(cell)  {
    let currentDiv = document.getElementById(`gameboard-cell-${cell}`);
    let symbol = player.getPlayerSymbol()
    currentDiv.innerHTML = symbol;
    gameboardArray[cell] = currentDiv.innerHTML;
    if (checkForWin() == true ) {
      ending(true)
    }
    else if (turnCount == 9){
      ending(false)
    }
    else {
      turnCount += 1;
      player.nextTurn();
    }
  };

  function checkForWin() {

    if (checkVertical() == true || checkHorizontal() == true || checkDiaginal() == true) {
     return true;
    }
    return false;
  }

  function checkVertical() {
    for (let i = 0; i <=2; i++) {
      if (gameboardArray[i] == 'X' || gameboardArray[i] == 'O') {
        if ((gameboardArray[i] == gameboardArray[i+3]) && gameboardArray[i] == gameboardArray[i+6]){
          console.log("vertical win")
          return true
        }
      }
    }
    return false
  }

  function checkHorizontal() {
    for (let i = 0; i <=2; i++) {
      if (gameboardArray[i*3] == 'X' || gameboardArray[i*3] == 'O') {
        if ((gameboardArray[i*3] == gameboardArray[(i*3)+1]) && gameboardArray[i*3] == gameboardArray[(i*3)+2]){
          console.log("horizontal win")
          return true
        }
      }
    }
    return false
  }

  function checkDiaginal() {
    if (gameboardArray[0] == 'X' || gameboardArray[0] == 'O') {
      if ((gameboardArray[0] == gameboardArray[4])&&(gameboardArray[0] == gameboardArray[8])) {
        console.log("diag top down win")
        return true
      }
    }
    if (gameboardArray[2] == 'X' || gameboardArray[2] == 'O') {
      if ((gameboardArray[2] == gameboardArray[4])&&(gameboardArray[2] == gameboardArray[6])) {
        console.log("diag down up win")
        return true
      }
    }
    return false
  }

  function ending(win) {
    let message = document.getElementById('message-display')
    if (win === true) {
      message.innerHTML = `${player.getPlayer()} wins!`
    }
    else {
      message.innerHTML = 'Cat game, meow!'
    }
  }

  return { changeBoard: changeBoard, makeBoard:makeBoard, reset:reset };

})();

const player =(function() {

  
  let player1
  let player2
  let currentPlayer

  function setPlayers(){
    player1 = "Player 1"
    player2 = "Player 2"
    currentPlayer = player1;
  }
  
  function playerName(){
    let newPlayer1 = document.getElementById('player-1').value
    let newPlayer2 = document.getElementById('player-2').value
    let firstPlayer = true;
    if (currentPlayer == player2){
      firstPlayer = false;
    }
    if (newPlayer1 != "") {
      player1 = newPlayer1
    }
    if (newPlayer2 != "") {
      player2 = newPlayer2
    }
    if (firstPlayer == true){
      currentPlayer = newPlayer1
    }
    else {
      currentPlayer = newPlayer2
    }
    toggleShowInput();
    display();
  }

  function nextTurn(){
    if (currentPlayer === player1) {
      currentPlayer = player2
    }
    else {
      currentPlayer = player1
    }
    display();
  }

  function getPlayer(){
    return currentPlayer
  }
  
  function getPlayerSymbol(){
    if (currentPlayer === player1){
      return "X"
    }
    else {
      return "O"
    }
  }

  function display(){
    let turnDisplay = document.getElementById('message-display');
    turnDisplay.innerHTML = `It's ${getPlayer()}'s turn!`;
  }

  return {nextTurn: nextTurn, getPlayer:getPlayer, getPlayerSymbol:getPlayerSymbol, display:display, playerName:playerName, setPlayers:setPlayers}

})()

function toggleShowInput(){
  let input = document.getElementById('name-inputs')
  input.toggleAttribute('hidden')
}


function playGame(){
  player.setPlayers()
  gameboard.reset()
}

const button = document.getElementById('new-game')
button.addEventListener('click', () => {playGame()});

playGame()


