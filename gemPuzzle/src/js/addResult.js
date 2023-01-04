export function addResult(m, s, mooves) {
  
  const list = {
    date: new Date().toLocaleDateString(),
    moves: mooves,
    time: `${m} : ${s}`
  }
  game.resultsList.push(list)
  game.resultsList.sort((a, b) => a.moves < b.moves ? -1 : 1)
  
  if (game.resultsList.length > 11) {
    game.resultsList.splice(11,1)
  }
}