import System from "../../core/System.js"
import CollisionSystem from "./CollisionSystem.js"
import BoundingBox from "../../lib/BoundingBox.js"
import { download, roundToNearest } from "../../lib/utils.js"
import Scene, { ILevelSpec, IEntitySpec, ILayerSpec } from "../../core/Scene.js"
import Vector2 from "../../lib/Vector2.js"
import Layer from "../../core/Layer.js"
import TransformComponent from "../components/TransformComponent.js"
import { IGameEvent } from "../../core/InputHandler.js"

interface IBrush {
  id: number
  current: boolean
  spec: IEntitySpec
}

export default class EditorSystem extends System {
  editorModeEnabled: boolean
  showEntities: boolean
  brushes: IBrush[]
  currentLayer: Layer

  constructor(scene: Scene) {
    super("editor", scene)
  }

  init = () => {
    const { spec } = this.scene

    this.editorModeEnabled = false
    this.showEntities = false
    this.brushes = spec.entities
      .filter((p) => p.animations)
      .map((spec, id) => {
        return { id, current: spec.name === "grass" ? true : false, spec: spec }
      })
    // TODO: replace all layers[0]
    this.currentLayer = this.scene.layers[0]
  }

  input = (event: IGameEvent) => {
    if (event.isKeyPressed("F5")) {
      this.editorModeEnabled = !this.editorModeEnabled
    }

    // Rest of input is only avaliable in edit mode
    if (!this.editorModeEnabled) {
      return
    }

    // Save level
    if (event.isKeyPressed("ShiftLeft") && event.isKeyPressed("KeyS")) {
      const name = "level"
      const json = this.createLevelJSON(name, this.scene)
      download(json, `${name}.json`, "text/plain")
    }

    // Change brush
    if (event.isKeyPressed("ShiftLeft") && event.isKeyPressed("KeyX")) {
      const current = this.brushes.find((p) => p.current).id
      const next = current + 1 >= this.brushes.length ? 0 : current + 1
      this.brushes = this.brushes.map((brush) => {
        return {
          ...brush,
          current: brush.id === next ? true : false,
        }
      })
    }

    // Toggle show entities
    if (event.isKeyPressed("ShiftLeft") && event.isKeyPressed("KeyC")) {
      this.showEntities = !this.showEntities
    }

    // Draw block with current brush
    if (event.isMousePressed) {
      const position = new Vector2(
        roundToNearest(16, event.position.x - 8),
        roundToNearest(16, event.position.y - 8)
      )
      // console.log(`mouseevent @${mouse.position.x}, ${mouse.position.y}, position: ${position.x}, ${position.y}`)
      this.addEntity(
        this.brushes.find((p) => p.current === true).spec,
        this.currentLayer,
        position
      )
    }
  }

  render = (dt: number) => {
    const { tileset } = this.scene
    const { element } = this.canvas

    if (!this.editorModeEnabled) {
      return
    }
    // Draw current entity
    this.context.fillStyle = "#666666cc"
    this.context.fillRect(16 * 16 - 4, 16 * 14 - 4, 5 * 6 + 8, 29)
    this.font.print(`BRUSH`, this.context, 16 * 16, 16 * 14)

    const currentBrush = this.brushes.find((p) => p.current).spec
    const tileId = currentBrush.animations[0].frames[0]
    tileset.drawTile(tileId.toString(), this.context, 16 * 16 + 6, 16 * 14 + 6)

    // Show entities
    if (this.showEntities) {
      tileset.drawTileset(
        this.context,
        element.width - 16 * 16,
        element.height - 16 * 16
      )
    }
  }

  createLevelJSON = (name: string, scene: Scene) => {
    const layers: ILayerSpec[] = []

    let index = 1
    scene.layers.forEach((layer) => {
      const objects = layer.entities.map((entity) => {
        const transform = entity.getComponent<TransformComponent>("transform")
        return {
          entityId: entity.entityId,
          x: Math.round(transform.position.x),
          y: transform.position.y,
        }
      })

      const layerSpec: ILayerSpec = {
        index: index++,
        name: `layer-${index}`,
        objects,
      }
      layers.push(layerSpec)
    })

    const level: ILevelSpec = {
      name,
      gravity: scene.gravity,
      layers: layers,
      entities: scene.spec.entities,
      tileset: scene.spec.tileset,
    }
    return JSON.stringify(level)
  }

  addEntity = (spec: IEntitySpec, layer: Layer, position: Vector2) => {
    if (this.objectAt(layer, position, spec.size)) {
      return
    }

    const specCopy = JSON.parse(JSON.stringify(spec))
    const entity = layer.createEntity(specCopy, position)
    layer.entities.push(entity)

    // Update candiates for collision
    const collisionSystem = this.scene.systems.find(
      (p) => p instanceof CollisionSystem
    )
    collisionSystem.init()
  }

  objectAt = (layer: Layer, position: Vector2, size: Vector2) => {
    const bb = new BoundingBox(position, size)

    const candidates = layer.entities.filter((entity) =>
      entity.hasComponents(["transform"])
    )

    const collides = candidates.some((candidate) => {
      const transform = candidate.getComponent<TransformComponent>("transform")
      const candidateBb = new BoundingBox(transform.position, transform.size)

      return bb.overlaps(candidateBb)
    })

    return collides
  }
}
