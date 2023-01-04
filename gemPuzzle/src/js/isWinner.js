import variables from "./variables"

export function isWinner(matrix) {
  const winArr = []
  for (let i = 1; i <= game.size; i++) {
    winArr.push(i)
  }

  if (process()) {
    game.mask.classList.add('mask--open')
    game.youWon.textContent = `Hooray! You solved the puzzle in ${game.minutes}:${game.seconds} and ${game.amoutMoves} moves!`
    game.youWon.classList.add('youWon--open')
    clearInterval(timer)
    addResult(minutes, seconds, amoutMoves)
  }

  function process() {
    let gameArr = matrix.flat()
    for (let i = 0; i < game.size; i++) {
      if (winArr[i] !== gameArr[i]) return false
    }
    return true

  }
}