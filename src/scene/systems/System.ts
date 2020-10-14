import Scene from "../Scene"
import CameraEntity from "../entities/CameraEntity"
import PlayerEntity from "../entities/PlayerEntity"
import Game from "../../Game"
import { IPewEvent } from "../../core/InputHandler"

export default class System {
  name: string
  scene: Scene
  camera: CameraEntity
  player: PlayerEntity
  game: Game
  context: CanvasRenderingContext2D

  constructor(name: string, scene: Scene) {
    this.name = name
    this.scene = scene
    this.camera = scene.camera
    this.player = scene.player
    this.game = scene.game
    this.context = scene.game.canvas.context
  }

  init() {}

  input(event: IPewEvent) {}

  update(dt: number) {}

  render(dt: number) {}
}
