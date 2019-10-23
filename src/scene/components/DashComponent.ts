import Component from './Component.js'

export default class DashComponent extends Component {
  TIMER: number
  cooldown: number
  velocity: number
  engagedTime: number
  speedBoost: number

  constructor() {
    super('dash')

    // this.jumpPressedTimer = 0
    // this.onGroundTimer = 0
    // this.onGround = false
    // this.duration = 0.3
    // TODO: cooldown
    this.TIMER = 3
    this.cooldown = -1

    this.velocity = 400
    this.engagedTime = 0
    this.speedBoost = 0.3
  }
}