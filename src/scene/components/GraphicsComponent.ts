import Component from "./Component.js"
import { IEntitySpecAnimation } from "../../core/Scene.js"

export default class GraphicsComponent extends Component {
  animations: IEntitySpecAnimation[]
  animDelay: number

  constructor(animations: IEntitySpecAnimation[]) {
    super("graphics")

    this.animations = animations
    this.animDelay = 10
  }
}
