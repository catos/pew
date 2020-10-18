import System from "../../core/System.js"
import HitboxComponent from "../components/HitboxComponent.js"
import CrouchComponent from "../components/CrouchComponent.js"
import { IGameEvent } from "../../core/InputHandler.js"
import Scene from "../../core/Scene.js"

export default class CrouchSystem extends System {
  constructor(scene: Scene) {
    super("crouch", scene)
  }

  input = (event: IGameEvent) => {
    const hitbox = this.player.getComponent<HitboxComponent>("hitbox")
    const crouch = this.player.getComponent<CrouchComponent>("crouch")

    if (event.isKeyPressed("KeyS")) {
      if (!crouch.isCrouching) {
        crouch.isCrouching = true
        const newY = hitbox.bounds.size.y * 0.5
        hitbox.bounds.size.y = newY
        hitbox.bounds.offset.y += newY
      }
    } else {
      crouch.isCrouching = false
      hitbox.bounds.size.y = hitbox.originalSize.y
      hitbox.bounds.offset.y = hitbox.originalOffset.y
    }
  }
}
