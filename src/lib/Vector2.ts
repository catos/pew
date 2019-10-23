export default class Vector2 {
  static ZERO = new Vector2(0, 0)

  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize() {
    return this.scale(1 / this.magnitude())
  }

  add(b: Vector2) {
    return new Vector2(this.x + b.x, this.y + b.y)
  }

  subtract(b: Vector2) {
    return new Vector2(this.x - b.x, this.y - b.y)
  }

  scale(kx: number, ky = kx) {
    return new Vector2(this.x * kx, this.y * ky)
  }

  dot(b: Vector2) {
    return this.x * b.x + this.y * b.y
  }

  equalTo(b: Vector2) {
    return this.x === b.x && this.y === b.y
  }
}