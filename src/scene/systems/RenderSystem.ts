import System from './System.js'
import Entity from '../entities/Entity.js'
import Layer from '../Layer.js'
import MovementComponent from '../components/MovementComponent.js'
import TransformComponent from '../components/TransformComponent.js'
import CrouchComponent from '../components/CrouchComponent.js'
import GraphicsComponent from '../components/GraphicsComponent.js'
import HitpointsComponent from '../components/HitpointsComponent.js'
import HitboxComponent from '../components/HitboxComponent.js'

export default class RenderSystem extends System {

  render = (dt: number) => {
    this.game.scene.layers.forEach(layer => this.renderLayer(layer))
  }

  renderLayer = (layer: Layer) => {
    layer
      .entities
      .filter(entity => entity.hasComponents(['graphics']))
      .forEach(entity => {
        this.drawTile(entity)
      })
  }

  drawTile = (entity: Entity) => {
    const movement = entity.getComponent<MovementComponent>('movement')
    const { position } = entity.getComponent<TransformComponent>('transform')
    const { position: cameraPosition } = this.camera.getComponent<TransformComponent>('transform')

    // Flip ?      
    const dir = movement ? movement.heading : false
    const flip = dir === -1

    this.scene.tileset.drawTile(
      this.getTileId(entity).toString(),
      this.context,
      position.x - cameraPosition.x,
      position.y - cameraPosition.y,
      flip
    )
  }

  getTileId = (entity: Entity) => {
    const crouch = entity.getComponent<CrouchComponent>('crouch')
    const movement = entity.getComponent<MovementComponent>('movement')
    const { animations, animDelay } = entity.getComponent<GraphicsComponent>('graphics')

    // Entity has no movement component, get first frame
    if (!movement)
      return +animations[0].frames[0]

    // Entity has movement, figure out what frame to draw
    if (crouch && crouch.isCrouching) {
      return 5
    } else if (movement.direction === 0) {
      // Idle animation
      return +animations[0].frames[0]
      // Walking animation
    } else {
      const frameIndex = Math.floor(
        movement.distance /
        animDelay %
        animations[1].frames.length
      )
      return +animations[1].frames[frameIndex]
    }
  }

}