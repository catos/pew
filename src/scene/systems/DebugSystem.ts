import System from './System.js'
import TransformComponent from '../components/TransformComponent.js'
import JumpComponent from '../components/JumpComponent.js'
import ClimbComponent from '../components/ClimbComponent.js'
import HitboxComponent from '../components/HitboxComponent.js'
import MovementComponent from '../components/MovementComponent.js'
import CrouchComponent from '../components/CrouchComponent.js'
import DashComponent from '../components/DashComponent.js'
import Entity from '../entities/Entity.js'
import HitpointsComponent from '../components/HitpointsComponent.js'
import Vector2 from '../../lib/Vector2.js'
import { IPewEvent } from '../../core/InputHandler.js'

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

  input = (event: IPewEvent) => {

    if (event.isKeyPressed('F1')) {
      this.showMenu = !this.showMenu
    }
    if (event.isKeyPressed('F3')) {
      this.showDebug = !this.showDebug
    }
  }

  render = (dt: number) => {
    const { position: cameraPosition } = this.camera.getComponent<TransformComponent>('transform')

    if (this.showMenu) {
      this.drawMenu()
    }

    if (this.showDebug) {
      this.drawDebug()

      this.scene.layers[0].entities.forEach(entity => {
        this.drawHitpoints(entity, cameraPosition)
        this.drawHitbox(entity, cameraPosition)
      })
    }
  }



  drawHitpoints = (entity: Entity, cameraPosition: Vector2) => {
    const hitpoints = entity.getComponent<HitpointsComponent>('hitpoints')
    if (hitpoints) {
      const { position } = entity.getComponent<TransformComponent>('transform')
      this.game.font.print(
        hitpoints.current.toString(),
        this.context,
        position.x - cameraPosition.x,
        position.y + 5 - cameraPosition.y)
    }
  }

  drawHitbox = (entity: Entity, cameraPosition: Vector2) => {
    const hitbox = entity.getComponent<HitboxComponent>('hitbox')
    if (hitbox) {
      const { bounds } = hitbox
      this.context.fillStyle = "#0000ff55"
      this.context.fillRect(
        bounds.left - cameraPosition.x,
        bounds.top - cameraPosition.y,
        bounds.size.x,
        bounds.size.y)
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

    const objects = layers[0].entities
    font.print(
      `E:${objects.length} C:${objects.filter(p => p.hasComponents(['hitbox'])).length} FPS:${timer.fps}`,
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

    const { position: cameraPosition } = this.camera.getComponent<TransformComponent>('transform')

    const jump = this.player.getComponent<JumpComponent>('jump')
    const climb = this.player.getComponent<ClimbComponent>('climb')
    const hitbox = this.player.getComponent<HitboxComponent>('hitbox')
    const dash = this.player.getComponent<DashComponent>('dash')
    const movement = this.player.getComponent<MovementComponent>('movement')
    const transform = this.player.getComponent<TransformComponent>('transform')
    const crouch = this.player.getComponent<CrouchComponent>('crouch')


    const leftCol = [
      `FPS: ${t.fps.toFixed(4)}`,
      `TIMER: ${t.total.toFixed(4)}, ${t.accumulatedTime.toFixed(4)}, ${t.lastTime.toFixed(4)}, ${(1 / 60).toFixed(4)}`,
      `GRAVITY: ${gravity}`,
      `MOUSE.POSITION: ${Math.floor(inputHandler.position.x)}, ${Math.floor(inputHandler.position.y)}`,
      `CAM.POS: ${cameraPosition.x.toFixed(2)}, ${cameraPosition.y.toFixed(2)}`,
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