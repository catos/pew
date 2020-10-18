import Scene from "./Scene"
import PlayerEntity from "../scene/entities/PlayerEntity"
import InputHandler, { IGameEvent } from "./InputHandler"
import CameraSystem from "./systems/CameraSystem"
import Canvas from "./Canvas"
import Font from "./Font"
import Timer from "./Timer"

export interface ISystem {
  name: string
  init: () => void
  input: (event: IGameEvent) => void
  update: (dt: number) => void
  render: (dt: number) => void
}

export default class System {
  name: string
  scene: Scene

  canvas: Canvas
  context: CanvasRenderingContext2D
  font: Font
  inputHandler: InputHandler
  timer: Timer

  camera: CameraSystem
  player: PlayerEntity

  constructor(name: string, scene: Scene) {
    this.name = name
    this.scene = scene

    this.canvas = scene.game.canvas
    this.context = scene.game.canvas.context
    this.font = scene.game.font
    this.inputHandler = scene.game.inputHandler
    this.timer = scene.game.timer

    this.camera = scene.camera
    this.player = scene.player
  }

  init() {}
  input(event: IGameEvent) {}
  update(dt: number) {}
  render(dt: number) {}
}
