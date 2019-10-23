import System from './System.js'

export default class CrouchSystem extends System {

  input = () => {
    const { crouch, hitbox } = this.player
    const { keysDown } = this.game.inputHandler

    if (keysDown.has('KeyS')) {

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