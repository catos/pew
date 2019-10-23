import Component from "./Component.js"

export default class CrouchComponent extends Component {
  isCrouching: boolean

  constructor() {
    super('crouch')

    this.isCrouching = false
  }
}