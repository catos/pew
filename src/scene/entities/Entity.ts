import { Sides, Direction } from "../systems/CollisionSystem.js"
import { IEntitySpec } from "../Scene.js"

import Component from "../components/Component.js"
import HitboxComponent from "../components/HitboxComponent.js"
import MovementComponent from "../components/MovementComponent.js"

export default class Entity {
  id: number
  name: string
  type: string
  components: { [name: string]: Component } = {}

  constructor({ id, name, type }: IEntitySpec) {
    this.id = id
    this.name = name
    this.type = type
  }

  hasComponents = (names: string[]): boolean => {
    const components = names.map(name => this.components[name])
    console.log(components)
    return !components.some(p => p === undefined)
    // return names
    //   .map(name => this.components[name])
    //   .some(p => p === undefined)
  }

  getComponent = <T extends Component>(name: string): T => {
    return this.components[name] as T
  }

  // getComponent = <T extends Component>(name: string): T => {
  //   return this.components[name] as T
  // }

  addComponent = (component: Component) => {
    // this.components.push(component)

    // TODO: switch ?
    this.components[component.name] = component

    return this
  }

  // TODO: implement and use ?
  // removeComponent = (component: Component) => {
  //   this.components = this.components.filter(p => p.name !== component.name)
  //   return this
  // }

  /**
   * What happens on collide ? 
   * Default is modifying velocity
   * Sounds should not block movement, but can play a sound
   * Ghost may not block movement, but do damage on collide
   * Skelly blocks movement, does damage from sides and dies if someone else lands on their head
   *
   */
  onCollide(entity: Entity, direction: Direction) {
    // console.log(`${this.name}.onCollide(${entity.name})`, entity)

    const hitbox = this.getComponent<HitboxComponent>('hitbox')
    const { velocity } = this.getComponent<MovementComponent>('movement')
    const entityHitbox = entity.getComponent<HitboxComponent>('hitbox')

    if (direction === Direction.Horizontal) {
      // RIGHT
      if (velocity.x > 0) {
        hitbox.bounds.right = entityHitbox.bounds.left;
        velocity.x = 0;
        hitbox.collision = Sides.RIGHT
      }
      // LEFT
      else if (velocity.x < 0) {
        hitbox.bounds.left = entityHitbox.bounds.right;
        velocity.x = 0;
        hitbox.collision = Sides.LEFT
      }
    } else {
      // BOTTOM
      if (velocity.y > 0) {
        hitbox.bounds.bottom = entityHitbox.bounds.top;
        velocity.y = 0;
        hitbox.collision = Sides.BOTTOM
      }
      // TOP
      else if (velocity.y < 0) {
        hitbox.bounds.top = entityHitbox.bounds.bottom;
        velocity.y = 0;
        hitbox.collision = Sides.TOP
      }
    }
  }
}