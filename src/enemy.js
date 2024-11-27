class Enemy {
    constructor() {
        this.node = document.createElement("div");
        this.x = gameScreenNode.offsetWidth; //! nodo DESDE la izquierda, 
        this.y = 20; // Altura del suelo
        this.width = 50; 
        this.height = 50;
        this.speed = Math.random() * 2 + 1; 

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
        this.node.style.left = `${this.x}px`; 
    }

    destroy() {
        this.node.remove();
    }
}