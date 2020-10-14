import Vector2 from "../lib/Vector2.js"
import Scene, { ILayerSpec, IEntitySpec } from "./Scene.js"

import Entity from "./entities/Entity.js"
import PlayerEntity from "./entities/PlayerEntity.js"
import SkeletonEntity from "./entities/SkeletonEntity.js"
import BlockEntity from "./entities/BlockEntity.js"
import CameraEntity from "./entities/CameraEntity.js"
import DecorationEntity from "./entities/DecorationEntity.js"
import HitboxComponent from "./components/HitboxComponent.js"
import CollisionSystem from "./systems/CollisionSystem.js"

export default class Layer {
  scene: Scene
  index: number
  name: string
  entities: Entity[]

  // TODO: do not like entitySpecs....
  constructor(scene: Scene, layerSpec: ILayerSpec, entitySpecs: IEntitySpec[]) {
    this.scene = scene
    this.index = layerSpec.index
    this.name = layerSpec.name
    this.entities = layerSpec.objects.map(({ entityId, x, y }) => {
      const spec = entitySpecs.find((p) => p.id === entityId)
      const position = new Vector2(x, y)
      return this.createEntity(spec, position)
    })
  }

  getEntity = (position: Vector2): Entity | null => {
    let result: Entity | null = null

    // TODO: improve filter, search entities in radius
    const candidates = this.entities.filter((entity) =>
      entity.hasComponents(["hitbox"])
    )

    candidates.forEach((entity) => {
      const { bounds } = entity.getComponent<HitboxComponent>("hitbox")
      if (bounds.contains(position)) {
        result = entity
      }
    })

    return result
  }

  // pffff
  createEntity = (spec: IEntitySpec, position: Vector2) => {
    switch (spec.type) {
      case "player":
        return new PlayerEntity(spec, position)

      case "skeleton":
        return new SkeletonEntity(spec, position)

      case "block":
        return new BlockEntity(spec, position)

      case "camera":
        return new CameraEntity(spec, position)

      case "decoration":
        return new DecorationEntity(spec, position)

      default:
        throw new Error(`Unknown object type '${spec.type}`)
    }
  }

  deleteEntity = (guid: string) => {
    this.entities = this.entities.filter((p) => p.guid !== guid)

    // TODO: Update candiates for collision
    const collisionSystem = this.scene.systems.find(
      (p) => p instanceof CollisionSystem
    )
    collisionSystem.init()
  }
}
