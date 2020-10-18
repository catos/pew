import Canvas from "./Canvas.js"
import Font from "./Font.js"
import Scene from "./Scene.js"
import InputHandler, { IGameEvent } from "./InputHandler.js"
import Timer from "./Timer.js"

export interface IGameOptions {
  name: string
  width: number
  height: number
}

export default class Game {
  name: string
  width: number
  height: number

  canvas: Canvas
  font: Font
  inputHandler: InputHandler
  timer: Timer
  scene: Scene

  constructor({ name, width, height }: IGameOptions) {
    this.name = name
    this.width = width
    this.height = height
  }

  async init() {
    // Canvas
    this.canvas = new Canvas("screen", this.width, this.height, this.name)

    // Font
    this.font = new Font("./assets/gfx/font.png", 5, 5)
    await this.font.init()

    // Input
    // TODO: mappings // const mappings = await loadJSON('./js/inputMappings.json')
    // TODO: send canvas and camera only ?
    this.inputHandler = new InputHandler()
    this.inputHandler.listenTo(window, this.input)

    // Timer
    this.timer = new Timer((dt: number) => {
      this.update(dt)
      this.render(dt)
    })

    // Scene
    if (!this.scene) {
      throw new Error("Unable to init game, no scene found")
    }
    await this.scene.init()

    // Start game
    this.timer.start()
    // this.loop(0)
    console.log(`Game "${this.name}" started`, this)
  }

  input = (event: IGameEvent) => {
    this.scene.input(event)
  }

  update = (dt: number) => {
    this.scene.update(dt)
  }

  render = (dt: number) => {
    this.scene.render(dt)
  }

  addScene = (scene: Scene) => {
    this.scene = scene
  }
}
