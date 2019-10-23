import { loadImage } from '../lib/loaders.js'
import Tileset from './Tileset.js'

// TODO: missing space and - in font-sprite
const CHARS: string =
  'ABCDEFGH' +
  'IJKLMNOP' +
  'QRSTUVWX' +
  'YZ.,:;()' +
  '+-*/    ' +
  '12345678' +
  '90      ';

export default class Font {
  url: string
  letterSpacing: number
  tileWidth: number
  tileHeight: number
  tileset: Tileset
  image: HTMLImageElement

  constructor(url: string, tileWidth: number, tileHeight: number) {
    this.url = url
    this.letterSpacing = 1
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
  }

  init = async () => {
    this.image = await loadImage(this.url)
    this.tileset = new Tileset('font', this.image, this.tileWidth, this.tileHeight)

    const cols = this.image.width / this.tileWidth
    const rows = this.image.height / this.tileHeight
    CHARS.split('').forEach((char, pos) => {
      const x = (pos % cols)
      const y = Math.floor(pos / rows)
      this.tileset.defineTile(char, x, y)
    })

    // console.log('Font.init, finished: ', this)
  }

  print = (text: string, context: CanvasRenderingContext2D, x: number, y: number) => {
    [...text.toUpperCase()].forEach((char, pos) => {
      const xPos = (x + pos * this.tileWidth) + (pos * this.letterSpacing)
      this.tileset.drawTile(char, context, xPos, y)
    });
  }

  printArray = (arr: string[], context: CanvasRenderingContext2D, x: number, y: number) => {
    for (let i = 0; i < arr.length; i++) {
      this.print(arr[i], context, x, y + i * (this.tileHeight + 2))
    }
  }
}