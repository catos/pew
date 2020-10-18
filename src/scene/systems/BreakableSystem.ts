import System from "../../core/System.js"

import Layer from "../../core/Layer.js"
import TransformComponent from "../components/TransformComponent.js"
import HitpointsComponent from "../components/HitpointsComponent.js"
import { IGameEvent } from "../../core/InputHandler.js"
import Scene from "../../core/Scene.js"

export default class BreakableSystem extends System {
  layer: Layer

  constructor(scene: Scene) {
    super("breakable", scene)
  }

  init = () => {
    this.layer = this.scene.layers[0]
  }

  input = (event: IGameEvent) => {
    // const pickaxe = this.player.getComponent<PickaxeComponent>('pickaxe')
    // console.log(event)

    // Break block
    if (event.isKeyPressed("KeyE")) {
      const entity = this.layer.getEntity(event.position)
      if (!entity) {
        return
      }

      const entityTransform = entity.getComponent<TransformComponent>(
        "transform"
      )
      const playerTransform = this.player.getComponent<TransformComponent>(
        "transform"
      )
      const distance = entityTransform.position.distance(
        playerTransform.position
      )

      // console.log(
      //   `break block @${event.position.x}, ${event.position.y} plz, block: ${
      //     entity ? entity.name : "null"
      //   }, distance: ${distance}`
      // )

      // TODO: maek better filters & check if breakable
      if (distance < 32) {
        const hitpoints = entity.getComponent<HitpointsComponent>("hitpoints")
        hitpoints.current -= 1

        if (hitpoints.current <= 0) {
          this.layer.deleteEntity(entity.guid)
        }
      }
    }
  }

  update = () => {
    // this.scene.layers[0].entities
    //   .filter(entity => entity.hasComponents(['jump']))
    //   .forEach(entity => {
    //     const jump = entity.getComponent<JumpComponent>('jump')
    //     const climb = entity.getComponent<ClimbComponent>('climb')
    //     const hitbox = entity.getComponent<HitboxComponent>('hitbox')
    //     const movement = entity.getComponent<MovementComponent>('movement')
    //   })
  }
}
