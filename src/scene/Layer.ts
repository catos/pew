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
      spec.position = new Vector2(x, y)
      return this.createEntity(spec)
    })
  }

  // pffff
  createEntity = (spec: IEntitySpec) => {
    switch (spec.type) {
      case 'player':
        return new PlayerEntity(spec)

      case 'skeleton':
        return new SkeletonEntity(spec)

      case 'block':
        return new BlockEntity(spec)

      case 'camera':
        return new CameraEntity(spec)

      case 'decoration':
        return new DecorationEntity(spec)

      default:
        throw new Error(`Unknown object type '${spec.type}`)
    }

  }

}