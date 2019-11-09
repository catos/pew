import Entity from './Entity.js'
import { IEntitySpec } from '../Scene.js';

import TransformComponent from '../components/TransformComponent.js';
import GraphicsComponent from '../components/GraphicsComponent.js';

export default class DecorationEntity extends Entity {
  constructor(spec: IEntitySpec) {
    const { position, animations, size } = spec
    super(spec)
    console.log('deco', spec)

    this.addComponent(new TransformComponent(position, size))
      .addComponent(new GraphicsComponent(animations))
  }
} 