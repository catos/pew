import Scene from '../Scene.js'
import System from './System.js'
import Vector2 from '../../lib/Vector2.js'
import Tileset from '../../core/Tileset.js'
import DashComponent from '../components/DashComponent.js'
import TransformComponent from '../components/TransformComponent.js'

export default class UISystem extends System {
  score: number

  constructor(scene: Scene) {
    super(scene)

    this.score = 0
  }

  update = (dt: number) => {
    const { position } = this.player.getComponent<TransformComponent>('transform')
    this.score = position.x > this.score
      ? position.x
      : this.score
  }

  render = (dt: number) => {
    const { font } = this.game
    const { tileset } = this.scene
    const dash = this.player.getComponent<DashComponent>('dash')

    // "Score"
    const text = `Score:${Math.floor(this.score)}`
    this.context.fillStyle = '#000000aa'
    this.context.fillRect(16, 16, text.length * 6 + 8, 13)
    font.print(text, this.context, 20, 20)

    // Quickbar
    this.drawQuickbar(this.context, tileset, new Vector2(80, 224))


    // Dash cooldown
    if (dash.cooldown > 0) {
      this.context.fillStyle = '#000000cc'
      this.context.fillRect(115, 243, 10, 10)
      font.print(`${Math.round(dash.cooldown)}`, this.context, 118, 246)
    }
  }

  drawQuickbar = (context: CanvasRenderingContext2D, tileset: Tileset, position: Vector2) => {
    tileset.drawTile('116', context, position.x + 16 * 3, position.y)
    tileset.drawTile('117', context, position.x + 16 * 4, position.y)

    tileset.drawTile('129', context, position.x, position.y + 16)
    tileset.drawTile('130', context, position.x + 16, position.y + 16)
    tileset.drawTile('131', context, position.x + 16 * 2, position.y + 16)
    tileset.drawTile('132', context, position.x + 16 * 3, position.y + 16)
    tileset.drawTile('133', context, position.x + 16 * 4, position.y + 16)
    tileset.drawTile('134', context, position.x + 16 * 5, position.y + 16)
    tileset.drawTile('135', context, position.x + 16 * 6, position.y + 16)
    tileset.drawTile('136', context, position.x + 16 * 7, position.y + 16)

    tileset.drawTile('148', context, position.x + 16 * 3, position.y + 32)
    tileset.drawTile('149', context, position.x + 16 * 4, position.y + 32)

  }
}