import variables from "./variables"

function findPosition(num, matrix) {
  let matrixSize = Math.sqrt(game.size)
  for (let y = 0; y < matrixSize; y++) {
    for (let x = 0; x < matrixSize; x++) {
      if (num === matrix[y][x]) return { y, x }
    }
  }
}

export default findPosition