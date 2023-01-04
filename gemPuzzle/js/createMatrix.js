import variables from "./variables"

function createMatrix(arr) {
  let matrix = []
  let counter = 0
  let matrixSize = Math.sqrt(game.size)
  for (let i = 0; i < matrixSize; i++) {
    const row = []
    for (let u = 0; u < matrixSize; u++) {
      row.push(arr[counter])
      counter++
    }
    matrix.push(row)
  }
  return matrix
}

export default createMatrix