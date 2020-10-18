import Vector2 from "../lib/Vector2.js"

export interface IGameEvent extends UIEvent {
  keysDown: Map<string, boolean>
  position: Vector2
  isMousePressed: boolean
  isKeyPressed: (key: string) => boolean
}

export default class InputHandler {
  keysDown: Map<string, boolean>
  mappedKeys: string[]
  position: Vector2

  constructor() {
    this.keysDown = new Map()
    this.mappedKeys = ["F1", "F2", "F3", "F4", "F5"]
    this.position = Vector2.ZERO
  }

  listenTo = (window: Window, callback: (event: IGameEvent) => void) => {
    ;["keydown", "keyup", "mousedown", "mouseup", "mousemove"].forEach(
      (eventName) => {
        window.addEventListener(eventName, (event: IGameEvent) => {
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

          // if (event instanceof MouseEvent) {
          //   this.position = this.getEventPosition(event)
          // }
          event.position = this.position
          event.isMousePressed = event.type === "mousedown"
          event.keysDown = this.keysDown
          event.isKeyPressed = this.isKeyPressed(event)
          callback(event)
        })
      }
    )
  }

  // getEventPosition = (event: MouseEvent) => {
  //   return new Vector2(
  //     event.clientX -
  //       Math.floor(this.canvas.canvasRect.left) +
  //       this.camera.position.x,
  //     event.clientY -
  //       Math.floor(this.canvas.canvasRect.top) +
  //       window.scrollY +
  //       this.camera.position.y
  //   )
  // }

  isKeyPressed = (event: UIEvent) => (key: string) => {
    const result = event.type === "keydown" && this.keysDown.has(key)
    // console.log(event.type, key, result)
    return result
  }
}
