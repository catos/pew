import Vector2 from "./Vector2.js"

export default class BoundingBox {
  position: Vector2
  size: Vector2
  offset: Vector2

  constructor(position: Vector2, size: Vector2, offset: Vector2 = Vector2.ZERO) {
    this.position = position
    this.size = size
    this.offset = offset
  }

  overlaps(box: BoundingBox) {
    return this.bottom > box.top
      && this.top < box.bottom
      && this.left < box.right
      && this.right > box.left
  }

  get bottom() {
    return this.position.y + this.size.y + this.offset.y
  }

  set bottom(y: number) {
    this.position.y = y - (this.size.y + this.offset.y)
  }

  get top() {
    return this.position.y + this.offset.y
  }

  set top(y: number) {
    this.position.y = y - this.offset.y
  }

  get left() {
    return this.position.x + this.offset.x
  }

  set left(x: number) {
    this.position.x = x - this.offset.x
  }

  get right() {
    return this.position.x + this.size.x + this.offset.x
  }

  set right(x: number) {
    this.position.x = x - (this.size.x + this.offset.x)
  }
}
