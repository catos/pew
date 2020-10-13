import System from './System.js'
import HitboxComponent from '../components/HitboxComponent.js'
import CrouchComponent from '../components/CrouchComponent.js'
import { IPewEvent } from '../../core/InputHandler.js'

export default class CrouchSystem extends System {

  input = (event: IPewEvent) => {
    const hitbox = this.player.getComponent<HitboxComponent>('hitbox')
    const crouch = this.player.getComponent<CrouchComponent>('crouch')

    if (event.isKeyPressed('KeyS')) {
      if (!crouch.isCrouching) {
        crouch.isCrouching = true
        const newY = hitbox.bounds.size.y * .5
        hitbox.bounds.size.y = newY
        hitbox.bounds.offset.y += newY
      }
    }
    else {
      crouch.isCrouching = false
      hitbox.bounds.size.y = hitbox.originalSize.y
      hitbox.bounds.offset.y = hitbox.originalOffset.y
    }
  }

}