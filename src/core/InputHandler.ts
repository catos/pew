import Vector2 from "../lib/Vector2.js"
import Game from "../Game.js"
import TransformComponent from "../scene/components/TransformComponent.js"

export interface IPewEvent extends UIEvent {
  keysDown: Map<string, boolean>
  position: Vector2
  isMousePressed: boolean
  isKeyPressed: (key: string) => boolean
}

export default class InputHandler {
  game: Game
  keysDown: Map<string, boolean>
  mappedKeys: string[]
  position: Vector2

  constructor(game: Game) {
    this.game = game
    this.keysDown = new Map()
    this.mappedKeys = ["F1", "F2", "F3", "F4", "F5"]
    this.position = Vector2.ZERO
  }

  listenTo = (window: Window, callback: (event: IPewEvent) => void) => {
    // TODO: move to separate MouseInputHandler ?
    // , 'mousedown', 'mouseup', 'mousemove'
    ;["keydown", "keyup", "mousedown", "mouseup", "mousemove"].forEach(
      (eventName) => {
        window.addEventListener(eventName, (event: IPewEvent) => {
          if (event instanceof KeyboardEvent) {
            const { code, type } = event

            // TODO: only handle configured keys ?
            // if (!this.keyMap.has(code)) {
            //   return
            // }

            // Prevent default behaviour on all configured keys
            if (this.mappedKeys.find((p) => p === code)) {
              event.preventDefault()
            }

            // Prevent multifire
            if (this.keysDown.has(code) && type === "keydown") {
              return
            }

            // Update keysdown
            if (type === "keydown") {
              this.keysDown.set(code, true)
            } else if (type === "keyup") {
              this.keysDown.delete(code)
            }
          }

          event.position =
            event instanceof MouseEvent
              ? this.getEventPosition(event)
              : Vector2.ZERO
          event.isMousePressed = event.type === "mousedown"
          event.keysDown = this.keysDown
          event.isKeyPressed = this.isKeyPressed(event)
          callback(event)
        })
      }
    )
  }

  getEventPosition = (event: MouseEvent) => {
    const {
      canvas: { canvasRect },
    } = this.game
    const cameraTransform = this.game.scene.camera.getComponent<
      TransformComponent
    >("transform")

    return new Vector2(
      event.clientX - Math.floor(canvasRect.left) + cameraTransform.position.x,
      event.clientY -
        Math.floor(canvasRect.top) +
        window.scrollY +
        cameraTransform.position.y
    )
  }

  isKeyPressed = (event: UIEvent) => (key: string) => {
    const result = event.type === "keydown" && this.keysDown.has(key)
    // console.log(event.type, key, result)
    return result
  }
}
