import Vector2 from "../lib/Vector2";

const lightAtPos = (context: CanvasRenderingContext2D, position: Vector2) => {
  const rect = {
    globalX: position.x - 16,
    globalY: position.y - 16,
    width: 16 * 3,
    height: 16 * 3
  };
  // console.log('rect: ', rect);

  const imageData = context.getImageData(rect.globalX, rect.globalY, rect.width, rect.height);
  const pixels = imageData.data;

  const centerPos = pixels.length / 4 / 2 + rect.width / 2;
  // console.log('centerPos: ' + centerPos + ', total pixels: ' + pixels.length / 4);
  for (let i = 0; i < pixels.length; i += 4) {
    const pos = i / 4;
    let distance = Math.abs(centerPos - pos) / centerPos;
    // console.log(distance);

    // const range = []
    // if (pos > (centerPos - distance) && pos < (centerPos + distance)) {
    pixels[i + 3] = 255 - (255 * distance);
    // console.log(pos, pixels[i + 3]);
    // }

    // Top-left
    if (pos === 0) {
      pixels[i] = 255;
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
      pixels[i + 3] = 255;
    }

    // Bottom-right
    if (pos === (pixels.length / 4) - 1) {
      pixels[i] = 0;
      pixels[i + 1] = 255;
      pixels[i + 2] = 0;
      pixels[i + 3] = 255;
    }

    // Player index (center)
    if (pos === centerPos) {
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 255;
      pixels[i + 3] = 255;
    }

  }



  context.putImageData(imageData, rect.globalX, rect.globalY);
  return context;
}

export default lightAtPos