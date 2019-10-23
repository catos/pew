const invertColors = (context: CanvasRenderingContext2D) => {
  // Get the CanvasPixelArray from the given coordinates and dimensions.
  const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
  const pixels = imageData.data;

  // Loop over each pixel and invert the color.
  for (let i = 0, n = pixels.length; i < n; i += 4) {
    pixels[i] = 255 - pixels[i]; // red
    pixels[i + 1] = 255 - pixels[i + 1]; // green
    pixels[i + 2] = 255 - pixels[i + 2]; // blue
    // i+3 is alpha (the fourth element)
  }

  // Draw the ImageData at the given (x,y) coordinates.
  context.putImageData(imageData, 0, 0);

  return context;
}

export default invertColors