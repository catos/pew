import Vector2 from "../lib/Vector2";
import CameraEntity from "../scene/entities/CameraEntity";

function distance(ox: number, oy: number, nx: number, ny: number) {
  let dx = Math.abs(nx - ox);
  let dy = Math.abs(ny - oy);
  return Math.round(Math.sqrt(dx * dx + dy * dy));
}

const kimShader = (
  context: CanvasRenderingContext2D,
  position: Vector2,
  camera: CameraEntity,
  maxLight: number = 255,
  minLight: number = 0) => {

  function foo(
    data: Uint8ClampedArray,
    width: number,
    maxLight: number,
    minLight: number) {

    let height = (data.length / 4 / width);
    let mx = width / 2;
    let my = height / 2;
    let maxdistance = Math.min(mx, my); //Math.sqrt(mx * mx + my * my);
    let lightstep = maxLight / maxdistance;
    // console.log('foo called, data.length = ' + data.length + ', mx = ' + mx + ', my = ' + my + 'maxdistance = ' + maxdistance);

    for (let x = 0; x < width; x++) {
      let pixels = '';
      for (let y = 0; y < height; y++) {
        let pos = x * 4 + y * (width * 4);
        let d = distance(mx, my, x, y);
        let na = maxLight - Math.round(lightstep * d);
        if (na < minLight) {
          na = minLight;
        }
        data[pos + 3] = na;
        //pixels = pixels + '(' + data[pos] + ',' + data[pos + 1] + ',' + data[pos + 2] + ',' + data[pos + 3] + ')';
        pixels = pixels + data[pos + 3] + ',';
      }
      // console.log('x = ' + x + ', pixel pixels = ' + pixels);
    }
  }

  const rect = {
    globalX: position.x - 16 * 4 - camera.transform.position.x,
    globalY: position.y - 16 * 4,
    width: 16 * 9,
    height: 16 * 9
  };
  const imageData = context.getImageData(rect.globalX, rect.globalY, rect.width, rect.height);
  const pixels = imageData.data;

  foo(pixels, rect.width, maxLight, minLight);

  context.putImageData(imageData, rect.globalX, rect.globalY);
  return context;
}

export default kimShader