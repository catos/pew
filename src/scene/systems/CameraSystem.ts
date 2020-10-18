import System from "./System.js"
import CameraEntity from "../entities/CameraEntity.js"
import Scene from "../Scene.js"
import TransformComponent from "../components/TransformComponent.js"
import Vector2 from "../../lib/Vector2.js"

export default class CameraSystem extends System {
  camera: CameraEntity
  target: Vector2

  constructor(camera: CameraEntity, target: Vector2, scene: Scene) {
    super("camera", scene)
    this.camera = camera
    this.target = target
  }

  update = (dt: number) => {
    const { position, size } = this.camera.getComponent<TransformComponent>(
      "transform"
    )
    // If we need to support multiple cameras
    // this.scene.layers.forEach(layer => layer.forEach(entity => { }))

    // position.x = Math.max(0, this.target.x - size.x / 2)
    position.x = this.target.x - size.x / 2 + 8
    position.y = 0
  }

  render = (dt: number) => {
    const { position, size } = this.camera.getComponent<TransformComponent>(
      "transform"
    )

    this.context.fillStyle = "#00ff0011"
    // this.context.fillRect(0, 0, size.x, size.y)
    this.context.fillRect(position.x - position.x, position.y, size.x, size.y)
  }
}
