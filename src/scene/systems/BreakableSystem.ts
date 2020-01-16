import System from './System.js'
import Vector2 from '../../lib/Vector2.js'
import { roundToNearest } from '../../lib/utils.js'

import Layer from '../Layer.js'
import ClimbComponent from '../components/ClimbComponent.js'
import JumpComponent from '../components/JumpComponent.js'
import HitboxComponent from '../components/HitboxComponent.js'
import MovementComponent from '../components/MovementComponent.js'
import TransformComponent from '../components/TransformComponent.js'
import HitpointsComponent from '../components/HitpointsComponent.js'

export default class BreakableSystem extends System {
  layer: Layer

  init = () => {
    this.layer = this.scene.layers[0]
  }

  input = () => {
    const { keysDown, mouse } = this.game.inputHandler
    // const pickaxe = this.player.getComponent<PickaxeComponent>('pickaxe')

    // Jump
    if (keysDown.has('KeyE')) {
      const entity = this.layer.getEntity(mouse.position)
      if (!entity) {
        return
      }

      const entityTransform = entity.getComponent<TransformComponent>('transform')
      const playerTransform = this.player.getComponent<TransformComponent>('transform')
      const distance = entityTransform.position.distance(playerTransform.position)

      console.log(`break block @${mouse.position.x}, ${mouse.position.y} plz, block: ${entity ? entity.name : 'null'}, distance: ${distance}`)

      // TODO: maek better filters
      if (distance < 32) {
        const hitpoints = entity.getComponent<HitpointsComponent>('hitpoints')
        hitpoints.current -= 1

        if (hitpoints.current <= 0) {
          console.log('del entity with id = ' + entity.guid)
          this.layer.deleteEntity(entity.guid)
        }
      }
    }
  }

  update = (dt: number) => {
    // this.scene.layers[0].entities
    //   .filter(entity => entity.hasComponents(['jump']))
    //   .forEach(entity => {
    //     const jump = entity.getComponent<JumpComponent>('jump')
    //     const climb = entity.getComponent<ClimbComponent>('climb')
    //     const hitbox = entity.getComponent<HitboxComponent>('hitbox')
    //     const movement = entity.getComponent<MovementComponent>('movement')

    //   })
  }

}