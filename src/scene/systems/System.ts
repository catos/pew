import Scene from "../Scene"
import CameraEntity from "../entities/CameraEntity"
import PlayerEntity from "../entities/PlayerEntity"
import Game from "../../Game"

export default class System {
  scene: Scene
  camera: CameraEntity
  player: PlayerEntity
  game: Game
  context: CanvasRenderingContext2D

  constructor(scene: Scene) {
    this.scene = scene
    this.camera = scene.camera
    this.player = scene.player
    this.game = scene.game
    this.context = scene.game.canvas.context
  }

  init() { }

  input() { }

  update(dt: number) { }

  render(dt: number) { }

}