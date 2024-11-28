class Character {
    constructor(){
        this.node = document.createElement("img")
        this.node.src = "./assets/character-Idle01.png"
        this.x = 0;
        this.y = 20;
        this.speed = 10
        this.gravity = 0.3
        this.velocityY = 0
        this.isJumping = false
        this.movementInterval = null
        this.tryToEsc = false

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
            console.log(this.x > screenWidth - this.node.offsetWidth)
              this.tryToEsc = true;
              console.log("borde derecho")
              this.onEscape();
            
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
      
      shoot() {
        const bullet = new Bullet(this.x + this.node.offsetWidth, this.y + 25); // Ajuste de la posición
        bullets.push(bullet);
    }
}