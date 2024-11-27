class Character {
    constructor(){
        this.node = document.createElement("img")
        this.node.src = "./assets/character-Idle01.png"
        this.x = 0;
        this.y = 20;
        this.jumpHeight = 120;
        this.speed = 10
        this.gravity = 0.5
        this.velocityY = 0
        this.isJumping = false
        this.movementInterval = null

    this.node.style.position = 'absolute';
    this.node.style.left = `${this.x}px`;
    this.node.style.bottom = `${this.y}px`;
    gameScreenNode.append(this.node);
    
    }
    jump() {
        if (this.isJumping) return;
        this.isJumping = true;
        this.velocityY = 10;
    
        const updateJump = () => {
          this.velocityY -= this.gravity;
          this.y += this.velocityY;
          if (this.y <= 20) {
            this.y = 20;
            this.isJumping = false;
            clearInterval(this.jumpInterval);
          }
          this.node.style.bottom = `${this.y}px`;
        };
    
        this.jumpInterval = setInterval(updateJump, 10);
      }
    
      move(direction) {
        if (this.movementInterval) return;
    
        this.movementInterval = setInterval(() => {
          const screenWidth = gameScreenNode.offsetWidth;
          this.x += direction * this.speed;
    
          if (this.x < 0) this.x = 0; //! borde izquierdo
          if (this.x > screenWidth - this.node.offsetWidth) {
            this.x = screenWidth - this.node.offsetWidth; //! borde derecho
            if (!this.tryToEsc) {
              this.tryToEsc = true;
              this.onEscape();
            }
          }
    
          this.node.style.left = `${this.x}px`;
        }, 10);
      }
    
      moveLeft() {
        this.move(-1);
      }
    
      moveRight() {
        this.move(1);
      }
    
      stopMoving() {
        clearInterval(this.movementInterval);
        this.movementInterval = null;
      }
    
      onEscape() {
        console.log("Nivel completado, cambiando pantalla...");
        handleLevelComplete();
      }
}