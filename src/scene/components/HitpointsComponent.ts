import Component from "./Component.js"

export default class HitpointsComponent extends Component {
  max: number
  current: number

  constructor(hitpoints: number) {
    super('hitpoints')

    this.max = hitpoints
    this.current = hitpoints
  }
}