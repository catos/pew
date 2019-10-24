import System from './System.js'
import DashComponent from '../components/DashComponent.js'
import MovementComponent from '../components/MovementComponent.js'

export default class DashSystem extends System {
  input = () => {
    const { keysDown } = this.game.inputHandler
    const dash = this.player.getComponent<DashComponent>('dash')

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
      .filter(entity => entity.hasComponents(['dash']))
      .forEach(entity => {
        const dash = entity.getComponent<DashComponent>('dash')
        const movement = entity.getComponent<MovementComponent>('movement')

        // Cancel dash if collision on sides
        // const hitbox = entity.getComponent<HitboxComponent>('hitbox')
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
          movement.velocity.x = (dash.velocity + Math.abs(movement.velocity.x) * dash.speedBoost) * movement.heading
          dash.engagedTime -= dt
          dash.cooldown -= dt
        }

      })
  }

}