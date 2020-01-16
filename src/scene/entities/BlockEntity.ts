import Entity from './Entity.js'
import { IEntitySpec } from '../Scene.js';
import Vector2 from '../../lib/Vector2.js';

import TransformComponent from '../components/TransformComponent.js';
import GraphicsComponent from '../components/GraphicsComponent.js';
import HitboxComponent from '../components/HitboxComponent.js';
import HitpointsComponent from '../components/HitpointsComponent.js';

export default class BlockEntity extends Entity {
  constructor(spec: IEntitySpec, position: Vector2) {
    const { hitbox, animations, size } = spec
    super(spec)

    this.addComponent(new TransformComponent(position, size))
      .addComponent(new HitboxComponent(position, hitbox.size, hitbox.offset))
      .addComponent(new GraphicsComponent(animations))

    if (spec.hitpoints) {
      this.addComponent(new HitpointsComponent(spec.hitpoints))
    }
  }
} 