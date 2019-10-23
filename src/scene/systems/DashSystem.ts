import System from './System.js'

export default class DashSystem extends System {
  input = () => {
    const { keysDown } = this.game.inputHandler
    const { dash } = this.player

    // Jump
    if (keysDown.has('KeyP')) {
      if (dash.cooldown < 0) {
        dash.engagedTime = .3
        dash.cooldown = dash.TIMER
      }
    }
  }

  update = (dt: number) => {
    this.scene.layers[0].objects
      .filter(entity => entity.dash)
      .forEach(entity => {
        const { hitbox, dash, movement: { velocity, heading } } = entity

        // Cancel dash if collision on sides
        // if (hitbox.collision !== Sides.NONE) {
        //   dash.engagedTime = 0
        // }

        // TODO: fix dash-cancel

        // Cooldown
        if (dash.cooldown > 0) {
          dash.cooldown -= dt
        }

        // Do the dash
        if (dash.engagedTime > 0) {
          velocity.x = (dash.velocity + Math.abs(velocity.x) * dash.speedBoost) * heading
          dash.engagedTime -= dt
          dash.cooldown -= dt
        }

      })
  }

}