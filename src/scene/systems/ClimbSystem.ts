import System from './System.js'
import { Sides } from './CollisionSystem.js';
import JumpComponent from '../components/JumpComponent.js';
import ClimbComponent from '../components/ClimbComponent.js';
import HitboxComponent from '../components/HitboxComponent.js';
import MovementComponent from '../components/MovementComponent.js';

export default class ClimbSystem extends System {

  update = (dt: number) => {
    // TODO: hmm, move to input-method ?
    const { keysDown } = this.game.inputHandler

    const jump = this.player.getComponent<JumpComponent>('jump')
    const climb = this.player.getComponent<ClimbComponent>('climb')
    const hitbox = this.player.getComponent<HitboxComponent>('hitbox')
    const movement = this.player.getComponent<MovementComponent>('movement')


    if (jump.engagedTime > 0) {
      return
    }

    const isClimbing =
      (keysDown.has('KeyD') && hitbox.collision === Sides.RIGHT) ||
      (keysDown.has('KeyA') && hitbox.collision === Sides.LEFT)

    if (isClimbing) {
      if (!climb.isClimbing) {
        climb.isClimbing = true
      }
    } else {
      climb.isClimbing = false
    }

    if (climb.isClimbing) {
      movement.velocity.y *= .025
    }
  }

}