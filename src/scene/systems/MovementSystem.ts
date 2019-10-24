import System from './System.js'
import MovementComponent from '../components/MovementComponent.js'
import DashComponent from '../components/DashComponent.js'

export default class MovementSystem extends System {

  input = () => {
    const movement = this.player.getComponent<MovementComponent>('movement')
    const dash = this.player.getComponent<DashComponent>('dash')
    const { keysDown } = this.game.inputHandler

    // Right
    if (keysDown.has('KeyD') && dash.engagedTime <= 0) {
      movement.direction = 1
    }
    // Left
    else if (keysDown.has('KeyA') && dash.engagedTime <= 0) {
      movement.direction = -1
    }
    // No direction
    else {
      movement.direction = 0
    }
  }

  update = (dt: number) => {
    this.scene.layers[0].objects
      .filter(entity => entity.hasComponents(['transform', 'movement']))
      .forEach(entity => {

        const movement = entity.getComponent<MovementComponent>('movement')

        const currentXVelocity = Math.abs(movement.velocity.x)

        // Accelerate
        if (movement.direction !== 0) {
          movement.velocity.x += movement.acceleration * dt * movement.direction
          movement.heading = movement.direction
        }
        // Decelerate
        else if (movement.velocity.x !== 0) {
          const decel = Math.min(currentXVelocity, movement.deceleration * dt);
          movement.velocity.x += movement.velocity.x > 0 ? -decel : decel;
        }
        // Reset distance moved when standing still
        else {
          movement.distance = 0
        }

        // Drag
        const drag = movement.dragFactor * movement.velocity.x * currentXVelocity
        movement.velocity.x -= drag

        // Distance
        movement.distance += currentXVelocity * dt

        // Apply gravity
        const gravity = this.scene.gravity
        movement.velocity.y = movement.velocity.y + gravity * dt

      })
  }

}