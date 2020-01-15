import Entity from './Entity.js'
import { IEntitySpec } from '../Scene.js';
import Vector2 from '../../lib/Vector2.js';

import TransformComponent from '../components/TransformComponent.js';
import GraphicsComponent from '../components/GraphicsComponent.js';

export default class DecorationEntity extends Entity {
  constructor(spec: IEntitySpec, position: Vector2) {
    const { animations, size } = spec
    super(spec)

    this.addComponent(new TransformComponent(position, size))
      .addComponent(new GraphicsComponent(animations))
  }
} 