import Vector2 from '../../lib/Vector2.js'
import Component from "./Component.js"

export default class TransformComponent extends Component {
  position: Vector2
  size: Vector2

  constructor(position: Vector2, size: Vector2) {
    super('transform')

    this.position = position
    this.size = size
  }
}