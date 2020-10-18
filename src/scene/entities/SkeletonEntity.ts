import Entity from "./Entity.js"
import { IEntitySpec } from "../../core/Scene.js"
import Vector2 from "../../lib/Vector2.js"

import TransformComponent from "../components/TransformComponent.js"
import MovementComponent from "../components/MovementComponent.js"
import GraphicsComponent from "../components/GraphicsComponent.js"
import HitboxComponent from "../components/HitboxComponent.js"
import HitpointsComponent from "../components/HitpointsComponent.js"

export default class SkeletonEntity extends Entity {
  constructor(spec: IEntitySpec, position: Vector2) {
    const { hitbox, animations, size } = spec
    super(spec)

    this.addComponent(new TransformComponent(position, size))
      .addComponent(new HitboxComponent(position, hitbox.size, hitbox.offset))
      .addComponent(new GraphicsComponent(animations))
      .addComponent(new MovementComponent(Vector2.ZERO))

    if (spec.hitpoints) {
      this.addComponent(new HitpointsComponent(spec.hitpoints))
    }
  }
}
