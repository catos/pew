import System from "./System.js"
import { pad } from "../../lib/utils.js"
import Vector2 from "../../lib/Vector2.js"
import Scene from "../Scene.js"

// TODO: modify background-color
export default class ClockSystem extends System {
  clock: { h: number; m: number }
  clockSpeed: number
  tick: number
  position: Vector2

  constructor(scene: Scene) {
    super("clock", scene)

    this.clock = { h: 0, m: 0 }
    this.clockSpeed = 0.1
    this.tick = this.clockSpeed
    this.position = new Vector2(16 * 27, 20)
  }

  update = (dt: number) => {
    this.tick -= dt
    if (this.tick < 0) {
      this.tick = this.clockSpeed
      this.clock.m += 1
    }

    if (this.clock.m >= 60) {
      this.clock.m = 0
      this.clock.h += 1
    }

    if (this.clock.h >= 24) {
      this.clock.h = 0
    }
  }

  render = (dt: number) => {
    const { font } = this.game

    const text = `CLOCK ${pad(this.clock.h.toString(), 2)}:${pad(
      this.clock.m.toString(),
      2
    )}`
    this.context.fillStyle = "#000000aa"
    this.context.fillRect(this.position.x - 4, 16, text.length * 6 + 8, 13)
    font.print(text, this.context, this.position.x, this.position.y)
  }
}
