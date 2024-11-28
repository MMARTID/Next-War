class Enemy {
    constructor(allowedSides) {
        this.node = document.createElement("div");
        this.x = gameScreenNode.offsetWidth; //! nodo DESDE la izquierda, 
        this.y = 20
        this.width = 50
        this.height = 50
        this.speed = Math.random() * 3 + 2; 
        this.allowedSides = allowedSides

        this.node.style.position = "absolute";
        this.node.style.width = `${this.width}px`;
        this.node.style.height = `${this.height}px`;
        this.node.style.left = `${this.x}px`;
        this.node.style.bottom = `${this.y}px`;
        this.node.style.backgroundColor = "red";

        gameScreenNode.appendChild(this.node);
    }

    update() {
        this.x -= this.speed; //! Movimiento HACIA la derecha, 
        this.node.style.left = `${this.x}px`

        if (this.x > this.width < 0) {
            this.destroy()
        }
    }

    destroy() {
        gameScreenNode.removeChild(this.node)
    }
}