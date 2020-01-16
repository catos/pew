import System from './System.js'
import darkenColors from '../../shaders/darkenColors.js'

export default class ShaderSystem extends System {
  showShaders: boolean

  init = () => {
    this.showShaders = true
  }

  input = () => {
    const { keysDown } = this.game.inputHandler

    if (keysDown.has('F2')) {
      this.showShaders = !this.showShaders
    }
  }

  render = (dt: number) => {
    if (this.showShaders) {
      darkenColors(this.context, 16)
    }
  }
}