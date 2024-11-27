class Character {
    constructor(){
        this.node = document.createElement("img")
        this.node.src = "./assets/character-Idle01.png"
        this.x = 0;
        this.y = 20;

    this.node.style.position = 'absolute';
    this.node.style.left = `${this.x}px`;
    this.node.style.bottom = `${this.y}px`;
    gameScreenNode.append(this.node);
    
    }
}