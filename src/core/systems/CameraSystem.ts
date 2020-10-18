import System from "../System.js"
import Scene from "../Scene.js"
import Vector2 from "../../lib/Vector2.js"

export default class CameraSystem extends System {
  position: Vector2
  size: Vector2
  target: Vector2

  constructor(position: Vector2, size: Vector2, target: Vector2, scene: Scene) {
    super("camera", scene)
    this.position = position
    this.size = size
    this.target = target
  }

  update = (dt: number) => {
    // If we need to support multiple cameras
    // this.scene.layers.forEach(layer => layer.forEach(entity => { }))

    // position.x = Math.max(0, this.target.x - size.x / 2)
    this.position.x = this.target.x - this.size.x / 2 + 8
    this.position.y = 0
  }

  render = (dt: number) => {
    this.context.fillStyle = "#00ff0011"
    // this.context.fillRect(0, 0, size.x, size.y)
    this.context.fillRect(
      this.position.x - this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    )
  }
}
