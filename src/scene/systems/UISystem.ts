import Scene from '../Scene.js'
import System from './System.js'
import Vector2 from '../../lib/Vector2.js'
import Tileset from '../../core/Tileset.js'
import DashComponent from '../components/DashComponent.js'
import TransformComponent from '../components/TransformComponent.js'
import Font from '../../core/Font.js'

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

    // "Score"
    const text = `Score:${Math.floor(this.score)}`
    this.context.fillStyle = '#000000aa'
    this.context.fillRect(16, 16, text.length * 6 + 8, 13)
    font.print(text, this.context, 20, 20)

    // Quickbar
    this.drawQuickbar(this.context, tileset, font, new Vector2(200, 224))

  }

  drawQuickbar = (context: CanvasRenderingContext2D, tileset: Tileset, font: Font, {x, y}: Vector2) => {
    
    // Health
    tileset.drawTile('116', context, x + 16 * 3, y)
    tileset.drawTile('117', context, x + 16 * 4, y)
    tileset.drawTile('132', context, x + 16 * 3, y + 16)
    tileset.drawTile('133', context, x + 16 * 4, y + 16)
    tileset.drawTile('148', context, x + 16 * 3, y + 32)
    tileset.drawTile('149', context, x + 16 * 4, y + 32)
    
    
    // Border radius
    tileset.drawTile('129', context, x, y + 16)
    tileset.drawTile('136', context, x + 16 * 7, y + 16)
    
    // Primary (O)
    font.print('O', context, x + 16 + 6, y + 8)
    tileset.drawTile('130', context, x + 16, y + 16)

    // Secondary (P)
    font.print('P', context, x + 16 * 2 + 6, y + 8)
    tileset.drawTile('131', context, x + 16 * 2, y + 16)
    
    // Dash cooldown
    const dash = this.player.getComponent<DashComponent>('dash')
    if (dash.cooldown > 0) {
      this.context.fillStyle = '#000000cc'
      this.context.fillRect(x + 16 * 2 + 3, y + 16 + 3, 10, 10)
      font.print(`${Math.round(dash.cooldown)}`, this.context, x + 16 * 2 + 6, y + 16 + 6)
    }

    // Special 1 (K)
    font.print('K', context, x + 16 * 5 + 6, y + 8)
    tileset.drawTile('134', context, x + 16 * 5, y + 16)

    // Special 2 (L)
    font.print('L', context, x + 16 * 6 + 6, y + 8)
    tileset.drawTile('135', context, x + 16 * 6, y + 16)
  }
}