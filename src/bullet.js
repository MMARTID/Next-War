class Bullet {
    constructor(x, y) {
        this.node = document.createElement("div");
        this.node.style.position = "absolute";
        this.node.style.width = "10px";
        this.node.style.height = "5px";
        this.node.style.backgroundColor = "yellow";
        this.node.style.left = `${x}px`;
        this.node.style.bottom = `${y}px`;

        gameScreenNode.appendChild(this.node);

        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 5;
        this.speed = 10;
    }

    update() {
        this.x += this.speed;  // movimiento bala dependiendo de la dirección
        this.node.style.left = `${this.x}px`;  // Actualizar nodo

        if (this.x > gameScreenNode.offsetWidth || this.x < 0) {
            this.destroy();
        }
    }

    destroy() {
        gameScreenNode.removeChild(this.node);
    }
}