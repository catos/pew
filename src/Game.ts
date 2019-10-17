import Vector2 from "./math/Vector2.js"

export default class Game {
  // id: string
  name: string
  position: Vector2

  constructor() {
    // this.id = stupid(1)
    this.name = 'oh hai'
    this.position = new Vector2(10, 1223)
  }

  hello() {
    // console.log(`hello id: ${this.id}, name: ${this.name}, position: ${this.position.x}, ${this.position.y}`)
    console.log(`hello name: ${this.name}, position: ${this.position.x}, ${this.position.y}`)
  }
}

const game = new Game()
game.hello()