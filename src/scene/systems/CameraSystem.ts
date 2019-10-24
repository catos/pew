import System from './System.js'
import CameraEntity from '../entities/CameraEntity.js'
import Scene from '../Scene.js'
import TransformComponent from '../components/TransformComponent.js'

export default class CameraSystem extends System {
  entity: CameraEntity

  constructor(entity: CameraEntity, scene: Scene) {
    super(scene)
    this.entity = entity
  }

  update = (dt: number) => {
    const transform = this.camera.getComponent<TransformComponent>('transform')
    const entityTransform = this.entity.getComponent<TransformComponent>('transform')
    // If we need to support multiple cameras
    // this.scene.layers.forEach(layer => layer.forEach(entity => { }))

    transform.position.x =
      Math.max(0, entityTransform.position.x - transform.size.x / 2)
    transform.position.y = 0
  }

  render = (dt: number) => {
    const transform = this.camera.getComponent<TransformComponent>('transform')

    // this.context.fillStyle = '#00ff0011'
    // this.context.fillRect(0, 0, size.x, size.y)
    this.context.fillRect(
      0 - transform.position.x,
      0 - transform.position.y,
      128 * 16,
      16 * 16)


  }
}