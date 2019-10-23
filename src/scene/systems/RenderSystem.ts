import System from './System.js'
import Entity from '../entities/Entity.js'
import Layer from '../Layer.js'

/**
 * @export
 * @class RenderSystem
 * @extends {System}
 */
export default class RenderSystem extends System {

  // update = (dt) => {
  //   layer
  //     .filter(entity => entity.dash)
  //     .forEach(entity => {
  //       entity.
  //     })
  // }

  render = (dt: number) => {
    this.game.scene.layers.forEach(layer => this.renderLayer(layer))
  }

  renderLayer = (layer: Layer) => {
    layer.objects
      .filter(entity => entity.graphics)
      .forEach(entity => {

        // TODO: // Dash ? draw trails...
        // const { dash, transform } = entity

        // if (dash && dash.engagedTime > 0) {
        //   console.log('draw dash trail');

        //   const _entity = { ...entity }
        //   _entity.transform.position.x = transform.position.x - 10

        //   this.drawTile(_entity)
        // }

        this.drawTile(entity)
      })
  }

  drawTile = (entity: Entity) => {
    const { movement, transform: { position } } = entity

    // Flip ?      
    const dir = movement ? movement.heading : false
    const flip = dir === -1

    this.scene.tileset.drawTile(
      this.getTileId(entity).toString(),
      this.context,
      position.x - this.camera.transform.position.x,
      position.y - this.camera.transform.position.y,
      flip
    )
  }

  getTileId = (entity: Entity) => {
    const { crouch, movement, graphics: { animations, animDelay } } = entity

    // Entity has no movement component, get first frame
    if (!movement)
      return +animations[0].frames[0]

    // Entity has movement, figure out what frame to draw
    const { movement: { direction, distance } } = entity
    if (crouch && crouch.isCrouching) {
      return 5
    } else if (direction === 0) {
      // Idle animation
      return +animations[0].frames[0]
      // Walking animation
    } else {
      const frameIndex = Math.floor(
        distance /
        animDelay %
        animations[1].frames.length
      )
      return +animations[1].frames[frameIndex]
    }
  }


}