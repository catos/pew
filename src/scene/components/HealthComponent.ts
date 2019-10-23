import Component from "./Component.js"

export default class HealthComponent extends Component {
  current: number

  constructor() {
    super('health')

    this.current = 100
  }
}