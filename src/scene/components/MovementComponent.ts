import Vector2 from '../../lib/Vector2.js'
import Component from './Component.js'

export default class MovementComponent extends Component {
  acceleration: number
  deceleration: number
  velocity: Vector2
  dragFactor: number
  direction: number
  heading: number
  distance: number

  constructor(velocity: Vector2) {
    super('movement')

    this.acceleration = 500
    this.deceleration = 500
    this.velocity = velocity
    this.dragFactor = 1 / 5000

    this.direction = 0
    this.heading = 1
    this.distance = 0
  }
}