export default class Timer {
  times: number[]
  fps: number
  total: number
  accumulatedTime: number
  lastTime: number
  loopProxy: (time: number) => void

  constructor(loop: (dt: number) => void, dt: number = 1 / 60) {
    this.times = []
    this.fps = 0

    this.total = 0
    this.accumulatedTime = 0
    this.lastTime = 0

    this.loopProxy = (time: number) => {

      // FPS
      const now = performance.now()
      while (this.times.length > 0 && this.times[0] <= now - 1000) {
        this.times.shift()
      }
      this.times.push(now)
      this.fps = this.times.length



      this.total += dt
      this.accumulatedTime += (time - this.lastTime) / 1000

      // Long running loop is cap'ed
      if (this.accumulatedTime > 1) {
        this.accumulatedTime = 1
      }

      while (this.accumulatedTime > dt) {
        loop(dt)
        this.accumulatedTime -= dt
      }

      this.lastTime = time

      requestAnimationFrame(this.loopProxy)
    }
  }

  start = () => {
    requestAnimationFrame(this.loopProxy)
  }
}