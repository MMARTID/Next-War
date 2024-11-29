class Bomb {
    constructor(x, y) {
        this.node = document.createElement("div");
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.speed = 5; //! Velocidad de caída

        this.node.style.position = "absolute";
        this.node.style.width = `${this.width}px`;
        this.node.style.height = `${this.height}px`;
        this.node.style.left = `${this.x}px`;
        this.node.style.bottom = `${this.y}px`;
        this.node.style.backgroundColor = "black";

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