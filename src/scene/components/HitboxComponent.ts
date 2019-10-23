import Component from "./Component.js"
import BoundingBox from "../../lib/BoundingBox.js"
import { Sides } from "../systems/CollisionSystem.js"
import Vector2 from "../../lib/Vector2.js"

export default class HitboxComponent extends Component {
  bounds: BoundingBox
  collision: Sides
  originalSize: Vector2
  originalOffset: Vector2

  constructor(position: Vector2, size: Vector2, offset: Vector2) {
    super('hitbox')

    this.originalSize = new Vector2(size.x, size.y)
    this.originalOffset = new Vector2(offset.x, offset.y)

    this.bounds = new BoundingBox(position, size, offset)
    this.collision = Sides.NONE
  }
}