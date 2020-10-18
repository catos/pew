import System from "../../core/System.js"
import Entity from "../entities/Entity.js"
import HitboxComponent from "../components/HitboxComponent.js"
import TransformComponent from "../components/TransformComponent.js"
import MovementComponent from "../components/MovementComponent.js"
import { IGameEvent } from "../../core/InputHandler.js"
import Scene from "../../core/Scene.js"

export enum Sides {
  NONE = 0,
  TOP = 1,
  BOTTOM = 2,
  LEFT = 3,
  RIGHT = 4,
}

export enum Direction {
  Horizontal = 0,
  Vertical = 1,
}

export default class CollisionSystem extends System {
  showCollisions: boolean
  candidates: Entity[]

  constructor(scene: Scene) {
    super("collision", scene)
  }

  init = () => {
    this.showCollisions = false

    // TODO: fix layers[0] (DO A SEARCH)
    // TODO: optimize search
    this.candidates = this.scene.layers[0].entities.filter((entity) =>
      entity.hasComponents(["hitbox"])
    )
  }

  input = (event: IGameEvent) => {
    if (event.isKeyPressed("F4")) {
      this.showCollisions = !this.showCollisions
    }
  }

  update = (dt: number) => {
    const entities = this.scene.layers[0].entities.filter((entity) =>
      entity.hasComponents(["hitbox", "movement"])
    )

    entities.forEach((entity) => {
      const movement = entity.getComponent<MovementComponent>("movement")

      // Abort if no movement
      if (movement.velocity.x === 0 && movement.velocity.y === 0) {
        return
      }

      const hitbox = entity.getComponent<HitboxComponent>("hitbox")
      const transform = entity.getComponent<TransformComponent>("transform")

      hitbox.collision = Sides.NONE

      // TODO: figure out how to move position updates to MovementSystem
      transform.position.x += movement.velocity.x * dt
      this.check(entity, Direction.Horizontal)

      transform.position.y += movement.velocity.y * dt
      this.check(entity, Direction.Vertical)
    })
  }

  render = (dt: number) => {
    // TODO: check if colliding before rendering bounds

    if (this.showCollisions) {
      // Render hitbox
      this.scene.layers[0].entities
        .filter((entity) => entity.hasComponents(["hitbox"]))
        .forEach((entity) => {
          const hitbox = entity.getComponent<HitboxComponent>("hitbox")

          this.context.fillStyle = "#0000bb66"
          this.context.fillRect(
            hitbox.bounds.left - this.camera.position.x,
            hitbox.bounds.top - this.camera.position.y,
            hitbox.bounds.size.x,
            hitbox.bounds.size.y
          )

          // TODO: draw ALL collisions....
          if (hitbox.collision !== Sides.NONE) {
            this.context.fillStyle = "#bb000066"
            this.context.fillRect(
              hitbox.bounds.left - this.camera.position.x,
              hitbox.bounds.top - this.camera.position.y,
              hitbox.bounds.size.x,
              hitbox.bounds.size.y
            )
          }
        })
    }
  }

  check = (entity: Entity, direction: Direction) => {
    this.candidates
      .filter((candidate) => candidate !== entity) // Dont check collisions on yourself
      .forEach((candidate) => {
        const ehb = entity.getComponent<HitboxComponent>("hitbox")
        const chb = candidate.getComponent<HitboxComponent>("hitbox")

        // Entity overlaps with others ?
        if (ehb.bounds.overlaps(chb.bounds)) {
          entity.onCollide(candidate, direction)
        }
      })
  }
}
