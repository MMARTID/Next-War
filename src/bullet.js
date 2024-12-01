class Bullet {
    constructor(x, y) {
        this.node = document.createElement("img")
        this.node.src = "../assets/bullet/bullet.png"
        this.node.style.position = "absolute"
        this.node.style.width = "30px"
        this.node.style.height = "15px"
        
        this.node.style.left = `${x}px`
        this.node.style.bottom = `${y}px`

        gameScreenNode.appendChild(this.node)
       
        this.x = x
        this.y = y
        this.width = 10
        this.height = 5
        this.speed = 10
        this.destroy = this.destroy.bind(this)
    }

    update() {
        this.x += this.speed;  // movimiento bala dependiendo de la dirección
        this.node.style.left = `${this.x}px`;  

        if (this.x > gameScreenNode.offsetWidth || this.x < 0) {
            this.destroy();
        }
    }

    destroy() {
        if (this.node && this.node.parentNode === gameScreenNode) {
            gameScreenNode.removeChild(this.node);
        }
    }
}