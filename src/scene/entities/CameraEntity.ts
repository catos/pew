import Entity from './Entity.js'
import { IEntitySpec } from '../Scene.js';

import TransformComponent from '../components/TransformComponent.js';

export default class CameraEntity extends Entity {
  constructor(spec: IEntitySpec) {
    const { position, size } = spec
    super(spec)

    this.addComponent(new TransformComponent(position, size))
  }
}