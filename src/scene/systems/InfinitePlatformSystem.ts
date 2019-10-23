  // createPlatform = (scene) => {
  //   const numberOfBlocks = Math.randomBetween(2, 6)

  //   let prevBlock
  //   for (let i = 0; i < numberOfBlocks; i++) {
  //     if (prevBlock) {
  //       const { x, y } = prevBlock.transform.position
  //       prevBlock = this.addEntity(scene, { x: x + 16, y })
  //     } else {
  //       prevBlock = this.addEntity(scene, this.randomPosition())
  //     }
  //   }
  // }

  // randomPosition = () => {
  //   const { player } = this.scene
  //   const layer = this.scene.layers[0].objects

  //   const minX = layer.filter(entity => entity.hitbox)
  //     .sort((a, b) => b.transform.position.x - a.transform.position.x)[0]
  //     .transform.position.x + 16
  //   const maxX = minX + 16 * 5

  //   let minY = player.transform.position.y - (16 * 3)
  //   if (minY < 16) {
  //     minY = 16
  //   }
  //   const maxY = player.transform.position.y + (16 * 3)

  //   let x
  //   let y

  //   do {
  //     x = Math.roundToNearest(16, Math.randomBetween(minX, maxX))
  //     y = Math.roundToNearest(16, Math.randomBetween(minY, maxY)
  //     )
  //   } while (this.objectAt(layer, x, y))

  //   return { x, y }
  // }

