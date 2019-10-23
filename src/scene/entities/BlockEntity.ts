import Entity from './Entity.js'
import { IEntitySpec } from '../Scene.js';

import TransformComponent from '../components/TransformComponent.js';
import GraphicsComponent from '../components/GraphicsComponent.js';
import HitboxComponent from '../components/HitboxComponent.js';

export default class BlockEntity extends Entity {
  constructor(spec: IEntitySpec) {
    const { hitbox, position, animations, size } = spec
    super(spec)

    this.addComponent(new TransformComponent(position, size))
      .addComponent(new HitboxComponent(position, hitbox.size, hitbox.offset))
      .addComponent(new GraphicsComponent(animations))
  }
} 