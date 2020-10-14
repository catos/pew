import Vector2 from "../lib/Vector2.js"
import { loadImage, loadJSON } from "../lib/loaders.js"

import Game from "../Game.js"
import Tileset from "../core/Tileset.js"

import Layer from "./Layer.js"

import PlayerEntity from "./entities/PlayerEntity.js"
import CameraEntity from "./entities/CameraEntity.js"

import System from "./systems/System.js"
import MovementSystem from "./systems/MovementSystem.js"
import RenderSystem from "./systems/RenderSystem.js"
import CollisionSystem from "./systems/CollisionSystem.js"
import JumpSystem from "./systems/JumpSystem.js"
import EditorSystem from "./systems/Editor/EditorSystem.js"
import CameraSystem from "./systems/CameraSystem.js"
import DebugSystem from "./systems/DebugSystem.js"
import UISystem from "./systems/UISystem.js"
import CrouchSystem from "./systems/CrouchSystem.js"
import ClockSystem from "./systems/ClockSystem.js"
import DashSystem from "./systems/DashSystem.js"
import ShaderSystem from "./systems/ShaderSystem.js"
import ClimbSystem from "./systems/ClimbSystem.js"
import BreakableSystem from "./systems/BreakableSystem.js"
import { IPewEvent } from "../core/InputHandler.js"

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
  camera: CameraEntity
  systems: System[] = []

  constructor(game: Game, url: string) {
    this.game = game
    this.url = url
  }

  init = async () => {
    this.spec = await loadJSON(this.url);
    this.gravity = this.spec.gravity

    // Tileset
    const { name, tileWidth, tileHeight } = this.spec.tileset
    const image = await loadImage(`./assets/gfx/${name}`)
    this.tileset = new Tileset('sprites', image, tileWidth, tileHeight)
    this.tileset.defineTiles()

    // Layers
    this.layers = this.spec.layers.map(layerSpec => {
      return new Layer(layerSpec, this.spec.entities)
    })

    this.player = this
      .layers.find(p => p.index === 1)
      .entities.find(p => p instanceof PlayerEntity)

    this.camera = this
      .layers.find(p => p.index === 1)
      .entities.find(p => p instanceof CameraEntity)

    // Register systems
    this.systems = [
      new CameraSystem(this.player, this),
      new RenderSystem(this),
      new UISystem(this),
      new MovementSystem(this),
      new CollisionSystem(this),
      new ClimbSystem(this),
      new JumpSystem(this),
      new DashSystem(this),
      new CrouchSystem(this),
      new ClockSystem(this),
      new BreakableSystem(this),
      new EditorSystem(this),
      new ShaderSystem(this),
      new DebugSystem(this),
    ]
    this.systems.forEach(system => system.init())
  }

  input = (event: IPewEvent) => {
    this.systems.forEach(system => system.input(event))
  }

  update = (dt: number) => {
    this.systems.forEach(system => system.update(dt))
  }

  render = (dt: number) => {
    const { context } = this.game.canvas
    // Paint blue background
    const gradient = context.createLinearGradient(0, 0, 0, 16 * 16);
    gradient.addColorStop(0, '#38c0fc');
    gradient.addColorStop(.5, 'cyan');
    gradient.addColorStop(.75, 'black');
    context.fillStyle = gradient
    // context.fillStyle = '#cbdbfc'

    this.systems.forEach(system => system.render(dt))
  }

}