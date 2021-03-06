import System from "../../core/System.js"
import TransformComponent from "../components/TransformComponent.js"
import JumpComponent from "../components/JumpComponent.js"
import ClimbComponent from "../components/ClimbComponent.js"
import HitboxComponent from "../components/HitboxComponent.js"
import MovementComponent from "../components/MovementComponent.js"
import CrouchComponent from "../components/CrouchComponent.js"
import DashComponent from "../components/DashComponent.js"
import Entity from "../entities/Entity.js"
import HitpointsComponent from "../components/HitpointsComponent.js"
import Vector2 from "../../lib/Vector2.js"
import { IGameEvent } from "../../core/InputHandler.js"
import Scene from "../../core/Scene.js"
import CollisionSystem from "./CollisionSystem.js"

interface IMenuItem {
  key: string
  title: string
}

export default class DebugSystem extends System {
  showMenu: boolean
  showDebug: boolean
  menu: IMenuItem[]

  constructor(scene: Scene) {
    super("debug", scene)
  }

  init = () => {
    this.showMenu = true
    this.showDebug = true
    this.menu = [
      { key: "F1", title: "TGLE" },
      { key: "F2", title: "SHDR" },
      { key: "F3", title: "DEBG" },
      { key: "F4", title: "COLL" },
      { key: "F5", title: "EDIT" },
    ]
  }

  input = (event: IGameEvent) => {
    if (event.isKeyPressed("F1")) {
      this.showMenu = !this.showMenu
    }
    if (event.isKeyPressed("F3")) {
      this.showDebug = !this.showDebug
    }
  }

  render = (dt: number) => {
    if (this.showMenu) {
      this.drawMenu()
    }

    if (this.showDebug) {
      this.drawDebug()

      this.scene.layers[0].entities.forEach((entity) => {
        this.drawHitpoints(entity, this.camera.position)
        this.drawHitbox(entity, this.camera.position)
      })
    }
  }

  drawHitpoints = (entity: Entity, cameraPosition: Vector2) => {
    const hitpoints = entity.getComponent<HitpointsComponent>("hitpoints")
    if (hitpoints) {
      const { position } = entity.getComponent<TransformComponent>("transform")
      this.font.print(
        hitpoints.current.toString(),
        this.context,
        position.x - cameraPosition.x + 2,
        position.y + 5 - cameraPosition.y
      )
    }
  }

  drawHitbox = (entity: Entity, cameraPosition: Vector2) => {
    const hitbox = entity.getComponent<HitboxComponent>("hitbox")
    if (hitbox) {
      const { bounds } = hitbox
      this.context.fillStyle = "#0000ff55"
      this.context.fillRect(
        bounds.left - cameraPosition.x,
        bounds.top - cameraPosition.y,
        bounds.size.x,
        bounds.size.y
      )
    }
  }

  drawMenu = () => {
    const { layers } = this.scene
    const { context } = this

    context.fillStyle = "#000000aa"
    context.fillRect(0, 0, 16 * 32, 13)

    let x = 8
    this.menu.forEach((item) => {
      this.font.print(`${item.key}:${item.title}`, context, x, 4)
      x += 8 * 7
    })

    const objects = layers[0].entities
    this.font.print(
      `E:${objects.length} C:${
        objects.filter((p) => p.hasComponents(["hitbox"])).length
      } FPS:${this.timer.fps}`,
      context,
      16 * 25,
      4
    )
  }

  drawDebug = () => {
    const { gravity } = this.scene

    const jump = this.player.getComponent<JumpComponent>("jump")
    const climb = this.player.getComponent<ClimbComponent>("climb")
    const hitbox = this.player.getComponent<HitboxComponent>("hitbox")
    const dash = this.player.getComponent<DashComponent>("dash")
    const movement = this.player.getComponent<MovementComponent>("movement")
    const transform = this.player.getComponent<TransformComponent>("transform")
    const crouch = this.player.getComponent<CrouchComponent>("crouch")

    const playerDebug = [
      `PLAYER:`,
      `POSITION: ${transform.position.x.toFixed(
        2
      )},${transform.position.y.toFixed(2)}`,
      `VELOCTY: ${movement.velocity.x.toFixed(2)},${movement.velocity.y.toFixed(
        2
      )}`,
      `DIRECTION: ${movement.direction}, P.HEAD: ${movement.heading}`,
      `DISTANCE: ${movement.distance.toFixed(2)}`,
      `HITBOX: ${hitbox.bounds.size.x}, ${hitbox.bounds.size.y}`,
      `COLLISION: ${hitbox.collision}`,
      `ISCROUCHING: ${crouch.isCrouching}`,
      `ISCLIMBING: ${climb.isClimbing}`,
      `JUMP.CANJUMP: ${jump.canJump}`,
      `JUMP-TIMERS: ${jump.jumpPressedTimer.toFixed(
        2
      )}, ${jump.onGroundTimer.toFixed(2)}`,
      `DASH: ${dash.cooldown.toFixed(2)}`,
    ]

    this.font.printArray(playerDebug, this.context, 8, 16 * 18)

    const _keysDown = Array.from(this.inputHandler.keysDown.keys()).reduce(
      (acc, key) => acc + " " + key,
      ""
    )

    // Collision candidates
    const cs = this.scene.getSystem<CollisionSystem>("collision")

    const rightCol = [
      `FPS: ${this.timer.fps.toFixed(2)}`,
      `TIMER: ${this.timer.total.toFixed(
        2
      )}, ${this.timer.accumulatedTime.toFixed(
        2
      )}, ${this.timer.lastTime.toFixed(2)}`,
      `GRAVITY: ${gravity}`,
      `CAM.POS: ${this.camera.position.x.toFixed(
        2
      )}, ${this.camera.position.y.toFixed(2)}`,
      `KEYS DOWN: ${_keysDown}`,
      "",
      `COL.CANDIDATES: ${cs.candidates.length}`,
      `CAMERA.POS: ${this.camera.position.x}, ${this.camera.position.y}`,
      `CAMERA.SIZE: ${this.camera.size.x}, ${this.camera.size.y}`,
    ]

    // TODO: needs mouseinputhandler...
    const [x, y] = [
      Math.floor(this.inputHandler.position.x),
      Math.floor(this.inputHandler.position.y),
    ]
    const [relX, relY] = [
      Math.floor(x - this.camera.position.x),
      Math.floor(y - this.camera.position.y),
    ]
    rightCol.push(`MOUSE: ${x}, ${y}`)
    rightCol.push(`MOUSE (RELATIVE): ${relX}, ${relY}`)

    this.font.printArray(rightCol, this.context, 16 * 16, 16 * 18)
  }
}
