import System from "./System.js"
import DashComponent from "../components/DashComponent.js"
import MovementComponent from "../components/MovementComponent.js"
import { IPewEvent } from "../../core/InputHandler.js"
import Scene from "../Scene.js"

export default class DashSystem extends System {
  constructor(scene: Scene) {
    super("dash", scene)
  }

  input = (event: IPewEvent) => {
    const dash = this.player.getComponent<DashComponent>("dash")

    // Jump
    if (event.isKeyPressed("KeyP")) {
      if (dash.cooldown < 0) {
        dash.engagedTime = 0.3
        dash.cooldown = dash.TIMER
      }
    }
  }

  update = (dt: number) => {
    this.scene.layers[0].entities
      .filter((entity) => entity.hasComponents(["dash"]))
      .forEach((entity) => {
        const dash = entity.getComponent<DashComponent>("dash")
        const movement = entity.getComponent<MovementComponent>("movement")

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
          movement.velocity.x =
            (dash.velocity + Math.abs(movement.velocity.x) * dash.speedBoost) *
            movement.heading
          dash.engagedTime -= dt
          dash.cooldown -= dt
        }
      })
  }
}
