import System from './System.js'

interface IMenuItem {
  key: string,
  title: string
}

export default class DebugSystem extends System {
  showMenu: boolean
  showDebug: boolean
  menu: IMenuItem[]

  init = () => {
    this.showMenu = true
    this.showDebug = false
    this.menu = [
      { key: 'F1', title: 'TOGGLE' },
      { key: 'F2', title: 'SHADRS' },
      { key: 'F3', title: 'DEBUG' },
      { key: 'F4', title: 'COLLIS' },
      { key: 'F5', title: 'EDITOR' },
    ]
  }

  input = () => {
    const { keysDown } = this.game.inputHandler

    if (keysDown.has('F1')) {
      this.showMenu = !this.showMenu
    }
    if (keysDown.has('F3')) {
      this.showDebug = !this.showDebug
    }
  }

  render = (dt: number) => {

    if (this.showMenu) {
      this.drawMenu()
    }

    if (this.showDebug) {
      this.drawDebug()
    }
  }

  drawMenu = () => {
    const { font, timer } = this.game
    const { layers } = this.scene
    const { context } = this

    context.fillStyle = '#000000aa'
    context.fillRect(0, 0, 16 * 32, 13)

    let x = 8
    this.menu.forEach(item => {
      font.print(`${item.key}:${item.title}`, context, x, 4)
      x += 8 * 9
    })

    const objects = layers[0].objects
    font.print(
      `E:${objects.length} C:${objects.filter(p => p.hitbox).length} FPS:${timer.fps}`,
      context,
      16 * 25,
      4)
  }

  drawDebug = () => {
    const { keysDown } = this.game.inputHandler
    const _keysDown = Object
      .keys(keysDown)
      .reduce((acc, key) => acc + ' ' + key, '')

    const { font, inputHandler, timer: t } = this.game
    const { gravity } = this.scene
    const { transform, movement, hitbox, jump, crouch, dash, climb } = this.player

    const leftCol = [
      `FPS: ${t.fps.toFixed(4)}`,
      `TIMER: ${t.total.toFixed(4)}, ${t.accumulatedTime.toFixed(4)}, ${t.lastTime.toFixed(4)}, ${(1 / 60).toFixed(4)}`,
      `GRAVITY: ${gravity}`,
      `MOUSE.POSITION: ${Math.floor(inputHandler.mouse.position.x)}, ${Math.floor(inputHandler.mouse.position.y)}`,
      `CAM.POS: ${this.camera.transform.position.x.toFixed(2)}, ${this.camera.transform.position.y.toFixed(2)}`,
      ` `,
      `P.POSITION: ${transform.position.x.toFixed(2)},${transform.position.y.toFixed(2)}`,
      `P.VELOCTY: ${movement.velocity.x.toFixed(2)},${movement.velocity.y.toFixed(2)}`,
      `P.DIRECTION: ${movement.direction}, P.HEAD: ${movement.heading}`,
      `P.DISTANCE: ${movement.distance.toFixed(2)}`,
      `P.COLLISION: ${hitbox.collision}`,
      `P.ISCROUCHING: ${crouch.isCrouching}`,
      `P.ISCLIMBING: ${climb.isClimbing}`,
      `JUMP.CANJUMP: ${jump.canJump}`,
      `JUMP-TIMERS: ${jump.jumpPressedTimer.toFixed(4)}, ${jump.onGroundTimer.toFixed(4)}`,
      `DASH: ${dash.cooldown.toFixed(4)}`,
      ` `,
      `KEYS DOWN: ${_keysDown}`,

    ]
    font.printArray(leftCol, this.context, 8, 16 * 18)

  }
}