class Enemy {
    constructor(allowedSides) {
        this.node = document.createElement("img")
        this.node.src = "./assets/monster-pos1.png"
        this.x = gameScreenNode.offsetWidth; //! nodo DESDE la izquierda, 
        this.y = 20
        this.width = 50
        this.height = 50
        this.speed = Math.random() * 3 + 4; 
        this.allowedSides = allowedSides

        const spawnSide = this.allowedSides[Math.floor(Math.random() * this.allowedSides.length)];
        this.setInitialPosition(spawnSide);

        this.node.style.position = "absolute";
        this.node.style.width = `${this.width}px`;
        this.node.style.height = `${this.height}px`;
        this.node.style.left = `${this.x}px`;
        this.node.style.bottom = `${this.y}px`;
        

        gameScreenNode.appendChild(this.node);
        this.updateSize()
    }

    setInitialPosition(side) {
        switch (side) {
            case "top":
                this.x = Math.random() * gameScreenNode.offsetWidth
                this.y = gameScreenNode.offsetHeight - this.height
                break
            case "bottom":
                this.x = Math.random() * gameScreenNode.offsetWidth
                this.y = 0
                break
            case "left":
                this.x = 0
                this.y = Math.random() * (gameScreenNode.offsetHeight - this.height)
                break
            case "right":
            default:
                this.x = gameScreenNode.offsetWidth - this.width
                this.y = Math.random() * (gameScreenNode.offsetHeight - this.height)
                break
        }
        this.node.style.left = `${this.x}px`;
        this.node.style.bottom = `${this.y}px`;
    } 

    update() {
        this.x -= this.speed; //! Movimiento HACIA la derecha, 
        this.node.style.left = `${this.x}px`

        if (this.y > gameScreenNode.offsetHeight / 2 && Math.random() < 0.01) {
            this.dropBomb();
        }
        if (this.x + this.width < 0) {
            this.destroy()
        }
    }
    updateSize() {
        this.width = this.node.offsetWidth;
        this.height = this.node.offsetHeight;
    }
    dropBomb() {
        const bomb = new Bomb(this.x + this.width / 2, this.y)
        bullets.push(bomb)
    }

    destroy() {
        if (gameScreenNode.contains(this.node)) {
          gameScreenNode.removeChild(this.node);
        } else {
          console.warn("Intentando destruir un nodo que ya ha sido eliminado.")
        }
      }
}