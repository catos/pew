export default class Tileset {
  name: string
  image: HTMLImageElement
  tileWidth: number
  tileHeight: number
  tiles: Map<string, HTMLCanvasElement[]>

  constructor(name: string, image: HTMLImageElement, tileWidth: number, tileHeight: number) {
    this.name = name
    this.image = image
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.tiles = new Map()
  }

  drawTileset = (context: CanvasRenderingContext2D, offsetX: number = 0, offsetY: number = 0) => {
    const columns = this.image.width / this.tileWidth
    let index = 0
    this.tiles.forEach(key => {
      const tileX = (index % columns)
      const tileY = Math.floor(index / columns)
      const x = tileX * this.tileWidth + offsetX
      const y = tileY * this.tileHeight + offsetY
      this.drawTile(key.toString(), context, x, y)
      index++
    });
  }

  drawTile = (name: string, context: CanvasRenderingContext2D, x: number, y: number, flip: boolean = false) => {
    const tile = this.tiles.get(name)[flip ? 1 : 0];
    if (tile === undefined) {
      console.log(`Tileset - Undefined tile: name='${name}', x=${x}, y=${y}`);
      return;
    }

    context.drawImage(tile, x, y);
  }

  defineTile = (name: string, x: number, y: number) => {
    const buffers = [false, true].map(flip => {

      // TODO: use new Canvas() ?
      const buffer = document.createElement('canvas');
      buffer.width = this.tileWidth;
      buffer.height = this.tileHeight;

      const context = buffer.getContext('2d');

      if (flip) {
        context.scale(-1, 1);
        context.translate(-this.tileWidth, 0);
      }

      context.drawImage(
        this.image,
        x * this.tileWidth,     // Source X
        y * this.tileHeight,    // Source Y
        this.tileWidth,
        this.tileHeight,
        0,                      // Destination X
        0,                      // Destination Y
        this.tileWidth,
        this.tileHeight
      );

      return buffer;
    });

    this.tiles.set(name, buffers);
  }

  defineTiles = () => {
    const columns = this.image.width / this.tileWidth;
    const rows = this.image.height / this.tileHeight;
    let id = 1;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        // console.log(`level -> defineTile: gid=${id}, x=${x}, y=${y}`);
        this.defineTile((id++).toString(), x, y);
      }
    }
  }
}