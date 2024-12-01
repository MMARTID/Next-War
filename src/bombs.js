class Bomb {
    constructor(x, y) {
        this.node = document.createElement("img")
        this.node.src = "./assets/monster/projectile.png" 
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.speed = 5; //! Velocidad de caída

        this.node.style.position = "absolute";
        this.node.style.width = `${this.width}px`;
        this.node.style.height = `${this.height}px`;
        this.node.style.left = `${this.x}px`;
        this.node.style.bottom = `${this.y}px`;
        

        gameScreenNode.appendChild(this.node);
    }

    update() {
        this.y -= this.speed;
        this.node.style.bottom = `${this.y}px`;

        if (this.y <= 0) {
            this.destroy();
        }
    }

    destroy() {
        if (gameScreenNode.contains(this.node)) {
            gameScreenNode.removeChild(this.node);
        }
    }
}