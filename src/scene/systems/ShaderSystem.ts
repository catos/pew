import System from './System.js'
import darkenColors from '../../shaders/darkenColors.js'
import { IPewEvent } from '../../core/InputHandler.js'

export default class ShaderSystem extends System {
  showShaders: boolean

  init = () => {
    this.showShaders = false
  }

  input = (event: IPewEvent) => {
    if (event.isKeyPressed('F2')) {
      this.showShaders = !this.showShaders
    }
  }

  render = (dt: number) => {
    if (this.showShaders) {
      darkenColors(this.context, 16)
    }
  }
}