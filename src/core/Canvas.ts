// TODO: move print from font here ?
// TODO: make Tileset use this class aswell ?
export default class Canvas {
  element: HTMLCanvasElement
  canvasRect: ClientRect
  context: CanvasRenderingContext2D

  constructor(name: string, width: number, height: number, appendTo: string) {
    // this.element = document.getElementById(name)
    this.element = document.createElement('canvas')
    this.element.id = name

    this.element.width = 512
    this.element.height = 448

    this.canvasRect = this.element.getBoundingClientRect()
    this.context = this.element.getContext('2d')

    if (appendTo) {
      const element = document.getElementById(appendTo)
      element.appendChild(this.element)
    }
  }

  clear = () => {
    this.context.clearRect(0, 0, this.element.width, this.element.height)
  }

  // TODO: figure out if i want to use this
  // setupCanvas = (canvas) => {
  //   // Get the device pixel ratio, falling back to 1.
  //   var dpr = window.devicePixelRatio || 1
  //   // Get the size of the canvas in CSS pixels.
  //   var rect = canvas.getBoundingClientRect()
  //   // Give the canvas pixel dimensions of their CSS
  //   // size * the device pixel ratio.
  //   canvas.width = rect.width * dpr
  //   canvas.height = rect.height * dpr
  //   var ctx = canvas.getContext('2d')
  //   // Scale all drawing operations by the dpr, so you
  //   // don't have to worry about the difference.
  //   ctx.scale(dpr, dpr)
  //   return ctx
  // }

}