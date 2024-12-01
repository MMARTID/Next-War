const splashScreenNode = document.getElementById("splash-screen");
const gameScreenNode = document.getElementById("game-screen");
const gameOverNode = document.getElementById("game-over-screen");
const startBtnNode = document.querySelector("#start-btn");

let character = null
let enemies = []
let bullets = []
let destroyedEnemiesCount = 0;


startBtnNode.addEventListener("click", startGame);

const gameFloor = document.createElement("div")
gameFloor.id = "suelo"
gameFloor.style.position = 'absolute'
gameFloor.style.bottom = '0'
gameFloor.style.left = '0'
gameFloor.style.width = '100%'
gameFloor.style.height = '20px'
gameFloor.style.backgroundColor = 'black'
gameFloor.style.zIndex = '1'

const destroyedEnemyCounterNode = document.createElement("div");
destroyedEnemyCounterNode.id = "destroyed-enemy-counter"
destroyedEnemyCounterNode.style.position = 'absolute'
destroyedEnemyCounterNode.style.top = '10px'
destroyedEnemyCounterNode.style.left = '10px'
destroyedEnemyCounterNode.style.fontSize = '18px'
destroyedEnemyCounterNode.style.color = 'white';
destroyedEnemyCounterNode.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
destroyedEnemyCounterNode.style.padding = '5px 10px'
destroyedEnemyCounterNode.style.borderRadius = '5px'
destroyedEnemyCounterNode.style.zIndex = '100'


function updateDestroyedEnemyCounter() {
  destroyedEnemyCounterNode.textContent = `Enemigos destruidos: ${destroyedEnemiesCount}`;
}

function startGame() {
  if (!character) {
    startBtnNode.style.display = "none"
    console.log("El juego ha empezado")
    character = new Character()
    gameScreenNode.appendChild(gameFloor)
    gameScreenNode.appendChild(destroyedEnemyCounterNode)
    updateDestroyedEnemyCounter()
    startGameLoop();
   
  }
}

// ------------------------- ENEMIGOS Y LOOP --------------------------------//
let currentLevelIndex = 0; // Índice de nivel 
let enemySpawnInterval; 
let gameLoopInterval;
const levels = [
  { enemyCount: 5, allowedSides: ["right"] },
  { enemyCount: 10, allowedSides: ["top", "bottom", "right"] },
  { enemyCount: 15, allowedSides: ["left", "right", "top", "bottom"] },
];

function startGameLoop() {
  //! Loop enemigos y niveles
  enemySpawnInterval = setInterval(() => {
    const level = levels[currentLevelIndex]
    const newEnemy = new Enemy(level.allowedSides);
    enemies.push(newEnemy);
  }, 2000); // 2 segundos
  
  //! Loop principal del juego
  gameLoopInterval = setInterval(gameLoop, 50); 
}

function gameLoop() {
  updateEnemies()
  updateBullets()
  updateBombs()
  checkCollisions()
  updateDestroyedEnemyCounter()
}
function updateEnemies() {
  enemies.forEach((enemy) => enemy.update());
  enemies = enemies.filter(enemy => {
    const isInside = enemy.x + enemy.width >= 0;
    if (!isInside) enemy.destroy();
    return isInside;
  })}
function updateBullets() {
  bullets.forEach((bullet) => bullet.update());
  bullets = bullets.filter(bullet => {
    const isInside = bullet.x <= gameScreenNode.offsetWidth && bullet.x >= 0;
    if (!isInside) bullet.destroy();
    return isInside;
  })}
function checkCollisions() {
  enemies.forEach((enemy, enemyIndex) => {
    if (character && colision(character, enemy)) {
      console.log("¡Colisión detectada con el personaje!");
      gameOver();
   }
 })
  bullets.forEach((bullet, bulletIndex) => {

    if (bullet instanceof Bomb) { 
      // Si es bomba colisión con  personaje
      if (character && colision(bullet, character)) {
          console.log("¡El personaje fue alcanzado por una bomba!");
          gameOver(); 
      }
    } else {
      // !bomba : disparo
      enemies.forEach((enemy, enemyIndex) => {
          if (colision(bullet, enemy)) {
              console.log("¡Enemigo destruido por el disparo!")
              bullet.destroy()
              enemy.destroy()
              bullets.splice(bulletIndex, 1)
              enemies.splice(enemyIndex, 1)

              destroyedEnemiesCount++;
              updateDestroyedEnemyCounter();
          }
      })
    }
})}
function updateBombs() {
  bullets.forEach((bullet) => {
      if (bullet instanceof Bomb) { //! Solo bombas
          bullet.update();
      }
  });

  bullets = bullets.filter((bullet) => {
      const isInside = bullet.y > 0;
      if (!isInside) bullet.destroy();
      return isInside;
  });
}

function colision(obj1, obj2) {
  const rect1 = obj1.node.getBoundingClientRect()
  const rect2 = obj2.node.getBoundingClientRect()

  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

// -------------------- Controles Teclado -------------------------//
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
  if (event.code === "Enter" && gameOverNode.style.display === 'block') {
    restartGame();
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
  enemies.forEach(enemy => enemy.destroy());
    bullets.forEach(bullet => bullet.destroy());
    enemies = [];
    bullets = [];
  clearInterval(enemySpawnInterval);
  clearInterval(gameLoopInterval)
  gameOverNode.style.display = 'block';
  gameScreenNode.style.display = 'none';
  splashScreenNode.style.display ='none'
}

function restartGame() {
  // Limpiar la pantalla de Game Over
  gameOverNode.style.display = 'none';
  gameScreenNode.style.display = 'block';
  splashScreenNode.style.display = 'none';
  
  character.x = 0
  character.y = 20
  character.node.style.left = `${character.x}px`
  character.node.style.bottom = `${character.y}px`
  
  bullets.forEach((bullet) => bullet.destroy());
  enemies = []; 
  bullets = []; 
  currentLevelIndex = 0; 

  destroyedEnemiesCount = 0
  updateDestroyedEnemyCounter()

  startGameLoop();
}