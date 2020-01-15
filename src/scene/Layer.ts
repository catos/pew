import Vector2 from "../lib/Vector2.js"
import { ILayerSpec, IEntitySpec } from "./Scene.js"

import Entity from "./entities/Entity.js"
import PlayerEntity from "./entities/PlayerEntity.js"
import SkeletonEntity from "./entities/SkeletonEntity.js"
import BlockEntity from "./entities/BlockEntity.js"
import CameraEntity from "./entities/CameraEntity.js"
import DecorationEntity from "./entities/DecorationEntity.js"

export default class Layer {
  index: number
  name: string
  entities: Entity[]

  // TODO: do not like entitySpecs....
  constructor(layerSpec: ILayerSpec, entitySpecs: IEntitySpec[]) {
    this.index = layerSpec.index
    this.name = layerSpec.name
    this.entities = layerSpec.objects.map(({ entityId, x, y }) => {
      const spec = entitySpecs.find(p => p.id === entityId)
      const position = new Vector2(x, y)
      return this.createEntity(spec, position)
    })
  }

  // pffff
  createEntity = (spec: IEntitySpec, position: Vector2) => {
    switch (spec.type) {
      case 'player':
        return new PlayerEntity(spec, position)

      case 'skeleton':
        return new SkeletonEntity(spec, position)

      case 'block':
        return new BlockEntity(spec, position)

      case 'camera':
        return new CameraEntity(spec, position)

      case 'decoration':
        return new DecorationEntity(spec, position)

      default:
        throw new Error(`Unknown object type '${spec.type}`)
    }

  }

}