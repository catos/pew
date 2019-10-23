import System from './System.js'
import { Sides } from './CollisionSystem.js';

export default class ClimbSystem extends System {

  update = (dt: number) => {
    const { jump, climb, hitbox, movement: { velocity } } = this.player
    const { keysDown } = this.game.inputHandler

    if (jump.engagedTime > 0) {
      return
    }

    const isClimbing = (keysDown.has('KeyD') && hitbox.collision === Sides.RIGHT)
      || (keysDown.has('KeyA') && hitbox.collision === Sides.LEFT)

    if (isClimbing) {
      if (!climb.isClimbing) {
        climb.isClimbing = true
      }
    } else {
      climb.isClimbing = false
    }

    if (climb.isClimbing) {
      velocity.y *= .025
    }
  }

}