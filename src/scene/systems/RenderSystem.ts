import System from "../../core/System.js"
import Entity from "../entities/Entity.js"
import Layer from "../../core/Layer.js"
import MovementComponent from "../components/MovementComponent.js"
import TransformComponent from "../components/TransformComponent.js"
import CrouchComponent from "../components/CrouchComponent.js"
import GraphicsComponent from "../components/GraphicsComponent.js"
import Scene from "../../core/Scene.js"
import CameraSystem from "../../core/systems/CameraSystem.js"

export default class RenderSystem extends System {
  camera: CameraSystem
  context: CanvasRenderingContext2D

  constructor(scene: Scene) {
    super("render", scene)
    this.camera = this.scene.camera
    this.context = this.scene.game.canvas.context
  }

  render = (dt: number) => {
    this.scene.layers.forEach((layer) => this.renderLayer(layer))
  }

  renderLayer = (layer: Layer) => {
    layer.entities
      .filter((entity) => entity.hasComponents(["graphics"]))
      .forEach((entity) => {
        this.drawTile(entity)
      })
  }

  drawTile = (entity: Entity) => {
    const movement = entity.getComponent<MovementComponent>("movement")
    const { position } = entity.getComponent<TransformComponent>("transform")

    // Flip ?
    const dir = movement ? movement.heading : false
    const flip = dir === -1

    this.scene.tileset.drawTile(
      this.getTileId(entity).toString(),
      this.context,
      position.x - this.camera.position.x,
      position.y - this.camera.position.y,
      flip
    )
  }

  getTileId = (entity: Entity) => {
    const crouch = entity.getComponent<CrouchComponent>("crouch")
    const movement = entity.getComponent<MovementComponent>("movement")
    const { animations, animDelay } = entity.getComponent<GraphicsComponent>(
      "graphics"
    )

    // Entity has no movement component, get first frame
    if (!movement) return +animations[0].frames[0]

    // Entity has movement, figure out what frame to draw
    if (crouch && crouch.isCrouching) {
      return 5
    } else if (movement.direction === 0) {
      // Idle animation
      return +animations[0].frames[0]
      // Walking animation
    } else {
      const frameIndex = Math.floor(
        (movement.distance / animDelay) % animations[1].frames.length
      )
      return +animations[1].frames[frameIndex]
    }
  }
}
