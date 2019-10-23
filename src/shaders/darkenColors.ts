const darkenColors = (context: CanvasRenderingContext2D, alpha: number = 4) => {
  // Get the CanvasPixelArray from the given coordinates and dimensions.
  const imgd = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
  const pix = imgd.data;

  // Loop over each pixel and invert the color.
  for (let i = 0, n = pix.length; i < n; i += 4) {
    pix[i + 3] = alpha;
  }

  // Draw the ImageData at the given (x,y) coordinates.
  context.putImageData(imgd, 0, 0);

  return context;
}

export default darkenColors