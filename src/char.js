class Character {
    constructor(){
        this.node = document.createElement("img")
        this.node.src = "./assets/character/character-Walk1.png"
        this.node.height = 50
        this.x = 0;
        this.y = 20;
        this.speed = 14
        this.gravity = 0.3
        this.velocityY = 0
        this.isJumping = false
        this.isMoving = false
        this.currentDirection = 0
         
        this.walkImages = [
          "./assets/character/character-Walk01.png", 
          "./assets/character/character-Walk02.png", 
          "./assets/character/character-Walk03.png",
          "./assets/character/character-Walk04.png",
          "./assets/character/character-Walk05.png",
          "./assets/character/character-Walk06.png",
          
       ]
        this.currentImageIndex = 0; 
        

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
      this.velocityY -= this.gravity * 1.1;
      this.y += this.velocityY;

     if (this.y <= 20) {
        this.y = 20;
        this.isJumping = false;
        clearInterval(this.jumpInterval);
     }
      this.node.style.bottom = `${this.y}px`;
     }
     this.jumpInterval = setInterval(updateJump, 16);
  }
    
  move(direction) {
    if (this.isJumping) return
    if (this.isMoving) return
        this.isMoving = true
   this.movementInterval = setInterval(() => {
          const screenWidth = gameScreenNode.offsetWidth;
          this.x += direction * this.speed;
    
      if (this.x < 0) this.x = 0; 
      if (this.x > screenWidth - this.node.offsetWidth) this.x = screenWidth - this.node.offsetWidth; 

      this.node.style.left = `${this.x}px`;
      if (direction === -1) {
          this.node.style.transform = "scaleX(-1)";
      } else if (direction === 1) {
          this.node.style.transform = "scaleX(1)";
      }
        this.animateWalk();
    }, 55);
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
   this.isMoving = false;
  }

  animateWalk() {
    this.node.src = this.walkImages[this.currentImageIndex];
    this.currentImageIndex = (this.currentImageIndex + 1) % this.walkImages.length;

}
      
  shoot() {
        const bullet = new Bullet(this.x + this.node.offsetWidth, this.y + 25); // Ajuste de la posición
        bullets.push(bullet);
  }
}