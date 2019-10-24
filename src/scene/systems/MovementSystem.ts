import System from './System.js'
import MovementComponent from '../components/MovementComponent.js'

export default class MovementSystem extends System {

  input = () => {
    const { movement, dash } = this.scene.player
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
    // TODO: iterate all layers
    this.scene.layers[0].objects
      .filter(entity => entity.hasComponents(['transform', 'movement']))
      .forEach(entity => {

        let {
          movement: { acceleration, deceleration, velocity, dragFactor, direction }
        } = entity

        const currentXVelocity = Math.abs(velocity.x)

        // Accelerate
        if (direction !== 0) {
          velocity.x += acceleration * dt * direction
          entity.movement.heading = direction
        }
        // Decelerate
        else if (velocity.x !== 0) {
          const decel = Math.min(currentXVelocity, deceleration * dt);
          velocity.x += velocity.x > 0 ? -decel : decel;
        }
        // Reset distance moved when standing still
        else {
          entity.movement.distance = 0
        }

        // Drag
        const drag = dragFactor * velocity.x * currentXVelocity
        velocity.x -= drag

        // Distance
        entity.movement.distance += currentXVelocity * dt

        // Apply gravity
        const gravity = this.scene.gravity
        velocity.y = velocity.y + gravity * dt

      })
  }

}