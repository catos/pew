import Component from "./Component.js"

export default class ClimbComponent extends Component {
  isClimbing: boolean

  constructor() {
    super('climb')

    this.isClimbing = false
  }
}