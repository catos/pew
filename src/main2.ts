import Timer from "./core/Timer.js"
import Vector2 from "./lib/Vector2.js"

class World {
  systems: System[] = []
  layers: Layer[] = []
  fps: number = 1 / 60
  timer: Timer = new Timer((dt: number) => {
    this.update(dt)
    this.render(dt)
  }, this.fps)

  constructor() {}

  start = () => {
    this.timer.start()
    console.log("World start!")
    console.log(this)
  }

  addLayer = (layer: Layer) => {
    if (this.layers.find((p) => p.name === layer.name)) {
      throw new Error(`Layer with name: ${layer.name} already exist`)
    }
    this.layers.push(layer)
  }

  addSystem = (system: System) => {
    if (this.systems.find((p) => p.name === system.name)) {
      throw new Error(`System with name: ${system.name} already exist`)
    }
    this.systems.push(system)
  }

  update = (dt: number) => {
    this.systems.forEach((system) => system.update(dt))
  }

  render = (dt: number) => {
    this.systems.forEach((system) => system.render(dt))
  }
}

class Layer {
  name: string
  width: number
  height: number
  context: CanvasRenderingContext2D
  entities: Entity[] = []

  constructor(name: string, width: number, height: number) {
    this.name = name
    this.width = width
    this.height = height

    // Create context
    const canvasEl = document.createElement("canvas")
    canvasEl.id = name
    canvasEl.width = this.width
    canvasEl.height = this.height
    this.context = canvasEl.getContext("2d")

    document.body.appendChild(canvasEl)
  }

  addEntity = (entity: Entity) => {
    if (this.entities.find((p) => p.name === entity.name)) {
      throw new Error(`Entity with name: ${entity.name} already exist`)
    }
    this.entities.push(entity)
  }
}

class Entity {
  name: string
  components: IComponent[] = []

  constructor(name: string) {
    this.name = name
  }

  hasComponent = (name: string) => {
    return this.components.some((p) => p.name === name)
  }

  getComponent = <T extends IComponent>(name: string): T => {
    return this.components.find((p) => p.name === name) as T
  }

  addComponent = (component: IComponent) => {
    if (this.components.find((p) => p.name === component.name)) {
      throw new Error(`Component with name: ${component.name} already exist`)
    }
    this.components.push(component)
  }
}

interface IComponent {
  name: string
}

class System {
  name: string
  world: World

  constructor(name: string, world: World) {
    this.name = name
    this.world = world
  }

  update(dt: number) {}
  render(dt: number) {}
}

/** MyGame */

class DebugSystem extends System {
  constructor(world: World) {
    super("debug", world)
  }

  update(dt: number) {}

  render = (dt: number) => {
    const { layers } = this.world
    layers.forEach(({ context }) => {
      context.font = "10px monospace"
      context.fillStyle = "#ffffff"
      context.fillText(this.name, 10, 10)
    })
  }
}

class RenderSystem extends System {
  constructor(world: World) {
    super("render", world)
  }

  update(dt: number) {}

  render = (dt: number) => {
    const { layers } = this.world
    layers.forEach(({ entities, context, width, height }) => {
      context.clearRect(0, 0, width, height)
      entities
        .filter((p) => p.hasComponent("transform"))
        .forEach((entity) => {
          const { position, size } = entity.getComponent<TransformComponent>(
            "transform"
          )
          context.fillStyle = "#ffffff"
          context.fillRect(position.x, position.y, size.x, size.y)
        })
    })
  }
}

class MovementSystem extends System {
  constructor(world: World) {
    super("movement", world)
  }

  update = (dt: number) => {
    const { layers } = this.world
    layers.forEach(({ entities, width }) => {
      entities
        .filter((p) => p.hasComponent("movement"))
        .forEach((entity) => {
          const { position } = entity.getComponent<TransformComponent>(
            "transform"
          )
          const { velocity } = entity.getComponent<MovementComponent>(
            "movement"
          )
          position.x += velocity.x
          position.y += velocity.y

          if (position.x > width) {
            position.x = 0
          }
        })
    })
  }
  render = (dt: number) => {}
}

class TransformComponent implements IComponent {
  name: string
  position: Vector2
  size: Vector2

  constructor(name: string, position: Vector2, size: Vector2) {
    this.name = name
    this.position = position
    this.size = size
  }
}

class MovementComponent implements IComponent {
  name: string
  velocity: Vector2

  constructor(name: string) {
    this.name = name
    this.velocity = { x: 5, y: 0 } as Vector2
  }
}

const myGame = new World()

myGame.addSystem(new RenderSystem(myGame))
myGame.addSystem(new MovementSystem(myGame))
myGame.addSystem(new DebugSystem(myGame))

const layer1 = new Layer("level 1", 512, 448)
myGame.addLayer(layer1)

const player1 = new Entity("player1")
player1.addComponent(
  new TransformComponent(
    "transform",
    { x: 100, y: 100 } as Vector2,
    { x: 16, y: 16 } as Vector2
  )
)
player1.addComponent(new MovementComponent("movement"))
layer1.addEntity(player1)

myGame.start()
