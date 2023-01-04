import { setGemsPosition } from "./setGemsPosition"

export function arrangeGems(matrix, gems) {
  let count = 0
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix.length; x++) {
      const item = gems[count]
      setGemsPosition(item, x, y)
      count++
    }
  }
}