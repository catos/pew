import Vector2 from "../lib/Vector2.js"
import { loadImage, loadJSON } from "../lib/loaders.js"

import Game from "../PewGame.js"
import Tileset from "./Tileset.js"

import Layer from "./Layer.js"

import PlayerEntity from "../scene/entities/PlayerEntity.js"

// TODO: create ISystem
import { ISystem } from "./System.js"
import MovementSystem from "../scene/systems/MovementSystem.js"
import RenderSystem from "../scene/systems/RenderSystem.js"
import CollisionSystem from "../scene/systems/CollisionSystem.js"
import JumpSystem from "../scene/systems/JumpSystem.js"
import EditorSystem from "../scene/systems/EditorSystem.js"
import CameraSystem from "./systems/CameraSystem.js"
import DebugSystem from "../scene/systems/DebugSystem.js"
import UISystem from "../scene/systems/UISystem.js"
import CrouchSystem from "../scene/systems/CrouchSystem.js"
import ClockSystem from "../scene/systems/ClockSystem.js"
import DashSystem from "../scene/systems/DashSystem.js"
import ShaderSystem from "../scene/systems/ShaderSystem.js"
import ClimbSystem from "../scene/systems/ClimbSystem.js"
import BreakableSystem from "../scene/systems/BreakableSystem.js"
import { IGameEvent } from "./InputHandler.js"
import TransformComponent from "../scene/components/TransformComponent.js"

export interface ILayerObjectSpec {
  entityId: number
  x: number
  y: number
}

export interface ILayerSpec {
  index: number
  name: string
  objects: ILayerObjectSpec[]
}

export interface IEntitySpecAnimation {
  name: string
  frames: number[]
}

export interface IEntitySpecHitbox {
  size: Vector2
  offset: Vector2
}

export interface IEntitySpec {
  id: number
  name: string
  type: string
  // TODO: breakable: boolean
  hitpoints?: number
  size: Vector2
  hitbox: IEntitySpecHitbox
  animations: IEntitySpecAnimation[]
}

export interface ITilesetSpec {
  name: string
  tileWidth: number
  tileHeight: number
}

export interface ILevelSpec {
  name: string
  gravity: number
  layers: ILayerSpec[]
  entities: IEntitySpec[]
  tileset: ITilesetSpec
}

export default class Scene {
  game: Game
  url: string

  spec: ILevelSpec
  gravity: number

  tileset: Tileset
  layers: Layer[]
  player: PlayerEntity

  camera: CameraSystem
  systems: ISystem[] = []

  constructor(game: Game, url: string) {
    this.game = game
    this.url = url
  }

  init = async () => {
    this.spec = await loadJSON(this.url)
    this.gravity = this.spec.gravity

    // Tileset
    const { name, tileWidth, tileHeight } = this.spec.tileset
    const image = await loadImage(`./assets/gfx/${name}`)
    this.tileset = new Tileset("sprites", image, tileWidth, tileHeight)
    this.tileset.defineTiles()

    // Layers
    this.layers = this.spec.layers.map((layerSpec) => {
      return new Layer(this, layerSpec, this.spec.entities)
    })

    // Player
    this.player = this.layers
      .find((p) => p.index === 1)
      .entities.find((p) => p instanceof PlayerEntity)

    // Camera
    const playerPosition = this.player.getComponent<TransformComponent>(
      "transform"
    ).position
    this.camera = new CameraSystem(
      new Vector2(128, 0),
      new Vector2(256, 256),
      playerPosition,
      this
    )
    this.addSystem(this.camera)

    // Register systems
    this.addSystem(new RenderSystem(this))
      .addSystem(new UISystem(this))
      .addSystem(new MovementSystem(this))
      .addSystem(new CollisionSystem(this))
      .addSystem(new ClimbSystem(this))
      .addSystem(new JumpSystem(this))
      .addSystem(new DashSystem(this))
      .addSystem(new CrouchSystem(this))
      .addSystem(new ClockSystem(this))
      .addSystem(new BreakableSystem(this))
      .addSystem(new EditorSystem(this))
      .addSystem(new ShaderSystem(this))
      .addSystem(new DebugSystem(this))

    // Init all systems
    this.systems.forEach((system) => system.init())
  }

  input = (event: IGameEvent) => {
    this.systems.forEach((system) => system.input(event))
  }

  update = (dt: number) => {
    this.systems.forEach((system) => system.update(dt))
  }

  render = (dt: number) => {
    const { context } = this.game.canvas

    // Clear canvas
    this.game.canvas.clear()

    // Paint blue background
    const gradient = context.createLinearGradient(0, 0, 0, 16 * 16)
    gradient.addColorStop(0, "#38c0fc")
    gradient.addColorStop(0.5, "cyan")
    gradient.addColorStop(0.75, "#009999")
    gradient.addColorStop(1, "#001919")
    context.fillStyle = gradient
    context.fillRect(0, 0, this.game.width, this.game.height)

    // Render systems
    this.systems.forEach((system) => system.render(dt))
  }

  getSystem = <T extends ISystem>(name: string): T => {
    return this.systems.find((p) => p.name === name) as T
  }

  addSystem = (system: ISystem) => {
    this.systems.push(system)
    return this
  }
}
