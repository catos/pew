import Canvas from './lib/Canvas.js'
import Font from './core/Font.js'
import Scene from './scene/Scene.js'
import InputHandler, { IPewEvent } from './core/InputHandler.js'
import Timer from './core/Timer.js'

export default class Game {
  name: string
  canvas: Canvas
  font: Font
  scene: Scene
  inputHandler: InputHandler
  timer: Timer
  width: number
  height: number

  constructor(name: string, width: number, height: number) {
    this.name = name
    this.width = width
    this.height = height
  }

  async init() {

    // Canvas
    this.canvas = new Canvas('screen', this.width, this.height, this.name)

    // Font
    this.font = new Font('./assets/gfx/font.png', 5, 5)
    await this.font.init()

    // Scene
    this.scene = new Scene(this, '/build/assets/levels/level-1.json')
    await this.scene.init()

    // Input
    // TODO: mappings // const mappings = await loadJSON('./js/inputMappings.json')
    // TODO: send canvas and camera only ?
    this.inputHandler = new InputHandler(this)
    this.inputHandler.listenTo(window, this.input)
    console.log('Game.init, finished: ', this)

    // Timer
    this.timer = new Timer(this.loop)
    this.timer.start()

    // this.loop(0)
    console.log('Game started')
  }

  input = (event: IPewEvent) => {
    this.scene.input(event)
  }

  update = (dt: number) => {
    this.scene.update(dt)
  }

  render = (dt: number) => {
    this.canvas.clear()
    this.scene.render(dt)
  }

  loop = (dt: number) => {
    this.update(dt)
    this.render(dt)
  }
}