import Scene from "./core/Scene.js"
import Game from "./core/Game.js"

export default class PewGame extends Game {
  async init() {
    const scene = new Scene(this, "/build/assets/levels/level-1.json")
    this.addScene(scene)

    super.init()
  }
}
