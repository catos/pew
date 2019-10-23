import Component from './Component.js'

export default class JumpComponent extends Component {
  jumpPressedTimer: number
  onGroundTimer: number
  canJump: boolean
  duration: number
  velocity: number
  engagedTime: number
  speedBoost: number

  constructor() {
    super('jump')

    this.jumpPressedTimer = 0
    this.onGroundTimer = 0
    this.canJump = false

    this.duration = 0.3
    this.velocity = 150
    this.engagedTime = 0
    this.speedBoost = 0.3
  }
}