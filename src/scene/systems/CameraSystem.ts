import System from './System.js'
import CameraEntity from '../entities/CameraEntity.js';
import Scene from '../Scene.js';

export default class CameraSystem extends System {
  entity: CameraEntity;

  constructor(entity: CameraEntity, scene: Scene) {
    super(scene)
    this.entity = entity;
  }

  update = (dt: number) => {
    const { transform: { position, size } } = this.scene.camera

    // If we need to support multiple cameras
    // this.scene.layers.forEach(layer => layer.forEach(entity => { }))

    position.x =
      Math.max(0, this.entity.transform.position.x - size.x / 2);

    // if (this.entity.transform.y < this.vertThreshold) {
    //   this.pos.y = -this.size.y; // - this.size.y / 2;
    // } else {
    position.y = 0;
    //   }
  }

  render = (dt: number) => {
    // const { transform: { size } } = this.scene.camera

    // this.context.fillStyle = '#00ff0011';
    // this.context.fillRect(0, 0, size.x, size.y);
    context.fillRect(
      0 - this.camera.transform.position.x,
      0 - this.camera.transform.position.y,
      128 * 16,
      16 * 16)


  }
}