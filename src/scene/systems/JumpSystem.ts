import System from './System.js'
import { Sides } from './CollisionSystem.js'

export default class JumpSystem extends System {

  input = () => {
    const { keysDown } = this.game.inputHandler
    const { jump } = this.scene.player

    // Jump
    if (keysDown.has('KeyW')) {
      jump.jumpPressedTimer = 0.05
    }
  }

  update = (dt: number) => {
    this.scene.layers[0].objects
      .filter(entity => entity.jump)
      .forEach(entity => {
        const { climb, jump, hitbox, movement: { velocity } } = entity

        // Cancel jump if collision on top
        if (hitbox.collision === Sides.TOP) {
          console.log('Cancel jump if collision on top');

          jump.engagedTime = 0
        }

        // Update jump pressed timer
        jump.jumpPressedTimer -= dt

        // Update on ground timer
        if (hitbox.collision === Sides.BOTTOM) {
          jump.onGroundTimer = 0.1
        } else {
          jump.onGroundTimer -= dt
        }

        // Can only jump if on ground or climbing
        jump.canJump = jump.onGroundTimer > 0 || climb.isClimbing

        // Jump key is pressed and entity can jump, set engaged time
        if (jump.jumpPressedTimer > 0 && jump.canJump) {
          jump.jumpPressedTimer = 0
          jump.engagedTime = jump.duration
        }

        // Add jump to velocity
        if (jump.engagedTime > 0) {
          velocity.y = -(jump.velocity + Math.abs(velocity.x) * jump.speedBoost)
          jump.engagedTime -= dt
        }

      })
  }

}