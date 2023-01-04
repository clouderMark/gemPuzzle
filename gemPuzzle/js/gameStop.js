import variables from "./variables"

export function gameStop(amoutMoves) {
  game.moves.textContent = `Moves: ${amoutMoves}`
  game.stop.classList.remove('button--stop')
  game.stop.textContent = 'Stop'
}