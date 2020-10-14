import System from "./System.js"
import CameraEntity from "../entities/CameraEntity.js"
import Scene from "../Scene.js"
import TransformComponent from "../components/TransformComponent.js"
import PlayerEntity from "../entities/PlayerEntity.js"

export default class CameraSystem extends System {
  camera: CameraEntity
  player: PlayerEntity

  constructor(camera: CameraEntity, player: PlayerEntity, scene: Scene) {
    super("camera", scene)
    this.camera = camera
    this.player = player
  }

  update = (dt: number) => {
    const cameraTransform = this.camera.getComponent<TransformComponent>(
      "transform"
    )
    const playerTransform = this.camera.getComponent<TransformComponent>(
      "transform"
    )
    // If we need to support multiple cameras
    // this.scene.layers.forEach(layer => layer.forEach(entity => { }))

    cameraTransform.position.x = Math.max(
      0,
      playerTransform.position.x - cameraTransform.size.x / 2
    )
    cameraTransform.position.y = 0
  }

  render = (dt: number) => {
    const transform = this.camera.getComponent<TransformComponent>("transform")

    this.context.fillStyle = "#00ff0011"
    // this.context.fillRect(0, 0, size.x, size.y)
    this.context.fillRect(
      transform.position.x,
      transform.position.y,
      transform.size.x,
      transform.size.y
    )
  }
}
