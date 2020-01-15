import Entity from './Entity.js'
import { IEntitySpec } from '../Scene.js';
import Vector2 from '../../lib/Vector2.js';

import TransformComponent from '../components/TransformComponent.js';

export default class CameraEntity extends Entity {
  constructor(spec: IEntitySpec, position: Vector2) {
    const { size } = spec
    super(spec)

    this.addComponent(new TransformComponent(position, size))
  }
}