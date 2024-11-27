const splashScreenNode = document.getElementById("splash-screen");
const gameScreenNode = document.getElementById("game-screen");
const gameOverNode = document.getElementById("game-over-screen");
const startBtnNode = document.querySelector("#start-btn");





const gameFloor = document.createElement("div")
gameFloor.id = "suelo";
gameFloor.style.position = 'absolute';
gameFloor.style.bottom = '0';
gameFloor.style.left = '0';
gameFloor.style.width = '100%';  
gameFloor.style.height = '20px';  // Altura del suelo
gameFloor.style.backgroundColor = '#654321';  
gameFloor.style.zIndex = '1';

startBtnNode.addEventListener("click", startGame);

function startGame() {
  console.log("el juego ha empezado")  
  character = new Character();
  gameScreenNode.appendChild(gameFloor)
    
}