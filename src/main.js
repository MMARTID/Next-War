const splashScreenNode = document.getElementById("splash-screen");
const gameScreenNode = document.getElementById("game-screen");
const gameOverNode = document.getElementById("game-over-screen");
const startBtnNode = document.querySelector("#start-btn");

let character = null
const enemies = [];
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
  if (!character) {
    console.log("El juego ha empezado");
    character = new Character();
    gameScreenNode.appendChild(gameFloor);
    startGameLoop();
  }
}

// ------------------------- ENEMIGOS Y LOOP --------------------------------//


function startGameLoop() {
  // Loop de creación de enemigos
  setInterval(() => {
    const newEnemy = new Enemy();
    enemies.push(newEnemy);
  }, 2000); //! 2 segundos
  
  // Loop principal del juego
  setInterval(gameLoop, 50); // Ejecutar el loop cada 50ms
}

function gameLoop() {
  // Actualizar enemigos
  enemies.forEach((enemy, index) => {
      enemy.update(); // Actualiza cada enemigo

      // Eliminar enemigos fuera de la pantalla
      if (enemy.x + enemy.width < 0) {
        enemy.destroy(); // Eliminar del DOM
        enemies.splice(index, 1); // Quitar del array
      }

      // Detectar colisiones con el personaje
      if (
          character &&
          character.x < enemy.x + enemy.width &&
          character.x + character.node.offsetWidth > enemy.x &&
          character.y < enemy.y + enemy.height &&
          character.y + character.node.offsetHeight > enemy.y
      ) {
          console.log("¡Colisión detectada!");
          // Aquí puedes agregar la lógica de fin de juego o restar vidas
      }
  });

  // Aquí podrías añadir más funciones de objetos como balas, obstáculos, etc.
}


// ------------------ Controles Teclado -------------------------//
document.addEventListener('keydown', (event) => {
  if (event.code === "ArrowUp" && character) {
      console.log("Detectado salto")
      character.jump()
  }
  if (event.code === "ArrowRight" && character) {
      console.log("Detectado mover a la derecha");
      character.moveRight()
  }
  if (event.code === "ArrowLeft" && character) {
      console.log("Detectado mover a la izquierda");
      character.moveLeft()
  }
})

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight" && character) {
      console.log("Detectado freno a la derecha");
      character.stopMoving()
  }
  if (event.code === "ArrowLeft" && character) {
      console.log("Detectado freno a la izquierda");
      character.stopMoving()
  }
})
