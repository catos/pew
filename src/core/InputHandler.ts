import Vector2 from "../lib/Vector2.js"
import Game from "../Game.js"


interface IMouseInput {
  isDown: boolean
  position: Vector2
}

export default class InputHandler {
  game: Game
  event: Event
  mouse: IMouseInput
  keysDown: Map<string, boolean>
  mappedKeys: string[]

  constructor(game: Game) {
    this.game = game
    this.mouse = {
      isDown: false,
      position: Vector2.ZERO
    }
    this.keysDown = new Map()
    this.mappedKeys = ['F1', 'F2', 'F3', 'F4', 'F5']
  }

  listenTo = (window: Window, callback: () => void) => {
    ['keydown', 'keyup'].forEach(eventName => {
      window.addEventListener(eventName, (event: KeyboardEvent) => {
        this.event = event
        this.handleKeyEvent(event, callback)
      })
    })

    window.addEventListener('mousedown', (event: MouseEvent) => {
      this.event = event
      this.mouse.isDown = true
      callback()
    })

    window.addEventListener('mouseup', (event: MouseEvent) => {
      this.event = event
      this.mouse.isDown = false
      callback()
    })

    window.addEventListener('mousemove', (event: MouseEvent) => {
      this.event = event
      this.mouse.position = this.getEventPosition(event)
      callback()
    })
  }

  getEventPosition = (event: MouseEvent) => {
    const { scene: { camera }, canvas: { canvasRect } } = this.game

    return new Vector2(
      event.clientX - Math.floor(canvasRect.left) + camera.transform.position.x,
      event.clientY - Math.floor(canvasRect.top) + window.scrollY + camera.transform.position.y
    )
  }


  handleKeyEvent = (event: KeyboardEvent, callback: () => void) => {
    const { code, type } = event
    // console.log(code, type);

    // TODO: only handle configured keys ?
    // if (!this.keyMap.has(code)) {
    //   return
    // }

    // Prevent default behaviour on all configured keys
    if (this.mappedKeys.find(p => p === code)) {
      event.preventDefault()
    }

    // Prevent multifire
    if (this.keysDown.has(code) && type === 'keydown') {
      return
    }

    // Update keysdown
    if (type === 'keydown') {
      this.keysDown.set(code, true)
    } else if (type === 'keyup') {
      this.keysDown.delete(code)
    }

    // TODO: use EventEmitter on keys ?
    // this.game.EE.emit(`KEY_DOWN_${keyCode}`)

    // console.log(this.inputs.keysDown, code, type, event)
    callback()
  }
}