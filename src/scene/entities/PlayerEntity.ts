import Entity from './Entity.js'
import { IEntitySpec } from '../Scene.js';
import { Direction } from '../systems/CollisionSystem.js';
import Vector2 from '../../lib/Vector2.js';

import TransformComponent from '../components/TransformComponent.js';
import MovementComponent from '../components/MovementComponent.js';
import GraphicsComponent from '../components/GraphicsComponent.js';
import InputComponent from '../components/InputComponent.js';
import HitboxComponent from '../components/HitboxComponent.js';
import CrouchComponent from '../components/CrouchComponent.js';
import JumpComponent from '../components/JumpComponent.js';
import DashComponent from '../components/DashComponent.js';
import HitpointsComponent from '../components/HitpointsComponent.js';
import ClimbComponent from '../components/ClimbComponent.js';

export default class PlayerEntity extends Entity {
  constructor(spec: IEntitySpec, position: Vector2) {
    const { hitbox, animations, size } = spec
    super(spec)

    this.addComponent(new TransformComponent(position, size))
      .addComponent(new HitboxComponent(position, hitbox.size, hitbox.offset))
      .addComponent(new GraphicsComponent(animations))
      .addComponent(new InputComponent())
      .addComponent(new MovementComponent(Vector2.ZERO))
      .addComponent(new ClimbComponent())
      .addComponent(new JumpComponent())
      .addComponent(new DashComponent())
      .addComponent(new CrouchComponent())

    if (spec.hitpoints) {
      this.addComponent(new HitpointsComponent(spec.hitpoints))
    }
  }

  onCollide(entity: Entity, direction: Direction) {
    super.onCollide(entity, direction)

    // TODO: implement custom collision with Skelly
    if (entity.type === 'skeleton') {
      console.log('collided with skeleton type!');

    }
  }
}