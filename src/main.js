const splashScreenNode = document.getElementById("splash-screen");
const gameScreenNode = document.getElementById("game-screen");
const gameOverNode = document.getElementById("game-over-screen");
const startBtnNode = document.querySelector("#start-btn");

startBtnNode.addEventListener("click", startGame);

function startGame() {
  console.log("el juego ha empezado")  
  character = new Character();
    
}