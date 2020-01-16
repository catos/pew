export const repeat = (times: number) => (f: () => void) => {
  if (times > 0) {
    repeat(times - 1)(f)
  }
}

export const pad = (str: string, width: number, padChar: string = '0') => {
  str = str + ''
  return str.length >= width ? str : new Array(width - str.length + 1).join(padChar) + str
}


export const download = (content: BlobPart, fileName: string, contentType: string) => {
  const a = document.createElement('a')
  const file = new Blob([content], { type: contentType })
  a.href = URL.createObjectURL(file)
  a.download = fileName
  a.click()
}

export const randomBetween = (a: number, b: number): number => {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

export const roundToNearest = (nearest: number, number: number): number => {
  return Math.round(number / nearest) * nearest
}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  })
}