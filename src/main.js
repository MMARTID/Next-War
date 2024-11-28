const splashScreenNode = document.getElementById("splash-screen");
const gameScreenNode = document.getElementById("game-screen");
const gameOverNode = document.getElementById("game-over-screen");
const startBtnNode = document.querySelector("#start-btn");

let character = null
let enemies = [];
let bullets = [];
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
let currentLevelIndex = 0; // Índice de nivel 
const levels = [
  {
    enemyCount: 5, 
    allowedSides: ["right"],
  },
  {
    enemyCount: 10,
    allowedSides: ["top", "bottom", "right"],
  },
  {
    enemyCount: 15,
    allowedSides: ["left", "right", "top", "bottom"]
  },
];

function startGameLoop() {
  //! Loop enemigos y niveles
  setInterval(() => {
    const level = levels[currentLevelIndex]
    const newEnemy = new Enemy(level.allowedSides);
    enemies.push(newEnemy);
  }, 2000); // 2 segundos
  
  //! Loop principal del juego
  setInterval(gameLoop, 50); 
}

function gameLoop() {
  
  enemies.forEach((enemy, index) => {
      enemy.update();

      // Colisiones con las //!balas
      bullets.forEach((bullet, bulletIndex) => {
        if (bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y) {
          
          enemy.destroy();
          bullet.destroy();
          enemies.splice(index, 1);
          bullets.splice(bulletIndex, 1);
        }
      });

      if (enemy.x + enemy.width < 0) {
        enemy.destroy(); 
        enemies.splice(index, 1);
      }

      // colisiones con el //! personaje
      if (character &&character.x < enemy.x + enemy.width &&
          character.x + character.node.offsetWidth > enemy.x &&
          character.y < enemy.y + enemy.height &&
          character.y + character.node.offsetHeight > enemy.y
      ) {
          console.log("¡Colisión detectada!");
          gameOver()
      }
  })
  bullets.forEach((bullet, index) => {
    bullet.update();

    // Verificar si la //! bala colide con un enemigo
    enemies.forEach((enemy, enemyIndex) => {
        if (bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y) {
   console.log("¡Enemigo destruido!");

            bullet.destroy()
            enemy.destroy()
            
            enemies.splice(enemyIndex, 1)
            bullets.splice(index, 1)
        }
    })
   })
   bullets = bullets.filter(bullet => bullet.x <= gameScreenNode.offsetWidth && bullet.x >= 0)
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
  if (event.code === "Space" && character) {
    console.log("Disparando...");
    character.shoot();
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
function gameOver() {
  console.log("Game Over");
  gameOverNode.style.display = 'block';
  gameScreenNode.style.display = 'none';
}
