import System from './System.js'
import Entity from '../entities/Entity.js'
import HitboxComponent from '../components/HitboxComponent.js'
import TransformComponent from '../components/TransformComponent.js'
import MovementComponent from '../components/MovementComponent.js'

export enum Sides {
  NONE = 0,
  TOP = 1,
  BOTTOM = 2,
  LEFT = 3,
  RIGHT = 4,
}

export enum Direction {
  Horizontal = 0,
  Vertical = 1
}

export default class CollisionSystem extends System {

  showCollisions: boolean
  candidates: Entity[]

  init = () => {
    this.showCollisions = false

    // TODO: fix layers[0] (DO A SEARCH)
    // TODO: optimize search
    this.candidates = this.scene.layers[0]
      .objects
      .filter(entity => entity.hasComponents(['hitbox']))
  }

  input = () => {
    const { keysDown } = this.game.inputHandler

    if (keysDown.has('F4')) {
      this.showCollisions = !this.showCollisions
    }
  }

  update = (dt: number) => {

    const entities = this.scene.layers[0]
      .objects
      .filter(entity => entity.hasComponents(['hitbox', 'movement']))
    // .filter(entity => entity.movement.velocity.x !== 0 || entity.movement.velocity.y !== 0)


    entities.forEach(entity => {
      const movement = entity.getComponent<MovementComponent>('movement')

      // TODO: invert statement
      if (movement.velocity.x !== 0 || movement.velocity.y !== 0) {
        const hitbox = entity.getComponent<HitboxComponent>('hitbox')
        const transform = entity.getComponent<TransformComponent>('transform')

        hitbox.collision = Sides.NONE

        // TODO: figure out how to move position updates to MovementSystem
        transform.position.x += movement.velocity.x * dt
        this.checkX(entity)

        transform.position.y += movement.velocity.y * dt
        this.checkY(entity)
      }
    })
  }

  render = (dt: number) => {
    // TODO: check if colliding before rendering bounds

    if (this.showCollisions) {
      // Render hitbox
      this.context.fillStyle = '#0000bb66';
      this.scene.layers[0]
        .objects
        .filter(entity => entity.hasComponents(['hitbox']))
        .forEach(entity => {
          const hitbox = entity.getComponent<HitboxComponent>('hitbox')
          const cameraTransform = this.camera.getComponent<TransformComponent>('transform')

          this.context.fillRect(
            hitbox.bounds.left - cameraTransform.position.x,
            hitbox.bounds.top - cameraTransform.position.y,
            hitbox.bounds.size.x,
            hitbox.bounds.size.y
          )

          // TODO: draw collisions....
          // if (entity.collision !== Sides.NONE) {}
        })
    }
  }

  // TODO: refactor checkX & Y
  checkX = (entity: Entity) => {
    this.candidates
      .filter(candidate => candidate !== entity) // Dont check collisions on yourself
      .forEach(candidate => {
        const ehb = entity.getComponent<HitboxComponent>('hitbox')
        const chb = candidate.getComponent<HitboxComponent>('hitbox')

        // Entity overlaps with others ?
        if (ehb.bounds.overlaps(chb.bounds)) {
          entity.onCollide(candidate, Direction.Horizontal)
        }
      });
  }

  checkY = (entity: Entity) => {
    this.candidates
      .filter(candidate => candidate !== entity) // Dont check collisions on yourself
      .forEach(candidate => {
        const ehb = entity.getComponent<HitboxComponent>('hitbox')
        const chb = candidate.getComponent<HitboxComponent>('hitbox')

        // Entity overlaps with others ?
        if (ehb.bounds.overlaps(chb.bounds)) {
          entity.onCollide(candidate, Direction.Vertical)
        }
      });
  }
}