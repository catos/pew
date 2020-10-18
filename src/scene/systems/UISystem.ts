import Scene from "../../core/Scene.js"
import System from "../../core/System.js"
import Vector2 from "../../lib/Vector2.js"
import Tileset from "../../core/Tileset.js"
import DashComponent from "../components/DashComponent.js"
import TransformComponent from "../components/TransformComponent.js"
import Font from "../../core/Font.js"

export default class UISystem extends System {
  score: number

  constructor(scene: Scene) {
    super("ui", scene)

    this.score = 0
  }

  update = (dt: number) => {
    const { position } = this.player.getComponent<TransformComponent>(
      "transform"
    )
    this.score = position.x > this.score ? position.x : this.score
  }

  render = (dt: number) => {
    // "Score"
    const text = `Score:${Math.floor(this.score)}`
    this.context.fillStyle = "#000000aa"
    this.context.fillRect(16, 16, text.length * 6 + 8, 13)
    this.font.print(text, this.context, 20, 20)

    // Quickbar
    this.drawQuickbar(new Vector2(200, 224))
  }

  drawQuickbar = ({ x, y }: Vector2) => {
    const { tileset } = this.scene
    // Health
    tileset.drawTile("116", this.context, x + 16 * 3, y)
    tileset.drawTile("117", this.context, x + 16 * 4, y)
    tileset.drawTile("132", this.context, x + 16 * 3, y + 16)
    tileset.drawTile("133", this.context, x + 16 * 4, y + 16)
    tileset.drawTile("148", this.context, x + 16 * 3, y + 32)
    tileset.drawTile("149", this.context, x + 16 * 4, y + 32)

    // Border radius
    tileset.drawTile("129", this.context, x, y + 16)
    tileset.drawTile("136", this.context, x + 16 * 7, y + 16)

    // Primary (O)
    this.font.print("O", this.context, x + 16 + 6, y + 8)
    tileset.drawTile("130", this.context, x + 16, y + 16)

    // Secondary (P)
    this.font.print("P", this.context, x + 16 * 2 + 6, y + 8)
    tileset.drawTile("131", this.context, x + 16 * 2, y + 16)

    // Dash cooldown
    const dash = this.player.getComponent<DashComponent>("dash")
    if (dash.cooldown > 0) {
      this.context.fillStyle = "#000000cc"
      this.context.fillRect(x + 16 * 2 + 3, y + 16 + 3, 10, 10)
      this.font.print(
        `${Math.round(dash.cooldown)}`,
        this.context,
        x + 16 * 2 + 6,
        y + 16 + 6
      )
    }

    // Special 1 (K)
    this.font.print("K", this.context, x + 16 * 5 + 6, y + 8)
    tileset.drawTile("134", this.context, x + 16 * 5, y + 16)

    // Special 2 (L)
    this.font.print("L", this.context, x + 16 * 6 + 6, y + 8)
    tileset.drawTile("135", this.context, x + 16 * 6, y + 16)
  }
}
