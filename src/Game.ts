import Canvas from './lib/Canvas.js'
import Font from './core/Font.js'
import Scene from './scene/Scene.js'
import InputHandler from './core/InputHandler.js'
import Timer from './core/Timer.js'
// import EventEmitter from './core/EventEmitter.js'

export default class Game {
  name: string
  canvas: Canvas
  font: Font
  scene: Scene
  inputHandler: InputHandler
  timer: Timer
  width: number
  height: number
  // EE = {}

  constructor(name: string, width: number, height: number) {
    this.name = name
    this.width = width
    this.height = height
  }

  async init() {

    // EventEmitter
    // this.EE = new EventEmitter()

    // Canvas
    this.canvas = new Canvas('screen', this.width, this.height, this.name)

    // Font
    this.font = new Font('./assets/gfx/font.png', 5, 5)
    await this.font.init()

    // Scene
    this.scene = new Scene(this, '/build/assets/levels/level-0.json')
    // this.scene = new Scene(this, '/s/pew/assets/levels/level-editor-1.json')
    await this.scene.init()

    // Input
    // TODO: mappings // const mappings = await loadJSON('./js/inputMappings.json')
    // TODO: make oneliner
    this.inputHandler = new InputHandler(this)
    this.inputHandler.listenTo(window, this.input)

    console.log('Game.init, finished: ', this)

    // Timer
    this.timer = new Timer(this.loop)
    this.timer.start()

    // this.loop(0)
    console.log('Game started')
  }

  input = () => {
    this.scene.input()
  }

  update = (dt: number) => {
    this.scene.update(dt)
  }

  render = (dt: number) => {
    // Clear canvas
    this.canvas.clear()

    // Render scene
    this.scene.render(dt)
  }

  loop = (dt: number) => {
    this.update(dt)
    this.render(dt)
  }
}