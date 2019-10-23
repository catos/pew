export function loadJSON<T>(url: string): Promise<T> {
  return fetch(url).then(r => r.json());
}

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const image = new Image();
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = () => console.log('Could not load image');
  });
}