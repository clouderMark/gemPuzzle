import variables from "./variables"

export function shift(click, empty, gems) {
  let matrixSize = Math.sqrt(game.size)
  let pocket = gems[click.y * matrixSize + click.x]
  gems[click.y * matrixSize + click.x] = gems[empty.y * matrixSize + empty.x]
  gems[empty.y * matrixSize + empty.x] = pocket
}