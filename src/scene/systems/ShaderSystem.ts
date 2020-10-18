import System from "../../core/System.js"
import darkenColors from "../../shaders/darkenColors.js"
import { IGameEvent } from "../../core/InputHandler.js"
import Scene from "../../core/Scene.js"

export default class ShaderSystem extends System {
  showShaders: boolean

  constructor(scene: Scene) {
    super("shader", scene)
  }

  init = () => {
    this.showShaders = false
  }

  input = (event: IGameEvent) => {
    if (event.isKeyPressed("F2")) {
      this.showShaders = !this.showShaders
    }
  }

  render = (dt: number) => {
    const {
      canvas: { context },
    } = this.scene.game

    if (this.showShaders) {
      darkenColors(context, 16)
    }
  }
}
